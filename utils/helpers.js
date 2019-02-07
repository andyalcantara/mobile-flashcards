import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'flashcardsNotifications';

export function getDecks() {
    return AsyncStorage.getAllKeys();
}

export function getDeck(key) {
    return AsyncStorage.getItem(key).then((result) => {
        return result;
    });
}

export function saveDeckTitle(title) {
    AsyncStorage.setItem(title, JSON.stringify({title: title, questions: []}));
}

export function addCardToDeck(title, card) {
    AsyncStorage.getItem(title).then((deck) => {
        let tDeck = JSON.parse(deck);
        tDeck.questions.push(card);
        AsyncStorage.setItem(title, JSON.stringify(tDeck));
    });
}

export function removeDeck(title) {
    return AsyncStorage.removeItem(title, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
    return {
        title: 'Study your cards today!!!',
        body: "Don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        },
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync();

                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(8);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
}