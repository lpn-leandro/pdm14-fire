import { Alert, Text, TextInput, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { useEffect, useState } from "react";
import StyledButton from "./components/StyledButton";
import {useRouter } from "expo-router";
import useAuth from "../../firebase/hooks/useAuth";
import Loading from "./components/Loading";



export default function _screen() {
  const {user, login, loading} = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("teste@teste.teste");
  const [password, setPassword] = useState("teste123");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user])

  if(loading) return <Loading/>

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.main}>
        <Text style={globalStyles.title}>MyPets</Text>
        <Text style={globalStyles.subtitle}>The best pets in the world.</Text>
        <TextInput style={globalStyles.input} value={email} onChangeText={setEmail}/>
      <TextInput style={globalStyles.input} value={password} onChangeText={setPassword}/>
      <StyledButton title="login" onPress={async () => {
        try {
          await login(email, password);
          router.push("/home/");
        } catch (error: any) {
          Alert.alert("Login error", error.toString());
        }
      }} style={{marginTop: 12}}/>
      </View>
    </View>
  );
}