import firebase from "firebase";
import { Actions } from "react-native-router-flux";
export const changeInCategory =(category)=>{
    console.log(category);
    return {
        type:"changeCategory",
        payload : category
    }
}   
export const changeInTitle =(title)=>{
      return {
          type : "changeTitle",
          payload:title
      }
}
export const changeInMessage =(message)=>{
    return {
        type:"changeMessage",
        payload:message
    }
}
export const createNote = (Note)=>{
    const {category , title , message ,createdDate,lastModified,timecreated} = Note;
    return(dispatch)=>{
        firebase.database().ref('/Notes').push({category,title,message,createdDate,lastModified,timecreated})
        .then(()=>{
             dispatch({
                 type:"NoteCreated"
             })
        })
        Actions.home();
    }
    
}
export const fetchNote = ()=>{
    return(dispatch)=>{
        firebase.database().ref("/Notes").on('value',snapshot=>{
          
            dispatch({
                type:"EmployeeFetch",
                payload:snapshot.val()
            })
        })
    }    
}
export const updateNote =(Note)=>{
    const {category , title , message ,createdDate,lastModified ,timecreated} = Note;
    return(dispatch)=>{
        firebase.database().ref("/Notes/"+Note.uid).set({category,title,message,lastModified, createdDate , timecreated})
        .then(()=>{
            dispatch({type:"Employe-Update"})
            Actions.home();
        })
    }
}
export const deleteNote = (uid)=>{

        return(dispatch)=>{
            firebase.database().ref("/Notes/"+uid).remove()
            .then(()=>{
                dispatch({type:"deleteNote"})
            })
            
        }
    

    
    
   
}

// const deleteEveryNoteWithUID = (uid)=>{
//     console.log(uid);
//     return(dispatch)=>{
//         firebase.database().ref("/Notes/"+uid).remove()
//         .then(()=>{
//             dispatch({type:"deleteNote"})
//         }).catch(()=>{
//             console.log("error!");
//         })
//     }
// }
