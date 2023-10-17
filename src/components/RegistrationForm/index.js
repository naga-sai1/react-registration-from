import {Component} from 'react'

import './index.css'

class RegistrationFrom extends Component {
  state = {
    firstName: '',
    lastName: '',
    loginSuccess: false,
    requiredFirstName: false,
    requiredLastName: false,
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({requiredLastName: !isValidLastName})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  renderUserLastNameField = () => {
    const {lastName, requiredLastName} = this.state
    const className = requiredLastName
      ? 'name-input-field error-field'
      : 'name-input-field'
    return (
      <>
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Last name"
          value={lastName}
          className={className}
          onBlur={this.onBlurLastName}
          onChange={this.onChangeLastName}
        />
      </>
    )
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({requiredFirstName: !isValidFirstName})
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  renderUserFirstNameField = () => {
    const {firstName, requiredFirstName} = this.state
    const className = requiredFirstName
      ? 'name-input-field error-field'
      : 'name-input-field'
    return (
      <>
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          placeholder="First name"
          id="firstName"
          onBlur={this.onBlurFirstName}
          value={firstName}
          className={className}
          onChange={this.onChangeFirstName}
        />
      </>
    )
  }

  validateFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  validateLastName = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  onChangeLoginSuccess = () => {
    this.setState(prevState => ({
      loginSuccess: !prevState.loginSuccess,
      firstName: '',
      lastName: '',
    }))
  }

  submitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({loginSuccess: true})
    } else {
      this.setState({
        requiredFirstName: !isValidFirstName,
        requiredLastName: !isValidLastName,
        loginSuccess: false,
      })
    }
  }

  render() {
    const {loginSuccess, requiredFirstName, requiredLastName} = this.state
    return (
      <div className="app-container">
        <h1 className="registration-heading">Registration</h1>
        {loginSuccess ? (
          <div className="login-success-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
              alt="success"
              className="success-icon"
            />
            <p className="description">Submitted Successfully</p>
            <button
              type="button"
              className="submit-btn"
              onClick={this.onChangeLoginSuccess}
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">
              {this.renderUserFirstNameField()}
              {requiredFirstName && <p className="error-msg">Required</p>}
            </div>
            <div className="input-container">
              {this.renderUserLastNameField()}
              {requiredLastName && <p className="error-msg">Required</p>}
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        )}
      </div>
    )
  }
}

export default RegistrationFrom
