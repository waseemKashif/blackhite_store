'use server'

import { signInFormSchema } from "../validators"
import { signIn,signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

// sign In user with the credentials , sign in action of user as a server action
// we will use here useAction hook. which will get previous state of form first. 
export async function signInWithCredentials(prevState: unknown, formData:FormData){
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        })
        // after validation we will send data to our auth to check sign in 
        await signIn('credentials', user);
        return {success:true, message:'Signed In Successfully'}
    } catch (error) {
        if(isRedirectError(error)){
            throw error
        }
        return {success: false, message:'Invalid Email or Password'}
    }
} 

// sign OUT of user when user clicks signOut. 

export async function signOutUser() {
    await signOut();
}


