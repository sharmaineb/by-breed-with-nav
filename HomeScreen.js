import * as React from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Cell from './Cell';
import { cats, dogs } from './breeds';

function HomeScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');
  const [showCats, setShowCats] = React.useState(true);
  const dataToShow = showCats ? cats : dogs;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search for a Specific Breed'
          onChangeText={setSearch}
          value={search}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'pink' }]}
          onPress={() => setShowCats(!showCats)}
        >
          <Text style={styles.buttonText}>{showCats ? 'Show Dogs' : 'Show Cats'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={dataToShow.filter(item => item.breed.toLowerCase().includes(search.toLowerCase()))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;