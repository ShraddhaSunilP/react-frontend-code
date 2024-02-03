import { Login } from "./apiUser"
import { Put } from "./apiUser"
import { Post } from "./apiUser"

export const UserApiUrl = {
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


