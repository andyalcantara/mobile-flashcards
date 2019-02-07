import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { 
  createBottomTabNavigator, 
  createAppContainer, 
  createMaterialTopTabNavigator, 
  createStackNavigator 
} from 'react-navigation';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

import { Ionicons } from '@expo/vector-icons';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';

const deckStack = createStackNavigator({
  Home: {
    screen: DeckList
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#000'
    },
    gesturesEnabled: false
  }
});

const iosTabs = createBottomTabNavigator({
  DeckList: deckStack,
  AddDeck: AddDeck,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === 'DeckList') {
          return <Ionicons name="ios-filing" size={30} color={tintColor} />
        }

        if (routeName === 'AddDeck') {
          return <Ionicons name="ios-add" size={30} color={tintColor} />
        }
      },
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'black',
      style: {
        height: 56,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const androidTabs = createMaterialTopTabNavigator({
  DeckList: deckStack,
  AddDeck: AddDeck,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === 'DeckList') {
          return <Ionicons name="md-filing" size={30} color={tintColor} />
        }

        if (routeName === 'AddDeck') {
          return <Ionicons name="md-add" size={30} color={tintColor} />
        }
      },
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: 'black',
      style: {
        height: 56,
        backgroundColor: 'lightgray',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const IosAppContainer = createAppContainer(iosTabs);
const AndroidAppContainer = createAppContainer(androidTabs);

const store = createStore(reducer);

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          {Platform.OS === 'ios'
            ? <IosAppContainer />
            : <AndroidAppContainer />
          }
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
