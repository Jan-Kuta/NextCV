import React, {Component}  from 'react';
import Router, {withRouter} from 'next/router'
import {authenticateProvider} from '../lib/auth';

export class Connect extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    authenticateProvider(this.props.router.query.provider, this.props.router.query)
      .then((res) => {
        console.log("OK", res);
        Router.replace('/cv');
      }
      ).catch((err) => 
        console.error("Chybka", err)
      )
  }

  render() {
    return (
      <h2>Retrieving your token and checking validity</h2>
    );
  }
}

export default withRouter (Connect);
