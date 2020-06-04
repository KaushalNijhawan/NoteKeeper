import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/AntDesign'; 
import { deleteNote } from "../Actions/NoteActions";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Divider } from "react-native-paper";

class MoveNote extends React.Component {
    constructor() {
        super();
        this.state = {
            cate: []
        }
    }
    componentDidMount = () => {
        console.log(this.props.notes.length);
        var category = [];
        this.props.notes.map((l) => {
            if (category.length > 0 && category.includes(l.category) === false) {
                category.push(l.category);
            } else if (category.length === 0) {
                category.push(l.category);
            }
        })
        this.setState({ cate: category });
    }
    handleDelete=(category)=>{
        const search = this.props.notes.filter(NOTE => {
            return NOTE.category.toLowerCase().includes(category.toLowerCase())
        });
        var uid =[];
        for(var i=0;i<search.length;i++){
            uid.push(search[i].uid);
        }
        for(i=0;i<uid.length;i++){
            this.props.deleteNote(uid[i]);
        }
        Actions.home();

    }
    render() {
        const data = this.state.cate.map((l) => {
            return (
                <TouchableOpacity style={{borderWidth:2, marginTop:10 , borderRadius:10, marginHorizontal:25, height:50, width:280,alignSelf:"center"}} >
                    <Text style={{fontSize:25, alignSelf:"center"}}>{l}</Text><Entypo name="cross" size={27} style={{marginTop:-29 , alignSelf:"flex-end"}}  onPress={()=>this.handleDelete(l)}/>
                </TouchableOpacity>
            )
        })
        return (
            <View style={{backgroundColor:'#DDDDDD' , height:'100%' }}>
                <View style={{marginHorizontal:20}}>
                    <Text h3 style={{ marginTop:100}}>Move Categories</Text>
                    <Icons name="plus" size={50} style={{ marginTop:-42,alignSelf:"flex-end"}} onPress={()=>Actions.createNote()}/>
                </View>
                <Divider style={{backgroundColor:"black",width:400,alignSelf:"center", borderWidth:2}}/>
                <View style={{marginTop:100}}>
                    {data}
                </View>
            </View>
        )
    }
}
export default connect(null,{deleteNote})(MoveNote);