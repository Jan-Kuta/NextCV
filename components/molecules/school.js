import React, { Component } from 'react';

class School extends Component {
    formatDate(dateStr) {
        if (!dateStr) {
            return (<span className="w3-tag w3-teal w3-round">Nynít</span>);
        }
        const date = new Date(dateStr);
        
        return date.toLocaleString('cs',{year: "numeric"});
    }
 
    render() {
        const { schoolName, faculty, major, degree, startDate, endDate, thesis } = this.props;
        return (
            <div className="w3-container">
                <h5 className="w3-opacity"><b>{schoolName}</b>, {faculty}</h5>
                <h6><i>{major} {degree ? `(${degree})` : null}</i></h6>
                <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right"></i>{`${this.formatDate(startDate)} - ${this.formatDate(endDate)}`}</h6>
                <p dangerouslySetInnerHTML={{__html: thesis}} />
                <br />
            </div>
        );
    }
}

export default School;