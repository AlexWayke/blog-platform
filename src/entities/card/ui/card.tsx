import { v4 as uuidv4 } from 'uuid';
import { format, parse } from 'date-fns';
import { ArticleType } from '@/shared/types/articleType';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './card.scss';
import { useDeleteArticleMutation } from '@/entities/api/rtkApi';
import { useAppSelector } from '@/shared/hooks/hooks';
import { Spin } from 'antd';

function Card(props: {
  favoriteArticle: () => void;
  cardData: ArticleType;
  showBody: boolean;
  cutTitles: boolean;
  isUserPost?: boolean;
}) {
  const { user, isLogged } = useAppSelector((state) => state.user);
  const { favoriteArticle, cardData, showBody, cutTitles, isUserPost } = props;
  const { title, tagList, description, author, createdAt, slug, body, favoritesCount, favorited } = cardData;
  const { avatar = 'https://i.pinimg.com/736x/bd/d9/aa/bdd9aaee8c129b1d0a7180512c6f7ae5.jpg', username } = author;
  const [image, setImage] = useState(avatar);
  const [openModal, setOpenModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false);

  const [deleteArticle, { isSuccess, isLoading }] = useDeleteArticleMutation();
  const navigate = useNavigate();

  const handleErrorImg = () => {
    setImage('https://i.pinimg.com/736x/bd/d9/aa/bdd9aaee8c129b1d0a7180512c6f7ae5.jpg');
  };

  const formattedDate = format(parse(createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()), 'MMMM d, yyyy');

  const tagsList = tagList.map((tag) => (
    <li className="card__tags-item" key={uuidv4()}>
      {tag}
    </li>
  ));

  const handleToggleModal = (open: boolean) => setOpenModal(open);

  const handleDeletePost = () => deleteArticle({ token: user.token, slug });
  const handleFavorite = () => {
    if (isLogged) {
      return favoriteArticle();
    }
    return setLikeModal(true);
  };

  useEffect(() => {
    if (openModal) {
      const timeoutModal = setTimeout(() => {
        setOpenModal(false);
      }, 5000);

      return () => clearTimeout(timeoutModal);
    }
  }, [openModal]);

  useEffect(() => {
    if (likeModal) {
      const timeoutModal = setTimeout(() => {
        setLikeModal(false);
      }, 5000);

      return () => clearTimeout(timeoutModal);
    }
  }, [likeModal]);

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__header-main">
          <div className="card__actions">
            <Link to={`/articles/${slug}`} className={`card__title ${cutTitles && 'card__title--short'}`}>
              {title}
            </Link>
            <div className="like">
              {likeModal && <div className="like__modal">Sign up first!</div>}
              <button className="like__btn" onClick={() => handleFavorite()} type="button">
                {favorited ? '❤️' : '🤍'}
              </button>
              <p className="card__like__count">{favoritesCount}</p>
            </div>
          </div>
          <ul className={`card__tags ${cutTitles && 'card__tags--short'}`}>{tagsList}</ul>
          <p className={`card__subtitle ${cutTitles && 'card__subtitle--short'}`}>{description}</p>
        </div>
        <div className="card__user">
          <Link to={`/articles/${slug}`} className="card__user-info">
            <div className="card__user-text">
              <p className="card__user-name">{username}</p>
              <p className="card__user-date">{formattedDate}</p>
            </div>
            <img className="card__img" onError={handleErrorImg} src={image} alt="User avatar" />
          </Link>
          {isUserPost && (
            <div className="card__user-actions">
              <button
                onClick={() => handleToggleModal(true)}
                disabled={isLoading}
                className="card__user-btn card__user-btn--red"
              >
                {isLoading ? <Spin /> : 'Delete'}
              </button>
              <Link className="card__user-btn card__user-btn--green" to={`/articles/${slug}/edit`}>
                Edit
              </Link>
              {openModal && (
                <div className="card__modal">
                  <p className="card__modal-text">Are you sure to delete this article?</p>
                  <div className="card__modal-actions">
                    <button className="card__modal-btn" type="button" onClick={() => handleToggleModal(false)}>
                      No
                    </button>
                    <button className="card__modal-btn" type="button" onClick={() => handleDeletePost()}>
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {showBody && <ReactMarkdown className="card__body">{body}</ReactMarkdown>}
    </div>
  );
}

export default Card;
