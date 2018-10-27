import React, {Component}  from 'react';
import Router, {withRouter} from 'next/router'
import {authenticateProvider} from '../lib/auth';

export class Connect extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = { error: null }
  }

  componentDidMount() {
    authenticateProvider(this.props.router.query.provider, this.props.router.query)
      .then((res) => {
        Router.replace('/');
      })
      .catch((err) => {
        Router.replace('/');
      })
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        { error && (
          <div className="w3-red">{error}</div>
        )}
        <h2>Retrieving your token and checking validity</h2>
      </div>
    );
  }
}

export default withRouter (Connect);
