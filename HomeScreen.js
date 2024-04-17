import * as React from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Cell from './Cell';
import { cats, dogs } from './breeds';

function CatsScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search for a Specific Breed'
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        style={styles.list}
        data={cats.filter(item => item.breed.toLowerCase().includes(search.toLowerCase()))}
        renderItem={({ item, index }) => {
          return (
            <Cell
              title={item.breed}
              onPress={() => navigation.navigate('Details', { item })}
            />
          );
        }}
        keyExtractor={(item) => item.breed}
      />
    </View>
  );
}

function DogsScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search for a Specific Breed'
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        style={styles.list}
        data={dogs.filter(item => item.breed.toLowerCase().includes(search.toLowerCase()))}
        renderItem={({ item, index }) => {
          return (
            <Cell
              title={item.breed}
              onPress={() => navigation.navigate('Details', { item })}
            />
          );
        }}
        keyExtractor={(item) => item.breed}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Cats') {
            iconName = focused ? 'cat' : 'cat';
          } else if (route.name === 'Dogs') {
            iconName = focused ? 'dog' : 'dog';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Cats" component={CatsScreen} />
      <Tab.Screen name="Dogs" component={DogsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  list: {
    flex: 1,
    width: '100%',
  },
});

export default HomeScreen;