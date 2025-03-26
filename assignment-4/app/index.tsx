import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {useState, useEffect} from "react";
import SignIn from "./components/sign-in";
import { Link } from "expo-router";
import { User } from "@supabase/supabase-js";
import supabase, { supabaseGetUser, supabaseSignOut } from "./components/supabase";
import { UserParam } from "./components/types";

const handleSignOut = async () => {
    try {
      await supabaseSignOut();
    } catch (error) {
      console.error(error);
    }
  };

export default function Login() {
    const [user, setUser] = useState<User | null>(null);
    const [userDisplay, setUserDisplay] = useState<UserParam | null>(null);

    useEffect(() => {
        supabaseGetUser().then((user) => {
          setUser(user);
          // console.log(user);
        });
      }, []);

    useEffect(() => {
      if (user) {
        supabase.from("user_details").select("last_name, first_name, email").eq("uuid", user.id).single().then((res) => {
          if (res.data) {
            let u: UserParam = {
              uuid: user.id,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              email: res.data.email,
              password: ""
            }
            setUserDisplay(u);
          }
        });
      }
    }, [user]);


    return (
        <View style={styles.container}>
            {user ? (
              <View style={styles.welcomeArea}>
                <Text style={styles.header}>Hello, {userDisplay?.first_name} {userDisplay?.last_name}</Text>
                <Link style={styles.link} href="/calgary">Go to Calgary</Link>
                <TouchableOpacity style={styles.btn} onPress={() => handleSignOut()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            ) : (
                <SignIn />
            )}
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
  welcomeArea: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 60,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#00b300',
    borderRadius: 10,
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
    padding: 10,
    color: '#fff',
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
});