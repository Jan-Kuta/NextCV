import React, {Component} from 'react';

class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            isAuthenticated: true
        };
    }

    render() {
        const { isAuthenticated } = this.state;
        return (
            <React.Fragment>
                <div className="w3-top">
                    <nav className="w3-bar w3-dark-grey">
                        <a className="w3-bar-item w3-button w3-black">Next CV</a>
                        <div>
                            {isAuthenticated && (
                                <span>
                                    <a className="w3-bar-item w3-button w3-right">Log Out</a>
                                    <span className="w3-bar-item w3-right">Hello, user</span>
                                </span>
                            )}
                            {!isAuthenticated && (
                                <span>
                                    <a href="/neco" className="w3-bar-item w3-button w3-right">Log in</a>
                                    <a href="/new" className="w3-bar-item w3-button w3-right">Sign in</a>
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