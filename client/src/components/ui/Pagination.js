import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPages: this.props.pagination.totalPages,
      limit: this.props.pagination.limit,
      page: this.props.pagination.currentPage,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.pagination.totalPages !== this.props.pagination.totalPages ||
      nextProps.pagination.currentPage !== this.props.pagination.page
    ) {
      this.setState({
        totalPages: nextProps.pagination.totalPages,
        page: nextProps.pagination.currentPage,
      });
    }
  }

  handleLimitChange = event => {
    const { getEmployeesPage, page, query } = this.props;
    this.setState({
      limit: event.target.value,
      totalPages: this.props.pagination.totalPages,
    });
    getEmployeesPage(page, event.target.value, query);
  };

  handleLinkClick(e, number) {
    const { getEmployeesPage, query } = this.props;
    const { limit } = this.state;
    e.preventDefault();
    getEmployeesPage(number, limit, query);
  }

  render() {
    const { page, limit, totalPages } = this.state;

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number}>
          <a
            onClick={e => {
              this.handleLinkClick(e, number);
            }}
            className={number === page ? 'item active' : 'item'}
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
            this.handleLimitChange(e);
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
  }
}

export default Pagination;
