import { v4 as uuidv4 } from 'uuid';

import './card.scss';
import User from '@/shared/user/index.ts';
import { ArticleType } from '@/shared/types/articleType';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

function Card(props: { cardData: ArticleType; showBody: boolean }) {
  const { cardData, showBody } = props;
  const { title, tagList, description, author, createdAt, slug, body } = cardData;
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
        <div className="card__header-aside">
          <User author={author} date={createdAt} />
        </div>
      </div>
      {showBody && <ReactMarkdown className="card__body">{body}</ReactMarkdown>}
    </div>
  );
}

export default Card;
