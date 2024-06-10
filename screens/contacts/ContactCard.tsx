import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RenderPhoto from '../../components/RenderPhoto';

const ContactCard = (props: ContactCardProps) => {
  const {item, action} = props;

  return (
    <TouchableOpacity style={styles.contactCard} onPress={() => action(item)}>
      <RenderPhoto photo={item.photo} name={item.name} size={50} />
      <View>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  contactCard: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: '900',
  },
  contactPhone: {
    fontSize: 16,
    color: '#666',
  },
});
