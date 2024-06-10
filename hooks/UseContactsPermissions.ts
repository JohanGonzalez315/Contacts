import { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

const useContactsPermission = () => {
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const requestContactsPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Permiso de acceso a contactos',
            message: 'Esta aplicación necesita acceder a tus contactos.',
            buttonPositive: 'Aceptar',
            buttonNegative: 'Cancelar',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionsGranted(true);
        } else {
          setPermissionsGranted(false);
        }
      } catch (error) {
        console.error('Error al solicitar permiso de acceso a contactos:', error);
      } finally {
        setLoading(false);
      }
    };

    requestContactsPermission();
  }, []);

  return { permissionsGranted, loading };
};

export default useContactsPermission;
