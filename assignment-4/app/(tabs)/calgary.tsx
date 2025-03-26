import { View, Text, StyleSheet } from "react-native";
import CityCard from "../components/city-card";
import { Link } from "expo-router";

export default function Calgary() {
    return (
        <View style={styles.container}>
            <Link href="https://www.calgary.ca/home.html">
            <CityCard
                name="Calgary"
                description="The city of Calgary is the capital of the province of Alberta, Canada. It is the third-largest city in Canada, after Toronto and Vancouver, and the second-largest in the province."
                image="https://www.airtransat.com/getmedia/80ead5e2-6d10-4b81-bfc0-a7d690693c7b/Calgary-1000x600-Ete-3.aspx?width=1000&height=600&ext=.jpg" 
                color="#ff6666"
            />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
})