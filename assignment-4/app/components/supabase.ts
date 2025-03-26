import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

const supabaseGetUser = async (): Promise<User | null> => {
    try {
      const resp:{data: { user: User | null }} = await supabase.auth.getUser();
      return resp.data.user;
    } catch (err) {
      console.log(err);
      return null;
    }
};


export default supabase;
export { supabaseGetUser };
