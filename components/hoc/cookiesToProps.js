import React, {Component} from 'react';
import { getUserFromServerCookie, getUserFromLocalCookie } from '../../lib/auth';

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
    console.log("is authenticated");
    console.log(loggedUser);
    
    return {
        loggedUser,
        isAuthenticated: !!loggedUser
    };
  }
    
  return CookiesToPropsHOC;
};

export default CookiesToProps;