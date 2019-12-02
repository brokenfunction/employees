import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = event => {
    const { value } = event.target;
    const { searchEmployees } = this.props;

    this.setState({ query: value });
    searchEmployees(value);
  };

  render() {
    const { query } = this.state;
    const { searchEmployees } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          searchEmployees(e.target.elements.query.value);
        }}
        className="ui action input"
      >
        <input
          onChange={this.handleChange}
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
  }
}

export default Search;
