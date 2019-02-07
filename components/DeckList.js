import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { getDeck, getDecks } from '../utils/helpers';
import { addDeck } from '../actions/index';

class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        getDecks().then(titles => {
            return titles.map(title => {
                if (title !== 'flashcardsNotifications') {
                    getDeck(title).then(value => {
                        let deck = JSON.parse(value);
                        dispatch(addDeck({title: title, questions: deck.questions}));
                    });
                }
            });
        });
    }

    static navigationOptions = {
        title: 'Decks'
    }

    render() {
        const { storageDecks } = this.props;

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>

                    <FlatList 
                        data={storageDecks}
                        keyExtractor={(item, index) => item.title}
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                style={styles.deck} 
                                onPress={() => this.props.navigation.navigate('Deck', {deck: item})}
                            >
                                <Text >{item.title}</Text>
                                <Text style={{color: 'darkgray'}}>{item.questions.length} cards</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    deck: {
        height: 100,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

function mapStateToProps(state) {

    console.log(state, 'State');

   return {
       storageDecks: Object.keys(state).map(key => state[key])
   }
}

export default connect(mapStateToProps)(DeckList);