import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#00b300' }}>
            <Tabs.Screen name="calgary" options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="fire" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="edmonton" options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="xing" size={size} color={color} />
                ),
            }} />
        </Tabs>
    );
}