import 'react-native-gesture-handler';
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

const {fetchDivisionInfo} = require('../apiService/apiCall');

function StudentScreen({navigation, route}) {
  console.log(route);
  const onPressHandler = i => {
    if (route.params.assignment !== 'Mathematics')
      navigation.navigate('LangScreen', {
        students: students[i],
        ...route.params,
      });
    else
      navigation.navigate('MathScreen', {
        students: students[i],
        ...route.params,
      });
  };

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchDivisionInfo(route.params.divisions.studentsReport)
      .then(result => {
        console.log('result ', JSON.stringify(result));
        //students = result.list;
        //console.log('students .....', students);
        setStudents(result.list);
      })
      .catch(error => {
        console.log('error ------------- ', error);
      });
  }, []);

  useEffect(() => {
    console.log('Re render Happened');
  }, [students]);

  let studentButtons = [];
  console.log('for students ', students);
  for (let i = 0; i < students.length; i++) {
    console.log('students[i].classes.name ', students[i].name);
    studentButtons.push(
      <Pressable
        key={i}
        onPress={() => onPressHandler(i)}
        style={styles.wrapperCustom}>
        <Text style={styles.text}>{students[i].name}</Text>
      </Pressable>,
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.nameText}>Select the Student</Text>
      <ScrollView>
        <View style={styles.container}>{studentButtons}</View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default StudentScreen;
