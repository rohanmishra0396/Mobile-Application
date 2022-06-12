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
  TextInput,
  Button,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import {updateStudentData} from '../apiService/apiCall';

let rating = 0;

function MathScreen({navigation, route}) {
  console.log(route);
  let number = 0;
  const mathQuestions = route.params.mathQuestions;
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState(0);

  const onChangeNumber = val => {
    setAnswer(val);
  };

  let questionDisplay = (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          padding: 20,
          justifyContent: 'space-evenly',
        }}>
        <Text style={{fontSize: 40}}>
          {mathQuestions[questionNumber].firstInput}
        </Text>
        <Text style={{fontSize: 40}}>
          {mathQuestions[questionNumber].operator}
        </Text>
        <Text style={{fontSize: 40}}>
          {mathQuestions[questionNumber].secondInput}
        </Text>
      </View>
      <TextInput
        ref={input => {
          number = input;
        }}
        style={styles.input}
        onChangeText={val => onChangeNumber(val)}
        value={0}
        placeholder="Please write your answer here"
        keyboardType="numeric"
      />
      <Button
        title="Next"
        onPress={() => calculateAnswer({index: questionNumber})}></Button>
    </>
  );

  const math_it_up = {
    '+': function (x, y) {
      return x + y;
    },
    '-': function (x, y) {
      return x - y;
    },
    '*': function (x, y) {
      return x * y;
    },
    '/': function (x, y) {
      return x / y;
    },
  };

  const calculateAnswer = data => {
    console.log('The answer ', data);
    let result = math_it_up[mathQuestions[data.index].operator](
      mathQuestions[data.index].firstInput,
      mathQuestions[data.index].secondInput,
    );
    if (answer == result) rating = rating + 1;

    console.log('answer ', answer, ' result ', result);

    if (data.index + 1 >= mathQuestions.length) {
      //call update api
      updateStudentData({
        id: route.params.students.id,
        language: route.params.lang,
        class: route.params.divisions.id,
        Rating: rating,
      })
        .then(result => {
          console.log('result ', JSON.stringify(result));
        })
        .catch(error => {
          console.log('error ------------- ', error);
        });
      rating = 0;
      navigation.navigate('MathLevel', {
        lang: route.params.lang,
        key: i,
        ...route.params,
      });
    } else {
      setQuestionNumber(data.index + 1);
    }
    console.log('rating ', rating);
    number.clear();
  };

  useEffect(() => {
    console.log('Re Render for next question');
  }, [questionNumber]);

  return (
    <SafeAreaView>
      <Text style={styles.nameText}>
        Please solve below question and click next
      </Text>
      <ScrollView>
        <View style={styles.container}>{questionDisplay}</View>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default MathScreen;
