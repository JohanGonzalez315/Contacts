import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  NativeModules,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import ContactModal from './ContactModal';
import ContactCard from './ContactCard';
import {Colors} from '../../styles/colors';
import LoadingView from '../../components/LoadingView';
import useContactsPermission from '../../hooks/UseContactsPermissions';

const ContactListScreen: React.FC = () => {
  const {permissionsGranted, loading} = useContactsPermission();
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [searchEntry, setSearchEntry] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<ContactData[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ContactData>();

  useEffect(() => {
    if (permissionsGranted) {
      fetchContacts();
    }
  }, [permissionsGranted]);

  const fetchContacts = async () => {
    const {ContactModule} = NativeModules;
    ContactModule.getContacts()
      .then((contacts: ContactData[]) => {
        setContacts(contacts);
      })
      .catch((error: Error) => {
        console.error('Error al obtener los contactos:', error);
      });
  };

  const filterItems = () => {
    const filtered = contacts.filter(
      item =>
        item?.name?.toLowerCase().includes(searchEntry?.toLowerCase()) ||
        item?.phone?.replace(/[^\d]/g, '')
          .toLowerCase()
          .includes(searchEntry?.toLowerCase()),
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    if(contacts) filterItems();
  }, [contacts, searchEntry]);

  const getModalContactInfo = (item: ContactData) => {
    setOpenModal(true);
    setSelectedItem(item);
  };

  if (!permissionsGranted && !loading) {
    return (
      <View style={styles.noPermissionsContainer}>
        <Text>No se puede acceder a los contactos</Text>
        <Text>Por favor otorgue permisos desde los ajustes</Text>
      </View>
    );
  }

  return (
    <>
      <LoadingView loading={loading} />
      <Text style={styles.title}>Lista de Contactos</Text>
      <TextInput
        placeholder="Buscar"
        style={styles.searchContact}
        onChangeText={text => setSearchEntry(text)}
      />
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({item}) => (
            <ContactCard item={item} action={getModalContactInfo} />
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchContacts} />
          }
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No hay resultados</Text>
        </View>
      )}
      <ContactModal
        closeModal={() => setOpenModal(false)}
        visible={openModal}
        item={selectedItem}
      />
    </>
  );
};

export default ContactListScreen;

const styles = StyleSheet.create({
  noPermissionsContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginVertical: 20,
  },
  searchContact: {
    height: 45,
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    marginHorizontal: 5,
  },
  noResultsContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {},
});
