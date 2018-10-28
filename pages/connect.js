import React, {Component}  from 'react';
import Router, {withRouter} from 'next/router'
import {authenticateProvider, setToken} from '../lib/auth';

export class Connect extends Component {
  componentDidMount() {
    authenticateProvider(this.props.router.query.provider, this.props.router.query)
      .then((res) => {
        Router.replace('/');
        setToken(res);
      })
      .catch(() => {
        Router.replace('/auth/login');
      })
  }

  render() {
    return (
      <div>
        <h2>Retrieving your token and checking validity</h2>
      </div>
    );
  }
}

export default withRouter (Connect);
