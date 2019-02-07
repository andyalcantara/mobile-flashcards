import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { addCard } from '../actions';
import { addCardToDeck } from '../utils/helpers';
import { connect } from 'react-redux';

class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    static navigationOptions = {
        title: 'Add Card'
    }

    handleQuestion = (text) => {
        this.setState({
            question: text
        });
    }

    handleAnswer = (text) => {
        this.setState({
            answer: text
        });
    }

    submit = () => {
        const { navigation, dispatch } = this.props;
        const { question, answer } = this.state;

        if (!question || !answer) {
            return alert('Upps something is missing!')
        } else {
            const title = navigation.getParam('title');

            dispatch(addCard(title, {question: question, answer: answer}));
            addCardToDeck(title, {question: question, answer: answer});
        
            this.setState({
                question: '',
                answer: ''
            });

            navigation.goBack();
        }
    }

    render() {

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text></Text>

                <TextInput
                    style={styles.input} 
                    onChangeText={this.handleQuestion} 
                    value={this.state.question} 
                    placeholder="Add Question"
                />

                <TextInput 
                    style={styles.input}
                    onChangeText={this.handleAnswer} 
                    value={this.state.answer}
                    placeholder="Add Answer"
                />

                <TouchableOpacity onPress={this.submit} style={[styles.submitButton, {alignSelf: 'center'}]}>
                    <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },

    input: {
        marginTop: 80,
        height: 40,
        borderWidth: 1,
        borderColor: '#A9A9A9',
        borderRadius: 5,
    },

    submitButton: {
        marginTop: 80,
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 40,
        width: 130,
        borderRadius: 5
    }
});

export default connect()(AddCard);