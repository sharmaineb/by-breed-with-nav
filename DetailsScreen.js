import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feature from './Feature';

function DetailsScreen({ route }) {
  const { item } = route.params;
  const { breed, ...features } = item;

  // average
  const keys = Object.keys(features);
  const sum = keys.reduce((acc, key) => acc + features[key], 0);
  const average = (sum / keys.length).toFixed(1);

  // stars
  let stars = '';
  for (let i = 0; i < average; i++) {
    stars += '⭐️';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{breed} - Avg: {average}</Text>
      <Text style={styles.rating}>Rating: {stars}</Text>
      {Object.entries(features).map(([key, value]) => (
        <Feature key={key} name={key} value={value} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  rating: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
});

export default DetailsScreen;