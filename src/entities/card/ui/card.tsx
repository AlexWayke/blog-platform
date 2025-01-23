import { v4 as uuidv4 } from 'uuid';
import { format, parse } from 'date-fns';
import { ArticleType } from '@/shared/types/articleType';
import { Link } from 'react-router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './card.scss';

function Card(props: { cardData: ArticleType; showBody: boolean }) {
  const { cardData, showBody } = props;
  const { title, tagList, description, author, createdAt, slug, body } = cardData;
  const { avatar = '/Default_user.png', username } = author;
  const [image, setImage] = useState(avatar);

  const handleErrorImg = () => {
    setImage('/Default_user.png');
  };

  const formattedDate = format(parse(createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()), 'MMMM d, yyyy');

  const tagsList = tagList.map((tag) => (
    <li className="card__tags-item" key={uuidv4()}>
      {tag}
    </li>
  ));

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__header-main">
          <div className="card__actions">
            <Link to={slug} className="card__title">
              {title}
            </Link>
            <div className="card__like">
              <button className="card__like-btn" type="submit">
                <img src="/heart-icon.svg" alt="like" />
              </button>
              <p className="card__like-count">12</p>
            </div>
          </div>
          <ul className="card__tags">{tagsList}</ul>
          <p className="card__subtitle">{description}</p>
        </div>
        <div className="card__user">
          <div className="card__user-info">
            <p className="card__user-name">{username}</p>
            <p className="card__user-date">{formattedDate}</p>
          </div>
          <img className="card__img" onError={handleErrorImg} src={image} alt="User avatar" />
        </div>
      </div>
      {showBody && <ReactMarkdown className="card__body">{body}</ReactMarkdown>}
    </div>
  );
}

export default Card;
