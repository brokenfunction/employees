import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: props.employee,
      editing: !Boolean(props.employee.id),
      valid: Boolean(props.employee.id),
    };
  }

  onEditing = () => {
    this.setState({ editing: true });
  };

  onInputChange = (e, key) => {
    const { employee } = this.state;
    const newEmployee = {
      ...employee,
      [key]: e.target.value,
    };

    this.setState({ employee: newEmployee }, this.validateInput(e.target.value));
  };

  onSave = () => {
    const { employee } = this.state;

    if (!this.state.valid) return;
    this.setState({ editing: false });
    this.props.onSave(employee);
  };

  handleChange = e => {
    const { employee } = this.state;
    const key = e.target.name;
    const value = key === 'departmentID' ? parseInt(e.target.value, 10) : e.target.value === 'true';

    employee[key] = value;
    this.setState({ employee });
  };

  validateInput(value) {
    const { employee } = this.state;
    const pureValue = value.replace(/\s+/g, '');
    this.setState({
      valid: pureValue.length > 1 && employee.departmentID !== 0,
    });
  }

  render() {
    const { departments } = this.props;
    const { employee, valid, editing } = this.state;

    let alterButton;

    if (editing) {
      alterButton = (
        <button
          onClick={this.onSave}
          disabled={!valid}
          className={'ui green basic icon button action-button' + (!valid ? ' disabled' : '')}
        >
          <i className="icon check circle" />
        </button>
      );
    } else if (employee.id) {
      alterButton = (
        <button
          type="button"
          onClick={this.onEditing}
          className="ui teal basic icon button action-button"
        >
          <i className="icon circle pencil alternate" />
        </button>
      );
    }

    let departmentName = null;
    if (employee && departments.length) {
      departmentName = departments.find(
        departmentObj => departmentObj.id === parseInt(employee.departmentID, 10),
      );
    }

    return (
      <tr key={employee.id} className="employee">
        <td>
          {editing ? (
            <div className={'ui input' + (!valid ? ' error ' : '')}>
              <input
                type="text"
                required
                className="form-control"
                value={employee.name}
                onChange={e => this.onInputChange(e, 'name')}
              />
            </div>
          ) : (
            <div className="ui medium header">{employee.name}</div>
          )}
        </td>
        <td>
          {editing ? (
            <select
              className="ui dropdown"
              value={employee.active}
              name="active"
              onChange={e => this.handleChange(e)}
            >
              <option value="true">Active</option>
              <option value="false">Not active</option>
            </select>
          ) : employee.active ? (
            <i className="fas employee__active--true fa-check fa-2x" />
          ) : (
            <i className="fas employee__active--false fa-times-circle fa-2x" />
          )}
        </td>
        <td>
          {editing ? (
            <select
              name="departmentID"
              className="ui dropdown"
              onChange={e => this.handleChange(e)}
              value={employee.departmentID}
            >
              {departments.map(departmentObj => (
                <option key={departmentObj.id} value={departmentObj.id}>
                  {departmentObj.name}
                </option>
              ))}
            </select>
          ) : (
            <p>{departmentName && departmentName.name}</p>
          )}
        </td>
        <td className="employee-edit-container">
          {alterButton}
          <button
            onClick={() => {
              this.props.onDelete(employee.id);
            }}
            className="ui red basic icon button action-button"
          >
            <i className="icon trash" />
          </button>
        </td>
      </tr>
    );
  }
}

Employee.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    departmentID: PropTypes.number.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Employee;
