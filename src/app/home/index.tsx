import { View, Text, Alert, FlatList } from 'react-native';
import React from 'react';
import { Stack, router } from 'expo-router';
import globalStyles from '../../../styles/globalStyles';
import useCollection from '../../../firebase/hooks/useCollection';
import Pet from '../../../types/Pet';
import HeaderRight from '../components/HeaderRight';
import StyledButton from '../components/StyledButton';
import Loading from '../components/Loading';
import ViewPet from '../components/ViewPet';

export default function Home() {
  const { data, create, remove, refreshData, loading } =
    useCollection<Pet>('pets');

  return (
    <View>
      <Stack.Screen
        options={{ title: 'Home', headerRight: () => <HeaderRight /> }}
      />
      <Text style={globalStyles.subtitle}> Welcome to MyPets</Text>

      <StyledButton
        title='Register Pet'
        onPress={() => router.push('/home/registerP/')}
        style={{ marginTop: 10 }}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          onRefresh={refreshData}
          refreshing={loading}
          renderItem={({ item }) => (
            <ViewPet
              pet={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: '100%'}}
        />
      )}
    </View>
  );
}
