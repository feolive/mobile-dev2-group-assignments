import { View, Text, StyleSheet } from "react-native";
import CityCard from "../../components/city-card";
import { Link } from "expo-router";

export default function Edmonton() {
    return (
        <View style={styles.container}>
            <Link href="https://www.edmonton.ca/">
            <CityCard
                name="Edmonton"
                description="The city of Edmonton is the capital of the province of Alberta, Canada. It is the second-largest city in Canada, after Calgary, and the third-largest in the province."
                image="https://cityuniversity.ca/wp-content/uploads/2021/01/iStock-1136615456-scaled.jpg" 
                color="#33ccff"
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
});