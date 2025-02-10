import { View, Text, StyleSheet } from "react-native";

export default function Welcome() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My New App!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
})