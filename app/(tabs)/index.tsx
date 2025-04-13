import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { styles } from '../../styles/auth.styles';
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const {signOut} = useAuth()
  return (
    <View>
      <Text>Feed screen</Text>
      <Link href={"/(auth)/login"} style={{backgroundColor: "blue", color: "white"}}>Login</Link>

      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

