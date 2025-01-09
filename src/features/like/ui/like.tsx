import './like.scss';

function Like() {
  return (
    <div className="like">
      <button className="like__btn" type="submit">
        <img src="/heart-icon.svg" alt="like" />
      </button>
      <p className="like__count">12</p>
    </div>
  );
}

export default Like;
