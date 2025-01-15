import { useState } from 'react';
import { format, parse } from 'date-fns';
import './user.scss';

function User(props: { author: { image: string; username: string }; date: string }) {
  const { author, date } = props;
  const [image, setImage] = useState(author.image);
  const handleErrorImg = () => {
    setImage('/Default_user.png');
  };
  const formattedDate = date ? format(parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date()), 'MMMM d, yyyy') : '';

  return (
    <div className="user">
      <div className="user__info">
        <p className="user__info-name">{author.username}</p>
        {date ? <p className="user__info-date">{formattedDate}</p> : ''}
      </div>
      <img className="user__img" onError={handleErrorImg} src={image} alt="User avatar" />
    </div>
  );
}

export default User;
