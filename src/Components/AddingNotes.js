import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-elements";
import { TextInput } from 'react-native-paper';
import { changeInCategory, changeInMessage, changeInTitle, createNote } from "../Actions/NoteActions";
import { connect } from "react-redux";
class AddingNotes extends React.Component {
    handleCreationOfNote = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const createdDate = date + "-" + months[month - 1] + "-" + year;
        var hours = new Date().getHours(); //To get the Current Hours
        var min = new Date().getMinutes();
        var time = "";
        if(hours <=11){
            time =  hours + ":" + min + " AM";
        }else{
            time =  hours + ":" + min + " PM";
        }

        const Note = {
            category: this.props.category,
            title: this.props.title,
            message: this.props.message,
            createdDate: createdDate,
            lastModified: createdDate,
            timecreated:time
        }
        this.props.createNote(Note);
    }
    handleFocus = () => {
        console.log("focus!")
    }
    render() {
        return (
            <View>
                <View style={{ marginTop: 35 }}>
                    <Text h3 style={{ alignSelf: "center" , color:"purple" }}> Create Notes</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        label='UnCategorised'
                        onChangeText={(text) => this.props.changeInCategory(text)}
                        multiline
                        mode="outlined"
                        editable
                        selectionColor="#888888"
                        style={{ marginHorizontal: 10 , fontSize:20}}
                        onFocus={() => this.handleFocus()}
                    />
                    <TextInput
                        label='Title'
                        onChangeText={(text) => this.props.changeInTitle(text)}
                        multiline
                        mode="outlined"
                        editable
                        selectionColor="#888888"
                        style={{ marginHorizontal: 10 , fontSize:20}}
                    />
                    <TextInput
                        label='Message'
                        onChangeText={(text) => this.props.changeInMessage(text)}
                        multiline
                        mode="outlined"
                        editable
                        style={{ marginHorizontal: 10, height: 200, fontSize:30, paddingTop:-10 }}
                        text
                        selectionColor="#888888"


                    />
                </View>
                <TouchableOpacity style={{ marginTop: 40, borderWidth: 3, borderColor: "purple", height: 70, borderRadius: 15, marginHorizontal: 20, width: 220, alignSelf: "flex-end" }} onPress={() => this.handleCreationOfNote()}>
                    <Text style={{ alignSelf: "center", marginTop: 7 }} h3>Create</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.notes.category,
        title: state.notes.title,
        message: state.notes.message
    }

}
export default connect(mapStateToProps, { changeInCategory, changeInMessage, changeInTitle, createNote })(AddingNotes);