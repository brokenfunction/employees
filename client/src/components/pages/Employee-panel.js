import React, { Component } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Employee from '../ui/Employee';
import Search from '../ui/Search';
import Pagination from '../ui/Pagination';
import 'react-toastify/dist/ReactToastify.min.css';

class EmployeePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      departments: [],
      query: '',
      pagination: {
        totalPages: null,
        currentPage: 1,
        limit: 5,
      },
    };
  }

  componentDidMount() {
    const { currentPage, limit } = this.state.pagination;
    const employees = Axios.get(`/employees/?page=${currentPage}&limit=${limit}`);
    const departments = Axios.get('/departments/');
    Promise.all([employees, departments])
      .then(response => {
        this.setState({
          employees: response[0].data.employee,
          pagination: response[0].data.pagination,
          departments: response[1].data,
        });
      })
      .catch(error => {
        toast.error(error.message);
      });
  }

  onDelete = id => {
    const { employees } = this.state;

    Axios.delete(`/employees/${id}`).then(response => {
      this.setState({
        employees: employees.filter(employee => employee.id !== id),
      });
      toast.success(response.data.message);
    });
  };

  onSave = employeeObj => {
    const { employees } = this.state;
    const employee = { ...employeeObj };

    if (!employee) return;
    // don't modify state object, unless API is successful
    const isUpdate = Boolean(employee.id);
    const method = isUpdate ? 'put' : 'post';
    const path = isUpdate ? `/employees/${employee.id}` : '/employees/';

    const { id } = employee;

    // don't POST our UI concerns to the server
    delete employee.tempId;
    delete employee.id; // seems odd the server complains about this
    Axios[method](path, employee).then(response => {
      const newEmployees = isUpdate
        ? [...employees]
        : [...employees.filter(emp => emp.id !== id), response.data];
      this.setState({ employees: newEmployees });
      if (isUpdate) {
        toast.success(`Employee ${employee.name} updated successfully`);
      } else {
        toast.success(`Employee ${employee.name} added successfully`);
      }
    });
  };

  addEmptyEmployee = () => {
    const { employees, departments } = this.state;

    employees.push({
      name: '',
      active: false,
      departmentID: departments[0].id,
      tempId: new Date().getTime(), // UI ONLY - iteration key for unsaved items
    });

    this.setState({
      employees,
    });
  };

  searchEmployees = query => {
    const { limit } = this.state.pagination;
    Axios.get(`/employees/?s=${query}&page=1&limit=${limit}`).then(response => {
      this.setState({
        employees: response.data.employee,
        pagination: response.data.pagination,
        query,
      });
    });
  };

  getEmployeesPage = (pageNumber, limit, query) => {
    const queryPath = query && query.length ? `&s=${query}` : '';
    Axios.get(`/employees/?page=${pageNumber}&limit=${limit}${queryPath}`).then(response => {
      this.setState({
        employees: response.data.employee,
        pagination: response.data.pagination,
      });
    });
  };

  render() {
    const { employees, departments, pagination, query } = this.state;
    return (
      <>
        <ToastContainer autoClose={3000} hideProgressBar />
        <div className="section container">
          <div className="row section-header">Employees</div>
          <div className="row section-body employee-panel">
            <div className="employee-panel__top-control">
              <Search query={query} searchEmployees={this.searchEmployees} />
              <button
                type="button"
                onClick={this.addEmptyEmployee}
                className="ui green circular icon button"
              >
                <i className="icon plus circle" />
              </button>
            </div>
            <table className="ui selectable single line table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Active</th>
                  <th>Department</th>
                  <th className="employee-edit-container" />
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <Employee
                    key={employee.id || employee.tempId}
                    departments={departments}
                    onDelete={this.onDelete}
                    onSave={this.onSave}
                    employee={employee}
                  />
                ))}
              </tbody>
            </table>
            {pagination.totalPages && (
              <Pagination
                query={query}
                getEmployeesPage={this.getEmployeesPage}
                pagination={pagination}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default EmployeePanel;
