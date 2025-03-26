import { View, StyleSheet } from "react-native";
import {useState, useEffect} from "react";
import SignIn from "./components/sign-in";
import { Link } from "expo-router";
import { User } from "@supabase/supabase-js";
import { supabaseGetUser } from "./components/supabase";



export default function Login() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabaseGetUser().then((user) => {
          setUser(user);
        });
      }, []);

    return (
        <View style={styles.container}>
            {user ? (
                <Link href="/calgary">Go to Calgary</Link>
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
});