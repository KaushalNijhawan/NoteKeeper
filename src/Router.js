import React from "react";
import {Router, Scene} from "react-native-router-flux";
import HomeNote from "./Components/HomeNote";
import AddingNotes from "./Components/AddingNotes";
import EditNote from "./Components/EditNote";
import SearchComponent from "./Components/SearchComponen";
import LongComponent from "./Components/OnLongPressComponent";
import MoveNote from "./Components/MoveNote";

class Routers extends React.Component{
    render(){
        return(
                <Router>
                    <Scene key ="root" hideNavBar>
                        <Scene key="home" component={HomeNote} initial/>
                        <Scene key="createNote" component={AddingNotes} />
                        <Scene key="editNote" component={EditNote}/>
                        <Scene key="searchNote" component={SearchComponent}/>
                        <Scene key="longSelect" component={LongComponent}/>
                        <Scene key="move" component={MoveNote}/>
                    </Scene>
                </Router>
        );
    }
}
export default Routers;