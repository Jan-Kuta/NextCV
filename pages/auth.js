/**
 *
 * AuthPage
 *
 */

import React, {Component} from 'react';
import {withRouter} from 'next/router'
import { get, map, replace } from 'lodash';
import Link from 'next/link';

import Button from '../components/atoms/button';
import FormDivider from '../components/atoms/formDivider';
import Input from '../components/atoms/input';
import SocialLink from '../components/atoms/socialLink';
import Head from '../components/head';

export class AuthPage extends Component {
  componentDidMount() {
    this.setForm(this.props);
  }

  componentWillUpdate(nextProps) {
    // Update the form depending on the URL's params
    if (nextProps.router.query.authType !== this.props.router.query.authType) {
      this.setForm(nextProps);
    }
  }

  /**
   * Create the form depending on the URL
   * @param {Object} props
   */
  setForm = (props) => {
    //const params = props.location.search ? replace(props.location.search, '?code=', '') : props.match.params.id;
    //this.props.setForm(props.authType, params);
  }

  /**
   * Check the URL's params to render the appropriate links
   * @return {Element} Returns navigation links
   */
  renderLink = () => {
    if (this.props.router.query.authType === 'login') {
      return (
        <div>
          <Link href="/auth?authType=forgot-password">
            <a>Forgot Password</a>
          </Link>
          &nbsp;or&nbsp;
          <Link href="/auth?authType=register">
            <a>register</a>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <Link href="/auth?authType=login">
          <a>Ready to signin</a>
        </Link>
      </div>
    );
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
        <div className="wrapper">
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
                  this.props.submit();
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
          <div className="linkContainer">
          {this.renderLink()}
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter (AuthPage);
