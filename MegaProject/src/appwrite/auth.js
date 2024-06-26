import config from "../config/config.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client =  new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        try {
            const userAccount  = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // call another method .... making new async function to handle login credentials
                return this.login({email, password});
                
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }
    
    async getCurrentUser() {
        try {
            await this.account.get()
            
        } catch (error) {
            console.log("Appwrite Service Error ")
        }
        return null;
    }

    async logOut() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: Logout :: error ", error)
        }
    }
}

const authService = new AuthService();
export default authService