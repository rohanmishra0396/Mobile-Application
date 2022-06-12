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

import LevelScreen from './Screens/levels';
import LangScreen from './Screens/languages';
import Assignments from './Screens/assignments';
import QuestionScreen from './Screens/questions';
import DivisionScreen from './Screens/divisions';
import StudentScreen from './Screens/students';
import SubjectScreen from './Screens/subject';
import MathScreen from './Screens/Maths';
import MathLevel from './Screens/mathLevels';

const {fetchClasses} = require('./apiService/apiCall');

const stack = createStackNavigator();

let users = ['Shashikant', 'Shivakant', 'Abhishek', 'Rohan', 'Goku'];

function Users({navigation, route}) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses('teach')
      .then(result => {
        console.log('result ', JSON.stringify(result));
        users = result.list.map(data => {
          return data.classInfo;
        });
        console.log('users map ', users);
        setClasses(users);
      })
      .catch(error => {
        console.log('error ------------- ', error);
      });
  }, []);

  useEffect(() => {
    console.log('The useEffect to trigger rerender');
  }, [classes]);

  const onPressHandler = data => {
    console.log('User is ' + data);
    navigation.navigate('DivisionScreen', {class: data});
  };
  let buttons = [];
  for (let i in classes) {
    buttons.push(
      <Pressable
        key={i}
        onPress={() => onPressHandler(classes[i])}
        style={styles.wrapperCustom}>
        <Text style={styles.text}>{classes[i].name}</Text>
      </Pressable>,
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.nameText}>Select the Class</Text>
      <ScrollView>
        <View style={styles.container}>{buttons}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Users" component={Users}></stack.Screen>
        <stack.Screen
          name="DivisionScreen"
          component={DivisionScreen}></stack.Screen>
        <stack.Screen
          name="StudentScreen"
          component={StudentScreen}></stack.Screen>
        <stack.Screen name="LangScreen" component={LangScreen}></stack.Screen>
        <stack.Screen name="Levels" component={LevelScreen}></stack.Screen>
        <stack.Screen name="Assignments" component={Assignments}></stack.Screen>
        <stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={{headerShown: false}}></stack.Screen>
        <stack.Screen
          name="SubjectScreen"
          component={SubjectScreen}></stack.Screen>
        <stack.Screen name="MathScreen" component={MathScreen}></stack.Screen>
        <stack.Screen name="MathLevel" component={MathLevel}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
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

export default App;
