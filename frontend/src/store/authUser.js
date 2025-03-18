/* eslint-disable no-unused-vars */
import axios from "axios";
import {create} from "zustand";
import toast from "react-hot-toast";

export const useAuthStore=create((set)=>({
user: null,
isSigningUp:false,
isCheckingAuth:true,
isLoggingOut:false,
isLoggingIn:false,
signup: async(credentials)=>{
    set({isSigningUp:true});
    try{
     
      const response=await axios.post("/api/v1/auth/signup",credentials);
      set({user:response.data.data.username, isSigningUp:false});
      toast.success("Account created successfully");
    }catch(error){
        toast.error(error.response.data.message || "Sign Up failed");
        set({user:null, isSigningUp:false});
    }
},
login: async(credentials)=>{
    set({isLoggingIn:true});
    try{
        const response=await axios.post("/api/v1/auth/login", credentials);
        console.log(response);
        console.log(response.data.data.username);
        set({user:response.data.data.username, isLoggingIn:false});
        toast.success("User Logged In");
    }catch(error){
        set({user:null, isLoggingIn:false});
        toast.error(error.response.data.message || "LogIn failed")
    }
},
logout: async()=>{
    set({isLoggingOut:true});
    try{
        await axios.post("/api/v1/auth/logout");
        set({user:null, isLoggingOut:false});
        toast.success("Logged Out successfully");
    }catch(error){
        set({isLoggingOut:false});
        toast.error(error.response.data.message || "Could not Logout")
    }
},
authCheck: async()=>{
    set({isCheckingAuth:true});
    try{
        const response=await axios.get("api/v1/auth/authCheck");
        set({user:response.data.user, isCheckingAuth:false});
        //toast.success("user is authenticated");
    }catch(error){
        //toast.error(error.response.data.message || "Something went wrong");
        set({user:null, isCheckingAuth:false});
    }
},


}))