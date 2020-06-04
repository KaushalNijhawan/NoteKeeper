const INITIAL_STATE ={category : "" , title : "" , message : ""};
export default (state = INITIAL_STATE , Action)=>{
    switch(Action.type){
        case "changeCategory":
            return {...state , category:Action.payload}
        case "changeTitle":
            return {...state , title:Action.payload}
        case "changeMessage" :
            return  {...state , message : Action.payload}
        case "NoteCreated" :
            return INITIAL_STATE;
        case "deleteNote":
            return INITIAL_STATE;
        default:
            return state;
    }
}