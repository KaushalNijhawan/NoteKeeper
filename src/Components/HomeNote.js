import React from "react";
import { View, TouchableOpacity, TouchableWithoutFeedback, FlatList, ScrollView, Modal } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { Searchbar } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Actions } from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo2 from "react-native-vector-icons/Entypo";
import AntDesign2 from "react-native-vector-icons/AntDesign";
import { fetchNote } from "../Actions/NoteActions";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import CustomDrawer from "./CustomDrawer";
import {Divider} from "react-native-paper";

class HomeNote extends React.Component {
    constructor() {
        super();
        this.state = {
            search: false,
            showIcons: false,
            title: "",
            uid: "",
            visible: false,
            list: true,
            menuvisible:false
        }
    }
    setActive = (term) => {
        this.setState({ active: term })
    }
    handleModalVisible = () => {
        this.setState({ visible: true });
    }
    componentDidMount = () => {
        this.props.fetchNote();
    }
    filterTheNoteToEdit = (uid) => {
        const search = this.props.note.filter(NOTE => {
            return NOTE.uid.toLowerCase().includes(uid.toLowerCase())
        })
        Actions.editNote({ noteFilter: search });
    }
    _openMenu = () => this.setState({ menuvisible: true });

  _closeMenu = () => this.setState({ menuvisible: false });

    render() {
        return (
            <View style={{ height: "100%", flex: 1 }}>
                {this.state.visible === true ? <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {
                        this.setState({ visible: false })

                    }}
                    hardwareAccelerated
                >
                    <View style={{ backgroundColor: "000000aa", flex: 1 }}>
                        <View style={{ backgroundColor: "#DDDDDD", borderRadius: 10, flex: 1, height: 100, width: 300, borderRightColor: "black", elevation: 20 }}>
                            <View><CustomDrawer notes={this.props.note} onMov={() => this.setState({ visible: false })} /></View>
                        </View>
                    </View>
                </Modal> : null}
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 150 }}>
                            <Text h3>My </Text ><Text h3>Notes</Text>
                        </View>

                        <View style={{ justifyContent: "flex-start", marginHorizontal: 10, marginTop: 40 }}>
                            <Icon name="menu" size={40} onPress={() => this.handleModalVisible()} />
                        </View>
                        <View style={{ marginTop: -40, marginHorizontal: 70 }}>
                            <Feather name="search" size={40} style={{ alignSelf: "flex-end" }} onPress={() => Actions.searchNote({ notes: this.props.note })} />
                        </View>


                         <View style={{ marginTop: -40 }}>
                            <Entypo name="dots-three-vertical" size={40} style={{ alignSelf: "flex-end" }} onPress={()=>this._openMenu()} />
                        </View>
                            <Modal visible={this.state.menuvisible}
                              transparent={true}
                              animationType="none"
                              onRequestClose={()=>this._closeMenu()}
                              presentationStyle="overFullScreen"
                            >
                                <View style={{height:150, width:150, backgroundColor:"#DDDDDD" , alignSelf:"flex-end" , marginTop:240 , marginHorizontal:10 , borderRadius:15,elevation:5}}>
                                <TouchableOpacity onPress={()=>{
                                    this._closeMenu();
                                    Actions.longSelect({ notes: this.props.note, uid:""});
                                }}>
                                    <Text style={{fontSize:30, alignSelf:"center" , marginTop:20}}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                                <Divider style={{borderWidth:1 , marginTop:20}}/>
                                <TouchableOpacity onPress={()=>{
                                    this._closeMenu();
                                    Actions.move({notes:this.props.note});
                                }}>
                                    <Text style={{fontSize:30 , alignSelf:"center" , marginTop:20}}>Move</Text>
                                </TouchableOpacity>
                                </View>
                            </Modal>
                        
                       
                        {this.state.visible === false || this.state.list === true ? <FlatList

                            data={this.props.note}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableWithoutFeedback
                                        onLongPress={() => Actions.longSelect({ notes: this.props.note, uid: item.uid })}
                                        onPress={() => this.filterTheNoteToEdit(item.uid)}
                                        style={{ height: 150, width: 150, borderRadius: 7, backgroundColor: "#DDDDDD", marginHorizontal: 20, marginTop: 50 }}>
                                        <View style={{ height: 200, width: 200, borderRadius: 7, backgroundColor: "#DDDDDD", marginHorizontal: 20, marginTop: 50 }}>
                                            <Text style={{ marginHorizontal: 40,marginTop:20 }}>{item.title}</Text>
                                            <Text style={{ alignSelf: "center", marginTop: 15 }}>{item.lastModified}</Text>
                                            <Text style={{ marginLeft: 20, marginTop: 15 }}>{item.message}</Text>
                                        </View>

                                    </TouchableWithoutFeedback>
                                )


                            }}
                            keyExtractor={item => item.id}
                        /> : null}
                          
                        <TouchableOpacity style={{ marginHorizontal: 10 }}>
                            <AntDesign name="pluscircle" size={50} style={{ alignSelf: "flex-end", marginRight: 15, marginBottom: 15 }} color="#FF6666" onPress={() => Actions.createNote()} />
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        );
    }

}


const mapStateToProps = state => {
    const notes = _.map(state.noteget, (val, uid) => {
        return { ...val, uid };

    })
    return { note: notes };
}
export default connect(mapStateToProps, { fetchNote })(HomeNote);