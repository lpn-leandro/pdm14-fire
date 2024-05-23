import { View, TextInput, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import useCollection from '../../../firebase/hooks/useCollection';
import Pet from '../../../types/Pet';
import globalStyles from '../../../styles/globalStyles';
import StyledButton from '../components/StyledButton';

export default function RegisterP() {
  const { data, create, remove, refreshData, loading } =
    useCollection<Pet>('pets');

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>Register</Text>

      <Text>Name:</Text>
      <TextInput
        style={globalStyles.input}
        value={name}
        onChangeText={setName}
      />

      <Text>Type:</Text>
      <TextInput
        style={globalStyles.input}
        value={type}
        onChangeText={setType}
      />

      <Text>Age:</Text>
      <TextInput style={globalStyles.input} value={age} onChangeText={setAge} />

      <StyledButton
        title='Register'
        onPress={async () => {
          try {
            await create({
              name: name,
              type: type,
              age: age,
            });
            router.back();
            await refreshData();
          } catch (error: any) {
            Alert.alert('Create Pet error', error.toString);
          }
        }}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
