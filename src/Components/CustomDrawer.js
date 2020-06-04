import React from "react";
import { View, TouchableOpacity ,TouchableHighlight} from "react-native";
import { Text, Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Actions } from "react-native-router-flux";
class CustomDrawer extends React.Component {
    constructor() {
        super();
        this.state = {
            cate: []
        }
    }
    filteringtTheCategory = (category) => {
        const search = this.props.notes.filter(NOTE => {
            return NOTE.category.toLowerCase().includes(category.toLowerCase())
        })
        return search.length;
    }
    componentDidMount = () => {
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

    render() {

        const data = this.state.cate.map((l) => {
            const lenn = this.filteringtTheCategory(l);
            return (
                <TouchableOpacity style={{ marginTop: 10 }}>
                    <View style={{height:50, justifyContent:"center"}}>
                        <Text style={{fontSize:20}}>{l}</Text>
                            <Text style={{width:100}}></Text>
                        <Text style={{alignSelf:"flex-end" , marginTop:-45, marginHorizontal:20 ,fontSize:20}}>{lenn}</Text>

                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <View>
                <View style={{ marginTop: 120 }}>
                    <FontAwesome name="sticky-note" size={80} style={{ alignSelf: "center" }} />
                </View>
                <View style={{marginTop:100}}>
                    <TouchableHighlight onPress={()=>this.props.onMov()} underlayColor="#929189" style={{ width:80}}>
        <Text style={{fontSize:20}}>AllNotes</Text></TouchableHighlight><Text style={{width:100}}></Text><Text style={{fontSize:20,marginTop:-40,alignSelf:"flex-end", marginHorizontal:20}}>{this.props.notes.length}</Text> 
                </View>
                <View style={{ marginTop: 10 }}>

                    {data}
                </View>
               <TouchableOpacity style={{justifyContent:"center", marginTop:30 , borderWidth:2, borderRadius:10, marginHorizontal:15, height:50}} onPress={()=>{
                   this.props.onMov();
                   Actions.move({notes:this.props.notes});
               }}>
                  {/* <FontAwesome5 name="backspace" size={50} style={{alignSelf:"center"}} onPress={()=>this.props.onMov()}/>  */}
                 <Text style={{fontSize:25, alignSelf:'center'}}>Manage Categories</Text>
               </TouchableOpacity>

            </View>
        );
    }
}
export default CustomDrawer;