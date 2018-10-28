import React, {Component}  from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxPromise from 'redux-promise';
import reducers from '../reducers';
import CVForm from '../components/organisms/cvForm';
import Navigation from '../components/organisms/navigation';
import Head from '../components/head';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export class EditCV extends Component {
  render() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <div>
                <Head title="Edit">
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto' />
                </Head>
                <Navigation />
                <br />
                <br />
                <CVForm />
            </div>
        </Provider>
    );
  }
}

export default EditCV;
