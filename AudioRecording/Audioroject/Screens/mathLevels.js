import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component, useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const {fetchClasses} = require('./apiService/apiCall');

const stack = createStackNavigator();

let Levels = ['Level 1', 'Level 2', 'Level 3'];
const mathQuestions = {
  'Level 1': [
    {
      firstInput: 10,
      secondInput: 20,
      operator: '*',
    },
    {
      firstInput: 5,
      secondInput: 2,
      operator: '+',
    },
    {
      firstInput: 31,
      secondInput: 1,
      operator: '-',
    },
    {
      firstInput: 200,
      secondInput: 100,
      operator: '/',
    },
  ],
  'Level 2': [
    {
      firstInput: 8,
      secondInput: 5,
      operator: '*',
    },
    {
      firstInput: 35,
      secondInput: 22,
      operator: '+',
    },
    {
      firstInput: 31,
      secondInput: 17,
      operator: '-',
    },
    {
      firstInput: 45,
      secondInput: 9,
      operator: '/',
    },
  ],
  'Level 3': [
    {
      firstInput: 15,
      secondInput: 6,
      operator: '*',
    },
    {
      firstInput: 55,
      secondInput: 27,
      operator: '+',
    },
    {
      firstInput: 78,
      secondInput: 32,
      operator: '-',
    },
    {
      firstInput: 84,
      secondInput: 14,
      operator: '/',
    },
  ],
};

function MathLevel({navigation, route}) {
  const [classes, setClasses] = useState([]);

  //   useEffect(() => {
  //     fetchClasses('teach')
  //       .then(result => {
  //         console.log('result ', JSON.stringify(result));
  //         users = result.list.map(data => {
  //           return data.classInfo;
  //         });
  //         console.log('users map ', users);
  //         setClasses(users);
  //       })
  //       .catch(error => {
  //         console.log('error ------------- ', error);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     console.log('The useEffect to trigger rerender');
  //   }, [classes]);

  const onPressHandler = data => {
    console.log('Levels is ' + data);
    navigation.navigate('MathScreen', {mathQuestions: mathQuestions[data]});
  };
  let buttons = [];
  for (let i in Levels) {
    buttons.push(
      <Pressable
        key={i}
        onPress={() => onPressHandler(Levels[i])}
        style={styles.wrapperCustom}>
        <Text style={styles.text}>{Levels[i]}</Text>
      </Pressable>,
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.nameText}>Select the Level</Text>
      <ScrollView>
        <View style={styles.container}>{buttons}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperCustom: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    alignSelf: 'center',
    color: 'maroon',
    textDecorationColor: 'blue',
    textShadowColor: 'red',
    textShadowRadius: 3,
    margin: 24,
    fontSize: 20,
    fontFamily: 'monospace',
  },
});

export default MathLevel;
