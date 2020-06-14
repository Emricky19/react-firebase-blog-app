export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) =>{
        //make async call to the database
        const firestore = getFirestore(); //getting reference to firestore, so we can add new data to the firestore
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid

        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            //rememeber you can also just type project alone instead of project: project
            dispatch({ type: 'CREATE_PROJECT', project: project }) 
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        });
    }
}

