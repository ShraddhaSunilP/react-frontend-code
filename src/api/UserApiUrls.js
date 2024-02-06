import { Post } from "./UserApi"
import { Login } from "./UserApi"
import { Put } from "./UserApi"

export const UserApiUrls = {
    create : async (json) => {
        return await Post("/addUser", json)
    },

    login : async (json) => {
        return await Login("/login", json)
    },

    forgotpassword: async(json) => {
         return await Put("/forgotPassword", json)
    },

} 
