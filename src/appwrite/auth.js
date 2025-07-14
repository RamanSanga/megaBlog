import config from '../config/config.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // if userAccount exist so we call login page so we call another method
                return this.login({email , password});
            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            alert("This account already exist")
            return null;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email , password);
        }
        catch (error) {
            throw error;
        }
    }

    async  getCurrentUser() {
    try {
        const user = await this.account.get(); // will throw 401 if not logged in
        return user;
    } catch (error) {
        console.error("Appwrite Service :: getCurrentUser ::error");
        return null; // important to return null if unauthorized
    }
   };

    async logout() {
        try {
            await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite Service :: getCurrentUser ::error ", error)
        }
    }

}


const authService = new AuthService();

export default authService;
