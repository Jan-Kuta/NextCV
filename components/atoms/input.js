/**
*
* Input
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, map, mapKeys, isObject, reject, includes, upperFirst } from 'lodash';

class Input extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      hasInitialValue: false,
      showPassword: false,
      isFocus: false,
    };
  }


  componentDidMount() {
    if (this.props.value && !isEmpty(this.props.value)) {
      this.setState({ hasInitialValue: true });
    }

    if (!isEmpty(this.props.errors)) {
      this.setState({ errors: this.props.errors });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Check if errors have been updated during validations
    if (this.props.didCheckErrors !== nextProps.didCheckErrors) {

      // Remove from the state errors that are already set
      const errors = isEmpty(nextProps.errors) ? [] : nextProps.errors;
      this.setState({ errors });
    }
  }

  handleBlur = ({ target }) => {
    // prevent error display if input is initially empty
    if (!isEmpty(target.value) || this.state.hasInitialValue) {
      // validates basic string validations
      // add custom logic here such as alerts...
      const errors = this.validate(target.value);

      this.setState({ errors, hasInitialValue: true });
    }
  }

  handleChangeCheckbox = (e) => {
    const target = {
      type: 'checkbox',
      value: !this.props.value,
      name: this.props.name,
    };

    this.props.onChange(target.type, target.value, target.name);
  }

  onChange = (e) => {
    this.props.onChange('input', e.target.value, e.target.name);
  }

  handleBlurEmail = (e) => {
    this.setState({ isFocus: !this.state.isFocus });

    if (this.props.handleBlur) {
      this.props.handleBlur(e);
    } else {
      this.handleBlur(e);
    }
  }

  handleFocusEmail = (e) => {
    this.setState({ isFocus: !this.state.isFocus });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  handleShowPassword = () => this.setState({ showPassword: !this.state.showPassword });

  renderErrors = (errorStyles) => { // eslint-disable-line consistent-return
    if (!this.props.noErrorsDescription) {
      const divStyle = errorStyles || 'errorContainer';

      return (
        map(this.state.errors, (error, key) => {
          const displayError = isObject(error) && error.id
            ? <span>{error.id}</span>
            : error;
          return (
            <div key={key} className={`form-control-feedback invalid-feedback ${divStyle}`} style={{ display: 'block' }}>{displayError}</div>
          );
        })
      );
    }
  }

  renderInputCheckbox = () => {
    const title = !isEmpty(this.props.title) ? <div className={styles.inputTitle}>{this.props.title}</div> : '';
    const spacer = <div style={{ marginBottom: '.5rem'}}></div>;

    return (
      <div className={`inputCheckbox ${this.props.customBootstrapClass || 'w3-col m-3'}`}>
        <div className="form-check">
          {title}
            <label className={`checkboxLabel form-check-label`} htmlFor={this.props.name}>
              <input
                className="form-check-input"
                defaultChecked={this.props.value}
                id={this.props.name}
                name={this.props.name}
                onChange={this.handleChangeCheckbox}
                type="checkbox"
              />
            {this.props.label}
            </label>
          <div className="inputCheckboxDescriptionContainer">
            <small></small>
          </div>
        </div>
        {spacer}
      </div>
    )
  }

  renderInputEmail = () => {
    let spacer = <div />;

    if (!this.props.noErrorsDescription && !isEmpty(this.state.errors)) {
      spacer = <div />;
    }

    return (
      <div className={`input ${this.props.customBootstrapClass || 'w3-col m-6'}`}>
        <label htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <div className="input-group input inputEmail" style={{ marginBottom: '1rem'}}>
          <span className="input-group-addon addonEmail" />
          <input
            className={`w3-input form-control ${!this.props.deactivateErrorHighlight && !isEmpty(this.state.errors) ? `form-control-danger is-invalid error`: ''}`}
            name={this.props.name}
            id={this.props.label}
            onBlur={this.handleBlurEmail}
            onFocus={this.handleFocusEmail}
            onChange={this.onChange}
            value={this.props.value}
            placeholder={this.props.label || this.props.placeholder}
            disabled={this.props.disabled}
            type="email"
            autoFocus={this.props.autoFocus}
            tabIndex={this.props.tabIndex}
          />
        </div>
        <div className="inputDescriptionContainer">
          <small></small>
        </div>
        {this.renderErrors()}
        {spacer}
      </div>
    )

  }

  renderInputPassword = () => {
    let spacer = <div />;

    if (!this.props.noErrorsDescription && !isEmpty(this.state.errors)) {
      spacer = <div />;
    }

    const color = this.state.showPassword ? { color: 'black' } : { color: '#9EA7B8' };
    const type = this.state.showPassword ? 'text' : 'password';

    return (
      <div className={`input ${this.props.customBootstrapClass || 'w3-col m-6'}`}>
        <label htmlFor={this.props.name}>
          {upperFirst(this.props.label)}
        </label>
          <input
            className={`w3-input form-control ${!this.props.deactivateErrorHighlight && !isEmpty(this.state.errors) ? 'is-invalid': ''}`}
            name={this.props.name}
            id={this.props.label}
            onBlur={this.handleBlur}
            onFocus={this.props.onFocus}
            onChange={this.onChange}
            value={this.props.value}
            placeholder={this.props.placeholder || this.props.label}
            disabled={this.props.disabled}
            type={type}
            autoFocus={this.props.autoFocus}
            tabIndex={this.props.tabIndex}
          />
        <div className="inputDescriptionContainer">
          <small></small>
        </div>
        {this.renderErrors()}
        {spacer}
      </div>
    );
  }

  render() {
    const inputValue = this.props.value || '';

    let spacer = !isEmpty(this.props.inputDescription) ? <div className={styles.spacer} /> : <div />;

    if (!this.props.noErrorsDescription && !isEmpty(this.state.errors)) {
      spacer = <div />;
    }

    switch (this.props.type) {
      case 'checkbox':
        return this.renderInputCheckbox();
      case 'password':
        return this.renderInputPassword();
      case 'email':
        return this.renderInputEmail();
      default:
    }

    return (
      <div className={`${this.props.customBootstrapClass || 'w3-col m-6'}`}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          name={this.props.name}
          id={this.props.label}
          onBlur={this.handleBlur}
          onFocus={this.props.onFocus}
          onChange={this.onChange}
          value={this.props.value}
          type={this.props.type}
          className={`w3-input form-control ${!isEmpty(this.state.errors) ? 'is-invalid': ''}`}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
          tabIndex={this.props.tabIndex}
        />
        <div className="inputDescriptionContainer">
          <small></small>
        </div>
        {this.renderErrors()}
        {spacer}
      </div>
    );
  }

  validate = (value) => {
    let errors = [];

    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const requiredError = { id: 'This value is required' };

    mapKeys(this.props.validations, (validationValue, validationKey) => {
      switch (validationKey) {
        case 'required':
          if (value.length === 0) {
            errors.push({ id: 'This value is required' });
          }
          break;
        case 'regex':
          if (!new RegExp(validationValue).test(value)) {
            errors.push({ id: 'Does not match the regex' });
          }
          break;
        default:
          errors = [];
      }
    });

    if (this.props.type === 'email' && !emailRegex.test(value)) {
      errors.push({ id: 'This is not an email' });
    }

    if (includes(errors, requiredError)) {
      errors = reject(errors, (error) => error !== requiredError);
    }

    return errors;
  }
}

export default Input;
