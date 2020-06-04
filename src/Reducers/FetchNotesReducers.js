const INITIAL_STATE={};
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "EmployeeFetch":
            //console.log(action.payload);
            return action.payload
        default:
            return state
    }
}