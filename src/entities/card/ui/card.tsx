import { v4 as uuidv4 } from 'uuid';

import './card.scss';
import User from '@/shared/user/index.ts';

type CardProps = {
  cardData: {
    title: string;
    tags: string[];
    text: string;
    author: string;
    date: string;
  };
};

function Card(props: CardProps) {
  const { cardData } = props;
  const { title, tags, text, author, date } = cardData;
  const tagsList = tags.map((tag) => (
    <li className="card__tags-item" key={uuidv4()}>
      {tag}
    </li>
  ));

  return (
    <div className="card layout">
      <div className="card__header">
        <div className="card__header-main">
          <div className="card__actions">
            <h2 className="card__title">{title}</h2>
            <div className="card__like">
              <button className="card__like-btn" type="submit">
                <img src="/heart-icon.svg" alt="like" />
              </button>
              <p className="card__like-count">12</p>
            </div>
          </div>
          <ul className="card__tags">{tagsList}</ul>
          <p className="card__subtitle">{text}</p>
        </div>
        <div className="card__header-aside">
          <User name={author} date={date} />
        </div>
      </div>
    </div>
  );
}

export default Card;
