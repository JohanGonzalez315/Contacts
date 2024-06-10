import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Colors } from '../styles/colors';

const RenderPhoto = (props: RenderPhotoProps) => {
  const {photo, name, size} = props;
  return (
    <>
      {photo ? (
        <Image
          source={{uri: photo}}
          style={[styles.imageProfile, {width: size, height: size}]}
        />
      ) : (
        <View style={[styles.imageProfile, {width: size, height: size}]}>
          <Text style={styles.letterName}>{name?.charAt(0)}</Text>
        </View>
      )}
    </>
  );
};

export default RenderPhoto;

const styles = StyleSheet.create({
  imageProfile: {
    borderRadius: 100,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
  },
});
