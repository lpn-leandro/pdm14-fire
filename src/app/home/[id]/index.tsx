import { View, Text, Alert } from 'react-native';
import React from 'react';
import { Stack, useGlobalSearchParams } from 'expo-router';
import useDocument from '../../../../firebase/hooks/useDocument';
import Pet from '../../../../types/Pet';
import Loading from '../../components/Loading';
import HeaderRight from '../../components/HeaderRight';
import globalStyles from '../../../../styles/globalStyles';

export default function PetDetails() {
  const { id } = useGlobalSearchParams();

  const { data: pet, loading } = useDocument<Pet>('pets', id as string);

  if (loading || !pet) return <Loading />;

  return (
    <View style={{ margin: 10 }}>
      <Stack.Screen
        options={{
          title: 'Pet',
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.subtitle}>Pet Details</Text>

      <View>
        <Text>id: {id}</Text>
        <Text>Name: {pet.name}</Text>
        <Text>Type: {pet.type}</Text>
        <Text>Age: {pet.age}</Text>
      </View>
    </View>
  );
}
