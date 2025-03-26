import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User, AuthResponse } from "@supabase/supabase-js";
import { SupabaseResponse } from "./types";
import { UserParam } from "./types";

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

const supabaseSignIn = async (email: string, password: string): Promise<SupabaseResponse> => {
  try{
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      throw error;
    }
    return { data: { data }, error: null };
  } catch (err) {
    return { data: { data: null }, error: err as string };
  }
};

const supabaseSignUp = async (user: UserParam) => {
  try{
      let resp = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });
      if (resp.error) {
        throw resp.error;
      }
      return resp.data.user;
  } catch (err) {
    throw err;
  }
};

const supabaseSignOut = async () => {
  try{
    let { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (err) {
    alert(err as string);
  }
};

export default supabase;
export { supabaseGetUser, supabaseSignIn, supabaseSignUp, supabaseSignOut };
