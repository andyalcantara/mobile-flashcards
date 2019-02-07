import { ADD_DECK, GET_DECKS, ADD_CARD, GET_DECK, DELETE_DECK, DAYLY_NOTI } from '../actions';

export default function reducer(state = {}, action) {
    switch(action.type) {
        case GET_DECKS:
            const { decks } = action;
            
            return {
                ...state,
                ...decks
            }
        case ADD_DECK: 
            const { deck } = action;

            return {
                ...state,
                [deck.title]: deck
            }

        case ADD_CARD:
            const { title, card } = action;

            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: state[title].questions.concat([card])
                }
            }
        case GET_DECK:

            return {
                ...state[action.title]
            }

        case DELETE_DECK:

            delete state[action.title];
            
            return {
                ...state
            }

        default:
            return state;
    }
}