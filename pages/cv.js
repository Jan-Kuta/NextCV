
import React, { Component } from 'react';
import kutik from '../static/kutik';
import Head from '../components/head';
import CVTemplate from '../components/templates/cvTemplate';


class CVPage extends Component{
    constructor(){
        super();

        this.state = {user: kutik};
    }

    render() {
        return (
            <div className="w3-content w3-margin-top w3-margin-bottom" style={{maxWidth:'1400px'}}>
                <Head title="CV">
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/static/cv.css" />
                </Head>            
                <CVTemplate user={this.state.user} />
            </div>
        );
    }
}

export default CVPage;