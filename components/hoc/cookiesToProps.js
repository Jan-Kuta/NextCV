import React, {Component} from 'react';
import { getUserFromServerCookie, getUserFromLocalCookie, getTokenFromServerCookie, getTokenFromLocalCookie } from '../../lib/auth';

const CookiesToProps = (WrappedComponent) => {
  class CookiesToPropsHOC extends Component {
    render() {
      return <WrappedComponent {...this.props} a={true}/>;
    }
  }

  CookiesToPropsHOC.getInitialProps = async ({ req }) => {
    const loggedUser = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(req);
    const jwt = process.browser
        ? getTokenFromLocalCookie()
        : getTokenFromServerCookie(req);
    console.log("is authenticated");
    console.log(loggedUser);
    console.log('jwt', jwt);
    
    return {
        loggedUser,
        isAuthenticated: !!loggedUser,
        jwt: jwt
    };
  }
    
  return CookiesToPropsHOC;
};

export default CookiesToProps;