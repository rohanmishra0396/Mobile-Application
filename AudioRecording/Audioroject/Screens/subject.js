import 'react-native-gesture-handler';
import React, {Component} from 'react';

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

const subjects = ['Reading', 'Mathematics'];

function SubjectScreen({navigation, route}) {
  console.log(route);
  const onPressHandler = i => {
    if (subjects[i] === 'Reading') {
      navigation.navigate('Assignments', {
        subject: subjects[i],
        ...route.params,
      });
    } else {
      navigation.navigate('MathLevel', {
        subject: subjects[i],
        ...route.params,
      });
    }
  };
  let subjectsButtons = [];
  for (let i = 0; i < subjects.length; i++) {
    subjectsButtons.push(
      <Pressable
        key={i}
        onPress={() => onPressHandler(i)}
        style={styles.wrapperCustom}>
        <Text style={styles.text}>{subjects[i]}</Text>
      </Pressable>,
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>{subjectsButtons}</View>
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

export default SubjectScreen;
