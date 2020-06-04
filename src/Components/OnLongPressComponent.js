import React from "react";
import { View, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Text, CheckBox } from "react-native-elements";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialIcons2 from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { deleteNote } from "../Actions/NoteActions";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Linking ,Share} from "react-native";
class LongComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedNotes: 0,
            selecteduid: [],
            open: false,
            visible: false
        }
    }
    // shareToWhatsApp = (text) => {
    //     Linking.openURL(`whatsapp://send?text=${text}`);
    //   }
    handleDeleteNode = (uid)=>{
        var i =0;
        for(i=0;i<uid.length;i++){
            this.props.deleteNote(uid[i]);
        }
        Actions.home();
    }
    handleCheckState = (uid) => {
        if (this.state.selecteduid.includes(uid) === false) {
            this.setState({ selecteduid: this.state.selecteduid.concat(uid) });
            this.setState({ visible: true });

        } else {
            this.state.selecteduid.splice(this.state.selecteduid.indexOf(uid), 1);
            console.log("present");
            this.setState({ visible: false });
        }
    }
    handleSharingNotes=(uid)=>{
        const search = this.props.notes.filter(NOTE => {
            return NOTE.uid.toLowerCase().includes(uid[0].toLowerCase())
        });
        var text = search[0].title + "\n" + search[0].message;
        console.log(search);
        this.shareToWhatsApp(text);
    }
    ShareMessage = (uid) => {
       const text = this.getText(uid);
        Share.share({
          message: text,
        })
        .then(result => console.log(result))
        .catch(errorMsg => console.log(errorMsg));
      };
      getText = (uid)=>{
        var text = "";
        for(var i =0;i<uid.length;i++){
            const search = this.props.notes.filter(NOTE => {
                return NOTE.uid.toLowerCase().includes(uid[i].toLowerCase())
              });   
             text = text + search[0].title + "--->" + search[0].message + "\n";
        }  
        return text;
      }
    componentDidMount = () => {
        if(this.props.uid!== ""){
            this.setState({ selecteduid: this.state.selecteduid.concat(this.props.uid) });
        }
        
    }
    render() {
        const data = this.props.notes.map((l) => {
            return (
                <TouchableWithoutFeedback style={{ height: 150, width: 150, borderRadius: 7, backgroundColor: "#DDDDDD", marginHorizontal: 20, marginTop: 50 }} onPress={() => this.handleCheckState(l.uid)}>

                    <View style={{ height: 200, width: 200, borderRadius: 7, backgroundColor: "#DDDDDD", marginHorizontal: 20, marginTop: 50 }}>
                        {this.state.selecteduid.includes(l.uid) ? <Ionicons name="md-checkmark-circle-outline" size={27} onPress={() => this.handleCheckState(l.uid)} /> : <Entypo name="circle" size={25} onPress={() => this.handleCheckState(l.uid)} />}
                        <Text style={{marginHorizontal:40}}>{l.title}</Text>
                        <Text style={{alignSelf:"center" , marginTop:15}}>{l.lastModified}</Text>
                        <Text style={{marginLeft:20, marginTop:15}}>{l.message}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
        return (
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <View style={{ justifyContent: "center", alignSelf: "center", marginTop: 120, opacity: 0.5 }} onPress={() => console.log("press!")} >
                        {this.state.selectedNotes >= 0 ? <Text h3>{this.state.selecteduid.length + " Selected"}</Text> : <Text h3>Select Notes</Text>}
                    </View>

                    {data}

                </View>
                <View style={{ flex: 1 }}>
                    {this.state.selecteduid.length > 0 ? <View style={{ marginBottom: -20, justifyContent: "center", height: 200 , marginTop:20}}>
                        <View style={{flexDirection:"column", marginHorizontal:20}}>
                        <MaterialIcons name="cancel" size={30} onPress={() => this.setState({ selecteduid: [] })} />
                            <Text>Cancel</Text>
                            </View>
                        <View style={{flexDirection:"column" , alignSelf:"center" , bottom:50}}>
                        <MaterialIcons2 name="share" size={30} onPress={()=>this.ShareMessage(this.state.selecteduid)}/>
                            <Text>Share</Text>
                            </View>
                            <View style={{flexDirection:"column" , alignSelf:"flex-end" , marginHorizontal:20, bottom:100}}> 
                        <Feather name="delete" size={30} onPress= {()=>this.handleDeleteNode(this.state.selecteduid)}/>
                        <Text>Delete</Text>
                        </View>

                    </View> : null}
                </View>


            </ScrollView>


        );
    }
}
export default connect(null,{deleteNote})(LongComponent);