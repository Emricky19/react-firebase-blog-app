import React from 'react'

import {connect} from 'react-redux'; //to connect react to redux
import {firestoreConnect} from 'react-redux-firebase' //allows the connection between this component and react
import {compose} from 'redux'; //to allow to higher order component
import {Redirect} from 'react-router-dom'
import moment from 'moment'

export const ProjectDetails = (props) => {
    // console.log(props)  
    // const id = props.match.params.id
    
    const {project, auth} = props
    if(!auth.uid) return <Redirect to="/signin" />
    if(project){
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{project.title} </span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName + " " + project.authorLastName}</div>
                        <div>
                            <p>{moment(project.createdAt.toDate()).calendar()}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    return (
        <div className="container center">
            <p>Loading project...</p>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state) //to see what i was getting from the firestore
    // getting the current page id
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null
    return{
      project: project,
      auth: state.firebase.auth
    }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
)
(ProjectDetails)