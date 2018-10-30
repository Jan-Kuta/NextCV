import React, {Component} from 'react';
import Head from '../components/head';
import Navigation from '../components/organisms/navigation';
import withCookiesInProps from '../components/hoc/cookiesToProps';
import { runGraphQLRequest } from '../lib/auth';

class WelcomePage extends Component {
    constructor(){
        super();
         this.state = {
             users: []
         };
    }
    componentDidMount() {
        runGraphQLRequest(`
            query {
            users {
                email
                username
            }
            }
        `)
          .then(users => {
            console.log("users", users);
            this.setState({users: users.data.users});
          })
          .catch((err) => {
            console.log(err)
            //Router.replace('/auth/login');
          })
      }

    render() {
        const { loggedUser, isAuthenticated, jwt} = this.props;
        const { users } = this.state;
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
}

export default withCookiesInProps(WelcomePage);