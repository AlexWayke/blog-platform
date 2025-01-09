import './pagination.scss';

function Pagination() {
  const elements = ['1', '2', '3', '4', '5', '6'];
  const items = elements.map((el) => <li className="pagination__item">{el}</li>);

  return (
    <div className="pagination">
      <button type="button" aria-label="Previous" className="pagination__btn pagination__btn--prev" />
      <ul className="pagination__wrapper">{items}</ul>
      <button type="button" aria-label="Next" className="pagination__btn pagination__btn--next" />
    </div>
  );
}

export default Pagination;
