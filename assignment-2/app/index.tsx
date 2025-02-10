import { View, Text, StyleSheet } from "react-native";
import {useState} from "react";
import SignIn from "../components/sign-in";

export default function Login() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <View style={styles.container}>
             <SignIn loginToggle={setIsLoggedIn}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});