import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../styles/colors';

const LoadingView = (props: LoadingViewProps) => {
  const {loading} = props;
  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Colors.primaryColor} />
          <Text style={{color: Colors.primaryColor}}>Cargando...</Text>
        </View>
      )}
    </>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
});
