import React from 'react';
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom';


const ProjectList = ({projects}) => {
    return(
        <div className="project-list section">
            {/* this below line block of code checks if there's any value in "projects" and if there is it should perform th map
            function else it should not*/} 
            { projects && projects.map(project => {
                return (

                    <Link to={"/project/" + project.id} key={project.id}>
                        <ProjectSummary project = {project}  />
                    </Link>
                )
            })}
        </div>
    )
}

export default ProjectList