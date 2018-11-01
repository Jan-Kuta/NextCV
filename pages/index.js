import React, {Component} from 'react';
import Head from '../components/head';
import Navigation from '../components/organisms/navigation';
import withCookiesInProps from '../components/hoc/cookiesToProps';
import { runGraphQLRequest } from '../lib/auth';

const WelcomePage = (props) => {
    const { loggedUser, isAuthenticated, jwt, users} = props;

    return (
        <React.Fragment>
            <Head title="welcome">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
            </Head>
            <Navigation  loggedUser={loggedUser} isAuthenticated={isAuthenticated}/>
            <h1>Welcome {jwt}</h1>
            {users && users.map((user, index) => (
                <h4 key={index}>{`${user.email}: ${user.username}`}</h4>
            ))}
        </React.Fragment>
    );
}

WelcomePage.getInitialProps = () => {
    return runGraphQLRequest(`
            query {
            users {
                email
                username
            }
            }
        `,'aaaaaaaaaaa')
          .then(res => res.json())
          .then(json => json.data.users)
          .then(users => {
            console.log("users", users);
            return {users};
          })
          .catch((err) => {
            console.log(err)
            //Router.replace('/auth/login');
          })
};

export default WelcomePage; // withCookiesInProps(WelcomePage);