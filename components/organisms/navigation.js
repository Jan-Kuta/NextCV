import React, {Component} from 'react';
import Link from 'next/link';
import { getUserFromServerCookie, getUserFromLocalCookie, unsetToken} from '../../lib/auth';

class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = this.getStateFromCookie();
    }

    getStateFromCookie = () => {
        const loggedUser = getUserFromLocalCookie()
        return {
            isAuthenticated: !!loggedUser,
            loggedUser
        };
    }

    static async getInitialProps({ req }) {
        const loggedUser = process.browser
            ? getUserFromLocalCookie()
            : getUserFromServerCookie(req);
        console.log("is authenticated");
        console.log(loggedUser);
        let path = req ? req.pathname : "";
        path = "";
        return {
            loggedUser,
            currentUrl: path,
            isAuthenticated: !!loggedUser
        };
    }

    logout = () => {
        unsetToken();
        this.setState(this.getStateFromCookie());
    }

    render() {
        const { isAuthenticated, loggedUser } = this.state;
        return (
            <React.Fragment>
                <div className="w3-top">
                    <nav className="w3-bar w3-dark-grey">
                        <a className="w3-bar-item w3-button w3-black">Next CV</a>
                        <div>
                            {isAuthenticated && (
                                <span>
                                    <a className="w3-bar-item w3-button w3-right" onClick={this.logout}>Log Out</a>
                                    <span className="w3-bar-item w3-right">Hello, {loggedUser}</span>
                                </span>
                            )}
                            {!isAuthenticated && (
                                <span>
                                    <Link href="/auth?authType=login" as="/auth/login"><a className="w3-bar-item w3-button w3-right">Log in</a></Link>
                                    <Link href="/auth?authType=register" as="/auth/register"><a className="w3-bar-item w3-button w3-right">Sign in</a></Link>
                                </span>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="nav-filler" />
            </React.Fragment>
        );
    }
}

export default Navigation;