import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {

    state = {
        showAnswer: false,
        questionIndex: 0,
        correctAnswers: 0,
        endOfTheQuiz: false,
    }

    static navigationOptions = {
        title: 'Quiz'
    }

    showAnswer = () => {
        this.setState((oldState) => ({
            showAnswer: !oldState.showAnswer
        }));
    }

    nextQuestion = () => {
        if (this.state.correctAnswers <= this.props.navigation.getParam('deck').questions.length) {
            this.setState((oldState) => ({
                correctAnswers: oldState.correctAnswers + 1
            }));
        }

        if (this.state.questionIndex < this.props.navigation.getParam('deck').questions.length - 1) {
            this.setState((oldState) => ({
                questionIndex: oldState.questionIndex + 1,
                showAnswer: false,
            }));

        } else {
            this.setState({
                endOfTheQuiz: true,
            });
        }
    }

    incorrectQuestion = () => {
        if (this.state.questionIndex < this.props.navigation.getParam('deck').questions.length - 1) {
            this.setState((oldState) => ({
                questionIndex: oldState.questionIndex + 1,
                showAnswer: false
            }));
        } else {
            this.setState({
                endOfTheQuiz: true,
            });
        }
    }

    restartQuiz = () => {
        this.setState({
            questionIndex: 0,
            correctAnswers: 0,
            endOfTheQuiz: false
        });
    }

    render() {
        const { questionIndex, correctAnswers, endOfTheQuiz, showAnswer } = this.state;
        const { navigation } = this.props;
        const deck = navigation.getParam('deck');
        const questions = deck.questions;

        if (endOfTheQuiz) {
            clearLocalNotification().then(setLocalNotification);
        }

        if (questions.length > 0) {
            return (
                <View style={{flex: 1}}>
                    {endOfTheQuiz
                    ?   <View style={styles.results}>
                            <Text>{correctAnswers} of {questions.length} answers right</Text>
                            <Text>That is {(correctAnswers / questions.length) * 100}% score</Text>

                            <TouchableOpacity style={styles.button} onPress={this.restartQuiz}>
                                <Text style={{ color: 'white'}}>Restart Quiz</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Deck', {deck: deck})}>
                                <Text style={{color: 'white'}}>Back to Deck</Text>
                            </TouchableOpacity>
                        </View>
                    :   <View style={styles.container}>
                            <View style={{alignSelf: 'flex-start'}}>
                                <Text style={{marginTop: 10, marginLeft: 10, fontSize:20}}>{questionIndex + 1} / {questions.length}</Text>
                            </View>
                        
                            <View style={styles.question}>
                                <Animated.Text style={{alignSelf: 'center', fontSize: 22}}>{showAnswer ? questions[questionIndex].answer : questions[questionIndex].question}</Animated.Text>
                                <TouchableOpacity onPress={this.showAnswer}>
                                    <Text style={styles.answerBtn}>{showAnswer ? 'Question' : 'Answer'}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.btns}>
                                <TouchableOpacity style={styles.correctBtn} onPress={this.nextQuestion}>
                                    <Text style={{color: 'white'}}>Correct</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.incorrectBtn} onPress={this.incorrectQuestion}>
                                    <Text style={{color: 'white'}}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>  
                        </View>
                    }
                </View>
            );
        } else {
            return (
                <View style={styles.noQuestion}>
                    <Text style={{ fontSize: 20, textAlign: 'center'}}> We are sorry, but you can't take a quiz with no cards </Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    results: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noQuestion: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btns: {
        flex: 1
    },
    question: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    correctBtn: {
        backgroundColor: 'green',
        height: 40,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    incorrectBtn: {
        backgroundColor: 'red',
        height: 40,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20
    },
    answerBtn: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 60
    },
    questionText: {
        fontSize: 22,
        width: 260,
    },
    flatlist: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 40,
        width: 130,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    }
});

export default Quiz;