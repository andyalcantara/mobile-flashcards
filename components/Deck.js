import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Platform } from 'react-native';
import { removeDeck } from '../utils/helpers';

import { connect } from 'react-redux';
import { deleteDeck } from '../actions/index';

class Deck extends Component {

    static navigationOptions = {
        title: 'Deck',
    }

    handleDelete = (title) => {

        const { dispatch } = this.props;
        removeDeck(title);
        this.props.navigation.goBack();
        dispatch(deleteDeck(title));
    }

    render() {
        const { navigation, decks } = this.props;
        const deck = navigation.getParam('deck');

        const title = deck.title;

        let reduxDeck = decks[title];

        let questions = [];

        if (decks[title] === undefined) {
            questions = [];
        } else if (decks[title] !== undefined) {
            questions = decks[title].questions;
        }

        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flex: Platform.OS === 'ios' ? 3 : 2, justifyContent: 'center'}}>
                    <Text>{title}</Text>
                    <Text>{questions.length} cards</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <TouchableOpacity style={styles.addCard} onPress={() => this.props.navigation.navigate('AddCard', {title: deck.title})}>
                        <Text style={{color: '#000'}}>Add Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quizBtn} onPress={() => this.props.navigation.navigate('Quiz', {deck: reduxDeck})}>
                        <Text style={{color: 'white'}}>Start Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteBtn} onPress={() => this.handleDelete(title)}>
                        <Text style={{color: 'red', fontWeight: 'bold'}}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    quizBtn: {
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 40,
        width: 130,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    addCard: {
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteBtn: {
        height: 40,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
});

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Deck);