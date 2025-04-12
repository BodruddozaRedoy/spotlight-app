import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { styles } from '../../styles/auth.styles';
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Text>Feed screen</Text>
      <Link href={"/(auth)/login"} style={{backgroundColor: "blue", color: "white"}}>Login</Link>
    </View>
  );
}

