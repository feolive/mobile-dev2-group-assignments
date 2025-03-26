import { Stack } from "expo-router";


export default function SignUpLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}