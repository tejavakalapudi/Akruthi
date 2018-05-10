import uuid from "uuid";
import database from "../firebase/firebase";

export const addProject = ( project ) => ({
    type : "ADD_PROJECT",
    project
});

export const startAddProject = ( projectData = {} ) => {

    return ( dispatch ) => {
        const {
            id = "", 
            title = "",
            subTitle = "",
            overview = "", 
            floorPlan = "",  
            locationMapInfo = "",
            address = "",  
            specs = "",
            amenities = "",
            brochure = "", 
            createdOn = 0,
            imageLocation = "",
            thumbnailLocation = "",
            status = "" 
        } = projectData;;

        return database.ref( "projects" ).push( projectData ).then((ref) => {
            dispatch( addProject({
                id : ref.key,
                ...projectData
            }));
        })
    }
};

export const removeProject= ( { id } = {} ) => ({
    type : "REMOVE_PROJECT",
    id    
});

export const editProject = ( id, project ) => ({
    type : "EDIT_PROJECT",
    id,
    project    
});

// SET_PROJECTS
export const setProjects = ( projects = [] ) => ({
    type : "SET_PROJECTS",
    projects    
});

// startSetExpenses

export const startSetProjects = () => {
    
    return( dispatch ) => {

        return database.ref( "projects" ).once( "value")
            .then(( snapshot ) => {

                    const projects = [];
            
                    snapshot.forEach(( project ) => {
            
                        projects.push({
                            id : project.key,
                            ...project.val()
                        })
            
                    })
            
                    dispatch( setProjects( projects ) );
            
                }
            )
            .catch( ( e ) => {
                console.log( "Fetching projects data has failed with error ", e );
            });
    };

};