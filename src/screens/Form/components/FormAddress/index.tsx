import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {
  HelperText,
  ProgressBar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Select from '../../../../components/Select';
import { useAuth } from '../../../../hooks/useAuth';

type Props = {
  city: string;
  setCity: (text: string) => void;
  street: string;
  setStreet: (text: string) => void;
  district: string;
  setDistrict: (text: string) => void;
  number: string;
  setNumber: (text: string) => void;
  zone: string;
  setZone: (text: string) => void;
  county: string;
  setCounty: (text: string) => void;
  latitude: string;
  setLatitude: (text: string) => void;
  longitude: string;
  setLongitude: (text: string) => void;
  cityError: string;
  streetError: string;
};

export const FormAddress: React.FC<Props> = ({
  city,
  setCity,
  street,
  setStreet,
  district,
  setDistrict,
  number,
  setNumber,
  setLatitude,
  setLongitude,
  latitude,
  longitude,
  setZone,
  zone,
  county,
  setCounty,
  cityError,
  streetError,
}) => {
  const theme = useTheme();
  const { isConnected } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const getAddress = useCallback(
    async (lat: string, long: string) => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`,
          {
            timeout: 1000,
          },
        );
        setCity(result.data.address.city);
        setStreet(result.data.address.road);
        setIsLoading(false);
      } catch (error: any) {
        console.log('Error => ', error);
        if (error.response) {
          console.log(error.response.data);
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        } else {
          console.log('Error', error.message);
          ToastAndroid.show(
            'Não foi possível localizar seu endereço',
            ToastAndroid.SHORT,
          );
        }
        setIsLoading(false);
      }
    },
    [setCity, setStreet],
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatitude(lat.toString());
        setLongitude(long.toString());
      },
      error => {
        console.log('Erro de localização:', error.message);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        showLocationDialog: true,
      },
    );
  }, [setLatitude, setLongitude]);

  useEffect(() => {
    if (isConnected === true && latitude !== '' && longitude !== '') {
      getAddress(latitude, longitude);
    }
  }, [isConnected, latitude, longitude, getAddress]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.formWrapper}>
            {isLoading && (
              <>
                <ProgressBar indeterminate />
                <Text variant="bodyLarge" style={styles.loaderTitle}>
                  Buscando seu endereço
                </Text>
              </>
            )}
            <View style={styles.inputWrapper}>
              <TextInput
                label="Endereço/Rua/Avenida *"
                placeholder="Digite o seu endereço"
                mode="outlined"
                value={street}
                error={!!streetError}
                onChangeText={text => {
                  setStreet(text);
                }}
              />
              <HelperText type="error" visible={!!streetError}>
                {streetError}
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Bairro"
                placeholder="Digite o bairro"
                mode="outlined"
                value={district}
                onChangeText={text => {
                  setDistrict(text);
                }}
              />
              <HelperText type="error" visible={false}>
                Error
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Número"
                placeholder="Digite o número do endereço"
                mode="outlined"
                keyboardType="numeric"
                value={number}
                onChangeText={text => {
                  setNumber(text);
                }}
              />
              <HelperText type="error" visible={false}>
                Error
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Cidade *"
                placeholder="Digite sua cidade"
                mode="outlined"
                value={city}
                error={!!cityError}
                onChangeText={text => {
                  setCity(text);
                }}
              />
              <HelperText type="error" visible={!!cityError}>
                {cityError}
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Localidade/distrito"
                placeholder="Digite a localidade/distrito"
                mode="outlined"
                value={county}
                onChangeText={text => {
                  setCounty(text);
                }}
              />
              <HelperText type="error" visible={false}>
                Error
              </HelperText>
            </View>
            <View style={styles.inputWrapper}>
              <Select
                theme={theme}
                label="Zona"
                mode="outlined"
                onSelect={value => setZone(value)}
                value={zone}
                items={[
                  {
                    id: '0',
                    label: 'Urbana',
                    value: 'Urbana',
                  },
                  {
                    id: '1',
                    label: 'Rural',
                    value: 'Rural',
                  },
                ]}
              />
              <HelperText type="error" visible={false}>
                Error
              </HelperText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  buttons: {
    width: '100%',
  },
  check: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  textCheck: {
    fontSize: 16,
    marginLeft: 8,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  scroll: {
    paddingBottom: 40,
  },
  loaderTitle: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
});
