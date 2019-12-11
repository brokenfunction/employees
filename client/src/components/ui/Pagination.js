import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  const { totalPages, limit, currentPage } = props.pagination;

  const handleLimitChange = ({ target }) => {
    const { getEmployeesPage, query } = props;
    getEmployeesPage(currentPage, target.value, query);
  };

  const handleLinkClick = (e, number) => {
    const { getEmployeesPage, query } = props;
    e.preventDefault();
    getEmployeesPage(number, limit, query);
  };

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} id={number}>
        <a
          onClick={e => {
            handleLinkClick(e, number);
          }}
          className={number === currentPage ? 'item active' : 'item'}
          href="#"
        >
          {number}
        </a>
      </li>
    );
  });
  return (
    <div className="pagination__wrapper">
      {totalPages > 1 && <ul className="ui pagination menu">{renderPageNumbers}</ul>}
      <input
        value={limit}
        onChange={e => {
          handleLimitChange(e);
        }}
        type="number"
        min="1"
        max="100"
        className="ui input number form-control pagination__limit"
        name="limit"
        id="limit"
      />
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.shape({
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
  }).isRequired,
  query: PropTypes.string,
  getEmployeesPage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  query: '',
};

export default Pagination;
