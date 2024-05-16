import {Alert, Text } from 'react-native'
import React from 'react'
import StyledButton from './StyledButton'
import { useRouter } from 'expo-router'
import useAuth from '../../../firebase/hooks/useAuth';

export default function HeaderRight() {
  const router = useRouter();
  const { user, logout} = useAuth();

  return (
    <>
      <Text>{user?.email}</Text>
      <StyledButton onPress={async () =>{
        try {
          await logout();
          router.replace("/");
        } catch (error: any) {
          Alert.alert("Logout error", error.toString());
        }
      }}
      title={"Logout"}
      style={{width: "auto", marginLeft: 12}}
      />
    </>
  )
}