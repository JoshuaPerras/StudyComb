'use server'

import { signIn, signOut } from "../../auth";
import connectMongoDB from "../../../config/mongodb";
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<any> {  // login connect
  await connectMongoDB(); 

  // vars for info
  const email = formData.get("email") as string; 
  const password = formData.get("password") as string; 

  try {
    const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      return response; // if email and password works, connect
   } catch (err: any) { // else throw error
      throw err;
   }
}