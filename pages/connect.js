import React, {Component}  from 'react';
import Router, {withRouter} from 'next/router'
import {authenticateProvider, setToken, runGraphQLRequest} from '../lib/auth';

export class Connect extends Component {
  componentDidMount() {
    authenticateProvider(this.props.router.query.provider, this.props.router.query)
      .then((res) => {
        setToken(res);
        console.log('res', res);
        console.log('access_token',this.props.router.query.access_token);
        return runGraphQLRequest(`
          query {
            users {
              email
              username
            }
          }
        `);
        // Router.replace('/');
      })
      .then(users => {
        console.log("users", users);
      })
      .catch((err) => {
        console.log(err)
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
