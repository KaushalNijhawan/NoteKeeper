import {combineReducers} from "redux";
import NotesReducers from "./NotesReducers";
import FetchNotesReducers from "./FetchNotesReducers";
export default combineReducers({
    notes : NotesReducers,
    noteget : FetchNotesReducers
})