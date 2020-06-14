import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList  from '../projects/ProjectList';
import { connect } from 'react-redux';  //connecting react with redux
import { firestoreConnect } from 'react-redux-firebase' //connecting this component to firestore
import { compose } from 'redux' //to chain two higher order component
import { Redirect } from 'react-router-dom'
class Dashboard extends Component{ 
    render(){
        //console.log(this.props);
        const { projects, auth, notifications } = this.props;
        if(!auth.uid) return <Redirect to ="/signin" />
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications = {notifications} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}
export default compose(
    connect (mapStateToProps),
    firestoreConnect([
        { collection: 'projects', limit: 5, orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Dashboard); //higher order components