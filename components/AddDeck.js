import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    SafeAreaView, 
    TouchableOpacity,
    KeyboardAvoidingView } from 'react-native';
import { saveDeckTitle, getDeck } from '../utils/helpers';

import { addDeck } from '../actions';
import { connect } from 'react-redux';

class AddDeck extends Component {

    state = {
        deckTitle: '',
    }

    handleText = (text) => {
        this.setState({
            deckTitle: text
        });
    }

    submit = () => {
        const { deckTitle } = this.state;
        const { dispatch, navigation } = this.props;

        if (!deckTitle) {
            return alert("Please give a name to your deck");
        } else {
            saveDeckTitle(deckTitle);
            dispatch(addDeck({title: deckTitle, questions: []}));

            this.setState({
                deckTitle: ''
            });

            getDeck(deckTitle).then((deck) => {
                if (deck !== null) {
                    navigation.navigate('Deck', {deck: JSON.parse(deck)});
                }
            });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>

                <View style={styles.form}>
                    <Text style={styles.text}>What is the title of your new deck?</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={this.handleText} 
                        value={this.state.deckTitle} 
                    />
                    <TouchableOpacity 
                        style={[styles.submitButton, {alignSelf: 'center'}]} 
                        onPress={this.submit}
                    >
                        <Text style={{color: '#fff', textAlign: 'center'}}>Create Deck</Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 10,
    },
    input: {
        marginTop: 80,
        height: 40,
        borderWidth: 1,
        borderColor: '#A9A9A9',
        borderRadius: 5,
    },
    text: {
        fontSize: 30,
        marginTop: 100,
        alignContent: 'center'
    },
    submitButton: {
        marginTop: 80,
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 40,
        width: 130,
        borderRadius: 5
    }
})

export default connect()(AddDeck);