/**
 *
 * AuthPage
 *
 */

import React, {Component} from 'react';
import Router, {withRouter} from 'next/router'
import { get, map } from 'lodash';
import Link from 'next/link';

import Button from '../components/atoms/button';
import FormDivider from '../components/atoms/formDivider';
import Input from '../components/atoms/input';
import SocialLink from '../components/atoms/socialLink';
import Head from '../components/head';
import Navigation from '../components/organisms/navigation';
import { login, register, forgotPassword, resetPassword } from '../lib/auth';

export class AuthPage extends Component {
  constructor(props){
    super(props);
    this.state = this.initState();
  }

  initState = () => {
    const authForm = require('../static/authForm.json');
    const inputs = get(authForm, this.props.router.query.authType) || [];
    return inputs.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  /**
   * Check the URL's params to render the appropriate links
   * @return {Element} Returns navigation links
   */
  renderLink = () => {
    if (this.props.router.query.authType === 'login') {
      return (
        <div>
          <Link href="/auth?authType=forgot-password" as="/auth/forgot-password">
            <a>Forgot Password</a>
          </Link>
        </div>
      );
    }

    return null;
  }

  submit = () => {
    switch (this.props.router.query.authType){
      case 'register':
        if (this.state.password != this.state.confirmPassword){
          this.setState({error: 'Passwords do not match!'})
          return;
        }
        register(this.state.username, this.state.email, this.state.password)
          .then((res) => {
            console.log("registrace", res);
            Router.push('/auth/login');
          }
          ).catch((err) => 
            this.setState({error: err.message})
          )
        break;
      case 'login':
        login(this.state.identifier, this.state.password)
          .then((res) => {
            console.log("login", res);
          }
          ).catch((err) => 
            this.setState({error: err.message})
          );
        break;
      case 'forgot-password':
        forgotPassword(this.state.email)
          .then((res) => {
            console.log("forgot-password", res);
          }
          ).catch((err) => 
            this.setState({error: err.message})
          );
        break;
      case 'reset-password':
        resetPassword(this.props.router.query.code, this.state.password, this.state.passwordConfirmation)
          .then((res) => {
            console.log("reset-password", res);
            Router.push('/auth/login');
          }
          ).catch((err) => 
            this.setState({error: err.message})
          );
    }
  }

  onChange = (type, value, name) => {
    const parametrObj = {}
    parametrObj[name] = value;
    this.setState(parametrObj);
  }

  render() {
    const authForm = require('../static/authForm.json');
    const inputs = get(authForm, this.props.router.query.authType) || [];
    const providers = ['facebook', 'google']; // To remove a provider from the list just delete it from this array...

    return (
      <div className="authPage">
        <Head>
        <link rel="stylesheet" href="/static/auth.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        </Head>
        <Navigation />
        <div className="wrapper">
          <div className="headerContainer">
            {this.props.router.query.authType}
          </div>
          <div className="headerDescription">
            {this.props.router.query.authType === 'register' ? (
              <span>
                Please register to create your own CV.
              </span>
            ) : ''}
          </div>
          <div className="formContainer">
            <div className="container-fluid">
              <div className="w3-row">
                <div className="w3-col m-12">
                  {providers.map(provider => <SocialLink provider={provider} key={provider} />)}
                </div>
              </div>
              <FormDivider />
              <form onSubmit={(e) => {
                  e.preventDefault();
                  this.submit();
                }}
              >
                <div className="w3-row" style={{ textAlign: 'start' }}>
                  {map(inputs, (input, key) => (
                    <Input
                      autoFocus={key === 0}
                      customBootstrapClass={get(input, 'customBootstrapClass')}
                      didCheckErrors={false}
                      errors={[]}
                      key={get(input, 'name')}
                      label={get(input, 'label')}
                      name={get(input, 'name')}
                      placeholder={get(input, 'placeholder')}
                      type={get(input, 'type')}
                      validations={{ required: true }}
                      onChange={this.onChange}
                      value={this.state[get(input, 'name')]}
                    />
                  ))}
                  <div className="w3-col m-12 buttonContainer">
                    <Button
                      label="Submit"
                      style={{ width: '100%' }}
                      primary
                      type="submit"
                    />
                  </div>
                </div>

              </form>
            </div>
          </div>
          {this.state.error && (
            <div className="w3-container w3-padding w3-text-red">
              {this.state.error}
            </div>
          )}
          <div className="linkContainer">
          {this.renderLink()}
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter (AuthPage);
