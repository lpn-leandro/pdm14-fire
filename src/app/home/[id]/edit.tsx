import { View, Text, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import useDocument from '../../../../firebase/hooks/useDocument';
import Pet from '../../../../types/Pet';
import globalStyles from '../../../../styles/globalStyles';
import Loading from '../../components/Loading';
import HeaderRight from '../../components/HeaderRight';
import StyledButton from '../../components/StyledButton';

export default function EditPet() {
  const { id } = useGlobalSearchParams();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  const { data: pet, loading, upsert } = useDocument<Pet>('pets', id as string);

  useEffect(() => {
    if (pet) {
      console.log(pet);
      setName(pet.name), setType(pet.type), setAge(pet.age);
    }
  }, [pet]);

  if (loading || !pet) return <Loading />;

  return (
    <View style={{margin: 10}}>
      <Stack.Screen
        options={{
          title: 'Pet',
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.subtitle}>Update Pet</Text>

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
      style={{marginTop: 10}}
        title='Update'
        onPress={async () => {
          try {
            await upsert({
              ...pet,
              name: name,
              type: type,
              age: age,
            });
            router.back();
          } catch (error: any) {
            Alert.alert('Update Pet error', error.toString());
          }
        }}
      />
    </View>
  );
}
