import React, { Component } from 'react';

class Job extends Component {
    formatDate(dateStr) {
        if (!dateStr) {
            return (<span className="w3-tag w3-teal w3-round">Nyní</span>);
        }
        const date = new Date(dateStr);
        
        return date.toLocaleString('cs',{month: "long", year: "numeric"});
    }
 
    render() {
        const { position, company, webpage, type, startDate, endDate, notes } = this.props;
        return (
            <div className="w3-container">
                <h5 className="w3-opacity"><b>{position} / <a href={webpage} target="_blank">{company}</a> {type ? `(${type})` : null}</b></h5>
                <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right"></i>{this.formatDate(startDate)} - {this.formatDate(endDate)}</h6>
                <p dangerouslySetInnerHTML={{__html: notes}} />
                <br />
            </div>
        );
    }
}

export default Job;