
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {useState} from "react";
import { Link } from "expo-router";
import {User} from "../components/types";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user?.first_name} {user?.last_name}</Text>
            <Link href="/calgary">Go to City Gallery</Link>
            <TouchableOpacity style={styles.btn} onPress={() => setUser(null)}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 60,
    },
    btn: {
        padding: 16,
        color: "#ffffff",
        backgroundColor: '#000000',
        borderRadius: 8,
        width: 300,
        alignSelf: "center",
    }
});