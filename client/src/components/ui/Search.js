import React from 'react';
import PropTypes from 'prop-types';

const Search = props => {
  const { searchEmployees, query } = props;

  const handleChange = event => {
    const { value } = event.target;
    searchEmployees(value);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        searchEmployees(e.target.elements.query.value);
      }}
      className="ui action input"
    >
      <input
        onChange={handleChange}
        value={query}
        type="search"
        name="query"
        placeholder="Search..."
      />
      <button type="submit" className="ui icon button">
        <i className="search icon" />
      </button>
    </form>
  );
};

Search.propTypes = {
  searchEmployees: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Search;
