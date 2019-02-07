export const ADD_DECK = 'ADD_DECK';
export const GET_DECKS = 'GET_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const GET_DECK = 'GET_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const DAYLY_NOTI = 'DAYLY_NOTI';

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function receiveDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addCard(title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}

export function getDeck(title) {
    return {
        type: GET_DECK,
        title
    }
}

export function deleteDeck(title) {
    return {
        type: DELETE_DECK,
        title
    }
}

export function daylyNoti(value) {
    return {
        type: DAYLY_NOTI,
        value
    }
}