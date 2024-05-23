import { View, Text, Alert } from 'react-native';
import React from 'react';
import StyledButton from './StyledButton';
import Pet from '../../../types/Pet';
import { useRouter } from 'expo-router';

interface ViewPetProps {
  pet: Pet;
  onDelete: Function;
}

export default function ViewPet({ pet, onDelete }: ViewPetProps) {
  const router = useRouter();

  return (
    <View
      style={{ borderTopColor: 'darkblue', borderTopWidth: 1, margin: 12}}
    >
      <Text>id: {pet.id}</Text>
      <Text>Title: {pet.name}</Text>
      <Text>Type: {pet.type}</Text>
      <Text>Age: {pet.age}</Text>

      <View style={{ flexDirection: 'row' }}>
        <StyledButton
          title='View Pet Details'
          onPress={() => {
            if (pet.id) {
              router.push(`/home/${pet.id}`);
            } else {
              Alert.alert(
                'View error',
                'cannot access pet details because it does not have an id!'
              );
            }
          }}
          style={{ width: '33%' }}
        />

        <StyledButton
          title='Delete Pet'
          onPress={() => {
            if (pet.id) {
              Alert.alert('Delete Pet', 'Are you sure?', [
                {
                  text: 'Yes',
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: 'No',
                  style: 'cancel',
                },
              ]);
            } else {
              Alert.alert(
                'Delete error',
                'cannot delete pet because it does not have an id!'
              );
            }
          }}
          style={{ width: '33%', backgroundColor: 'darkred' }}
        />

        <StyledButton
          title='Update Pet'
          onPress={() => {
            if (pet.id) {
              router.push(`/home/${pet.id}/edit/`);
            } else {
              Alert.alert(
                'View error',
                'cannot update pet because it does not have an id!'
              );
            }
          }}
          style={{ width: '33%' }}
        />
      </View>
    </View>
  );
}
