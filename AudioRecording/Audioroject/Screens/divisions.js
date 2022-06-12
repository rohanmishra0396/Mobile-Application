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

function DivisionScreen({navigation, route}) {
  console.log(route);
  let divisions = route.params.class.divisions;
  const onPressHandler = i => {
    navigation.navigate('SubjectScreen', {
      divisions: divisions[i],
      class: route.params.class.name,
    });
  };
  let divisionsButtons = [];
  for (let i = 0; i < divisions.length; i++) {
    divisionsButtons.push(
      <Pressable
        key={i}
        onPress={() => onPressHandler(i)}
        style={styles.wrapperCustom}>
        <Text style={styles.text}>{divisions[i].id}</Text>
      </Pressable>,
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.nameText}>Select the Division</Text>
      <ScrollView>
        <View style={styles.container}>{divisionsButtons}</View>
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

export default DivisionScreen;
