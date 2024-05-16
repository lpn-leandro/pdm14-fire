import { View, Text, Alert, FlatList } from 'react-native'
import { faker } from "@faker-js/faker"
import React from 'react'
import HeaderRight from '../components/HeaderRight'
import { Stack } from 'expo-router'
import globalStyles from '../../../styles/globalStyles'
import StyledButton from '../components/StyledButton'
import useCollection from '../../../firebase/hooks/useCollection'
import Pet from '../../../types/Pet'
import Loading from '../components/Loading'
import ViewPet from '../components/ViewPet'

export default function Home() {
    const {data, create, remove, refreshData, loading} = useCollection<Pet>("pets");

  return (
    <View>
      
      <Stack.Screen options ={{title: "Home", headerRight: () => <HeaderRight/>}} />
      <Text style={globalStyles.title}> MyPets</Text>
      <StyledButton title="Register Pet" onPress={async () => {
        try {
            await create({
                name: faker.person.firstName(),
                type: faker.animal.type(),
                age: faker.number.int({max: 20}),
            });
            await refreshData();
        } catch (error:any) {
            Alert.alert("Create Pet error", error.toString);
        }
      }}
      />

      {loading ? (
        <Loading/>
      ) : (
      <FlatList
        data={data} 
        renderItem={({ item }) => (
         <ViewPet
          pet={item}
          onDelete={async () => {
            await remove(item.id!);
            await refreshData();
        }}
        />
    )}
        style={{ width: "100%"}}
      />
      )}
    </View>
  )
}