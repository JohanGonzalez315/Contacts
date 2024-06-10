import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RenderPhoto from '../../components/RenderPhoto';
import { Colors } from '../../styles/colors';

const ContactModal = (props: ContactModalProps) => {
  const {closeModal, visible, item} = props;
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeContainer} onPress={closeModal}>
            <Text style={styles.close}>X</Text>
          </TouchableOpacity>

          <View style={styles.containerTitleModal}>
            <RenderPhoto photo={item?.photo} name={item?.name} size={80}/>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.phone}>{item?.phone}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;

const styles = StyleSheet.create({
  name: {
    fontWeight: '900',
    marginTop: "2%",
    fontSize: 28,
    color: Colors.primaryColor,
    textAlign: 'center',
  },
  phone: {
    fontWeight: '400',
    marginTop: "2%",
    fontSize: 22,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  containerTitleModal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: Colors.primaryColor,
    opacity: 0.9,
    width: '90%',
    height: '30%',
    padding: 20,
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 5,
    maxWidth: 500,
  },
  closeContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '5%',
    right: '5%',
    zIndex: 2,
  },
  close: {
    fontSize: 20,
    fontWeight: '600',
  },
});
