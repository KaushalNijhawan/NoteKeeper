import React from "react";
import { View  ,TouchableOpacity} from "react-native";
import { Text, Button } from "react-native-elements";
import { TextInput } from 'react-native-paper';
import {updateNote} from "../Actions/NoteActions";
import {connect} from "react-redux";
class EditNotes extends React.Component {
    constructor(){
        super();
        this.state={
            category:this.props?.noteFilter[0].category,
            title:this.props?.noteFilter[0].title,
            message:this.props?.noteFilter[0].message
        }
    }
    handleCategoryEdit = (text)=>{
            this.setState({category:text});
        

         console.log(this.state.category);
    }
    handleTitleEdit=(text)=>{
        this.setState({title:text})
        console.log(this.state.title);
    }
    handleMessageEdit=(text)=>{
        this.setState({message:text});
    }
    handleEditOfNote=()=>{
        var date = new Date().getDate(); 
        var month = new Date().getMonth() + 1; 
        var year = new Date().getFullYear();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
        const createdDate = date+"-"+months[month-1] +"-"+year;
        var hours = new Date().getHours(); //To get the Current Hours
        var min = new Date().getMinutes();
        const time = "";
        if(hours <=11){
            time = hours + ":" + min + " AM";
        }else{
            time = hours + ":" + min + " PM";
        }
    

        const Note = {
            category:this.state.category===undefined ?this.props.noteFilter[0].category:this.state.category ,
            title:this.state.title,
            message:this.state.message,
            lastModified: createdDate,
            uid:this.props.noteFilter[0].uid,
            createdDate:this.props.noteFilter[0].createdDate,
            timecreated:time
        }
        this.props.updateNote(Note);
    }
    componentDidMount=()=>{
        console.log(this.props.noteFilter);
    }
    render() {
        return (
            <View>
                <View style={{marginTop:35}}>
                   <Text h3 style={{alignSelf:"center" , color:"purple"}}> Edit Notes</Text>
              </View>
                <View style={{marginTop:30}}>
                    <TextInput
                        label='UnCategorised'
                        onChangeText={(text)=>this.handleCategoryEdit(text)}
                        mode="outlined"
                        editable
                        selectionColor="#888888"
                        style={{marginHorizontal:10 , fontSize:20}}
                        defaultValue={this.props.noteFilter[0].category}
                    />
                        <TextInput
                        label='Title'
                       onChangeText={(text)=> this.handleTitleEdit(text)}
                        mode="outlined"
                        editable
                        selectionColor="#888888"
                        style={{marginHorizontal:10 , fontSize:20}}
                        defaultValue={this.props.noteFilter[0].title}
                    />
                        <TextInput
                        label='Message'
                        onChangeText={(text)=>this.handleMessageEdit(text)}
                        mode="outlined"
                        editable
                        style={{marginHorizontal:10 , height:200 , fontSize:30, paddingTop:-10}}
                        text
                        selectionColor="#888888"
                        defaultValue={this.props.noteFilter[0].message}
                        
                        
                    />
                </View>
                <TouchableOpacity style={{marginTop:40, borderWidth:3, borderColor:"purple", height:70, borderRadius:15, marginHorizontal:20, width:220,alignSelf:"flex-end"}} onPress={()=>this.handleEditOfNote()}>
                    <Text style={{alignSelf:"center"  ,marginTop:7}} h3>Save</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row" , marginTop:35}}>
                    <Text style={{fontSize:20 , opacity:0.5}}>LastModified Date : </Text> 
                    <Text style={{fontSize:20 , opacity:0.5}}>{this.props.noteFilter[0].lastModified}</Text>   
                </View> 
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:20 , opacity:0.5}}>ModifiedTime : </Text> 
                    <Text style={{fontSize:20 , opacity:0.5}}>{this.props.noteFilter[0].timecreated }</Text>   
                </View>

            </View>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        category : state.notes.category,
        title : state.notes.title,
        message : state.notes.message    
    }
    
}
export default connect(mapStateToProps , {updateNote})(EditNotes);