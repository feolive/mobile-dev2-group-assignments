import { View, Text, StyleSheet, Image } from "react-native";

type CityProps = {
    name: string;
    description: string;
    image: string;
    color: string;
};

export default function CityCard({ name, description, image, color}: CityProps) {

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 15,
        width: 320,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    textContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    image: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: '100%',
        height: 200,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})