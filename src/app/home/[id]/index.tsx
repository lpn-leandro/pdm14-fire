import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Stack, useGlobalSearchParams } from 'expo-router'
import useDocument from '../../../../firebase/hooks/useDocument';
import Pet from '../../../../types/Pet';
import Loading from '../../components/Loading';
import HeaderRight from '../../components/HeaderRight';
import globalStyles from '../../../../styles/globalStyles';
import StyledButton from '../../components/StyledButton';
import { faker } from '@faker-js/faker';

export default function PetDetails() {
    const { id } = useGlobalSearchParams();

    const{
        data: pet,
        loading,
        upsert,
    } = useDocument<Pet>("pets", id as string);

    if(loading || !pet) return <Loading/>

  return (
    <View>
        <Stack.Screen options={{
            title: "Pet",
            headerRight: () => <HeaderRight/>,
        }}/>

      <Text style={globalStyles.title}>Pet Details</Text>

        <Text>id: {id}</Text>
        <Text>Name: {pet.name}</Text>
        <Text>Type: {pet.type}</Text>
        <Text>Age: {pet.age}</Text>

        <StyledButton
        title="Random Update"
        onPress={async () => {
          try {
            await upsert({
              ...pet, // repeating the existing book object
              name: faker.person.firstName(), // updating title
            });
          } catch (error: any) {
            Alert.alert("Update Book error", error.toString());
          }
        }}
      />
    </View>
  )
}