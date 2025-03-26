import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { UserParam } from "../components/types";
import supabase from "../components/supabase";
import { AuthResponse } from "../components/types";
import { router } from "expo-router";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const insertUser = async (user: UserParam): Promise<any> => {
  try {
    let { error } = await supabase.from("user_details").insert([user]);
    if (error) {
      throw error;
    }
  } catch (err) {
    console.log(err);
    alert("something wrong happened");
  }
};

const supabaseSignUp = async (user: UserParam): Promise<AuthResponse> => {
  try{
      let { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });
      if (error) {
        throw error;
      }
      let resp: AuthResponse = { data: { data }, error };
      return resp;
  } catch (err) {
    return { data: { data: null }, error: err as string };
  }
};

export default function SignUp() {
  const [user, setUser] = useState<UserParam>({} as UserParam);
  const [emailErr, setEmailErr] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const checkEmail = () => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user?.email || "")) {
      setEmailErr("*email is invalid");
    } else {
      setEmailErr("");
    }
  };

  const checkFirstName = () => {
    let firstNameRegex = /^[a-zA-Z]{2,20}$/;
    if (!firstNameRegex.test(user?.first_name || "")) {
      setFirstNameErr("*first name must be between 2 and 20 characters");
    } else {
      setFirstNameErr("");
    }
  };

  const checkLastName = () => {
    let lastNameRegex = /^[a-zA-Z]{2,20}$/;
    if (!lastNameRegex.test(user?.last_name || "")) {
      setLastNameErr("*last name must be between 2 and 20 characters");
    } else {
      setLastNameErr("");
    }
  };

  const checkPassword = () => {
    let passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
    if (!passwordRegex.test(user?.password || "")) {
      setPasswordErr(
        "*password must be between 8 and 20 characters including at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordErr("");
    }
  };

  const handleSignUp = () => {
    checkEmail();
    checkFirstName();
    checkLastName();
    checkPassword();
    if (emailErr || firstNameErr || lastNameErr || passwordErr) {
      return;
    }
    const newUser = {
      uuid: generateUUID(),
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      email: user.email,
    };
    supabaseSignUp(newUser).then((resp) => {
      if (resp.error) {
        alert(resp.error);
        return;
      }
      insertUser(newUser);
      router.replace("/calgary");
    }).catch((err: AuthResponse) => {
      console.log(err.error);
      alert("something wrong happened");
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        inputMode="text"
        value={user?.email}
        onChangeText={(val: string) => setUser({ ...user, email: val })}
        onEndEditing={() => checkEmail()}
        placeholder="Email"
      />
      {emailErr && <Text style={styles.txtErr}>{emailErr}</Text>}

      <TextInput
        style={styles.input}
        inputMode="text"
        value={user?.first_name}
        onChangeText={(val: string) => setUser({ ...user, first_name: val })}
        onEndEditing={() => checkFirstName()}
        placeholder="First Name"
      />
      {firstNameErr && <Text style={styles.txtErr}>{firstNameErr}</Text>}

      <TextInput
        style={styles.input}
        inputMode="text"
        value={user?.last_name}
        onChangeText={(val: string) => setUser({ ...user, last_name: val })}
        onEndEditing={() => checkLastName()}
        placeholder="Last Name"
      />
      {lastNameErr && <Text style={styles.txtErr}>{lastNameErr}</Text>}

      <TextInput
        style={styles.input}
        inputMode="text"
        secureTextEntry={true}
        value={user?.password}
        onChangeText={(val: string) => setUser({ ...user, password: val })}
        onEndEditing={() => checkPassword()}
        placeholder="Password"
      />
      {passwordErr && <Text style={styles.txtErr}>{passwordErr}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: '100%',
  },
  input: {
    padding: 16,
    height: 45,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  inputErr: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 8,
  },
  txtErr: {
    color: "#ff0000",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#000000",
    height: 40,
    width: 80,
    padding: 10,
    borderRadius: 20,
    marginTop: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
