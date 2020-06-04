import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { Searchbar } from 'react-native-paper';
import ReactVoiceInput from 'react-voice-input'
import { Actions } from "react-native-router-flux";
class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: this.props.notes,
            searchNote: "",
            findNote: []

        }
    }
    componentDidMount = () => {

    }
    handleSearchText = (term) => {
        this.setState({ searchNote: term });
        if (term !== "") {
            const search = this.props.notes.filter(NOTE => {
                return NOTE.title.toLowerCase().includes(term.toLowerCase())
            })
            this.setState({ findNote: search });
        } else {
            this.setState({ findNote: [] });
        }

        console.log(this.state.findNote.length);

    }
    render() {
        const data = this.state.findNote.map((l) => {
            return (
                <TouchableOpacity onPress={() => Actions.editNote({ noteFilter: this.state.findNote })}>
                    <View style={{ height: 200, width: 200, borderRadius: 7, backgroundColor: "#DDDDDD", marginHorizontal: 20, marginTop: 50 }}>
                        <Text style={{ marginHorizontal: 40 }}>{l.title}</Text>
                        <Text style={{ alignSelf: "center", marginTop: 15 }}>{l.lastModified}</Text>
                        <Text style={{ marginLeft: 20, marginTop: 15 }}>{l.message}</Text>
                    </View>
                </TouchableOpacity>
            );

        })
        return (
            <View>
                <Searchbar
                    placeholder="Type Title Here..."
                    onChangeText={(term) => this.handleSearchText(term)}
                    style={{ borderRadius: 5, borderColor: "white", backgroundColor: "#4d4d4d", height: 70 }}
                    inputStyle={{ color: "#f2f2f2", fontSize: 30 }}
                    placeholderTextColor="#f2f2f2"
                    iconColor="#f2f2f2"
                />
                {this.state.findNote.length === 0 ? <View style={{ justifyContent: "center", alignSelf: "center", marginTop: 250, opacity: 0.3 }}>
                    <Text h3>No Result Found!</Text>
                </View> :
                    data}

            </View>
        );
    }
}
export default SearchComponent;