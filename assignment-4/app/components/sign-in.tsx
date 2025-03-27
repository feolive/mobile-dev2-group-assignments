import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import {useRouter} from "expo-router";
import { supabaseSignIn } from "./supabase";
import { SupabaseResponse } from "./types";


export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const router = useRouter();
  

  const handleLogin = () => {
    // checkUsername();
    // checkPassword();
    supabaseSignIn(username, password).then((resp) => {
      if (resp.error) {
        throw new Error(resp.error);
      }
      router.replace("/");
    }).catch((err: SupabaseResponse) => {
      console.log(err.error);
      alert(err.error);
    });
  };

  const checkUsername = () => {
     let usernameRegex = /^\w{5,12}$/;
     if(!usernameRegex.test(username)){
        setUsernameErr("*username must be between 5 and 12 characters");
     }else{
        setUsernameErr("");
     }
  };

  const checkPassword = () => {
    let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
    if(!passwordRegex.test(password)){
      setPasswordErr("*password must be between 8 and 20 characters including at least one uppercase letter, one lowercase letter, one number, and one special character");
   }else{
     setPasswordErr("");
   }
  };


  return (
      <View style={styles.formContainer}>
        <Text style={styles.title}>Assignment 2</Text>
        <TextInput
          style={usernameErr ? styles.inputErr : styles.input}
          inputMode="text"
          value={username}
          onChangeText={(value: string) => setUsername(value)}
          // onEndEditing={() => checkUsername()}
          placeholder="Username"
        />
        {usernameErr && <Text style={styles.txtErr}>{usernameErr}</Text>}
        <TextInput
          style={passwordErr ? styles.inputErr : styles.input}
          inputMode="text"
          secureTextEntry={true}
          value={password}
          onChangeText={(value: string) => setPassword(value)}
          // onEndEditing={() => checkPassword()}
          placeholder="Password"
        />
        {passwordErr && <Text style={styles.txtErr}>{passwordErr}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={() => router.push("/sign-up")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 60,
  },
  inputErr: {
    height: 45,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 15,
    padding: 10,
  },
  input: {
    height: 45,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
  },
  button: {
    backgroundColor: "#99ff99",
    height: 40,
    width: '100%',
    padding: 10,
    borderRadius: 20,
    marginTop: 60,
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    height: 40,
    width: '100%',
    padding: 10,
    borderRadius: 20,
    marginTop: 60,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "semibold",
  },
  txtErr:{
    color: "red",
    fontStyle: "italic",
    fontSize: 10,
    alignSelf: "baseline",
    marginLeft: 10,
    marginTop: -10,
  },
  errorMsg: {
    color: "red",
    marginBottom: 20,
    fontStyle: "italic",
    marginTop: 20
  },
});
