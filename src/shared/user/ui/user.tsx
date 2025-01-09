import './user.scss';

function User(props: { name: string; date: string }) {
  const { name, date } = props;
  return (
    <div className="user">
      <div className="user__info">
        <p className="user__info-name">{name}</p>
        {date ? <p className="user__info-date">{date}</p> : ''}
      </div>
      <img className="user__img" src="/Default_user.png" alt="User avatar" />
    </div>
  );
}

export default User;
