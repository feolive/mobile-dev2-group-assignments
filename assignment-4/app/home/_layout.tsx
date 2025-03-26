import { View } from "react-native";
import { useState, useEffect } from "react";
import supabase from "../components/supabase";
import { User } from "@supabase/supabase-js";

const supabaseGetUser = async (): Promise<User | null> => {
  try {
    const resp:{data: { user: User | null }} = await supabase.auth.getUser();
    return resp.data.user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabaseGetUser().then((user) => {
      setUser(user);
    });
  }, []);

  return <View>{user && children}</View>;
}
