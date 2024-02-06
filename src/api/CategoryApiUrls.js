import { Post } from "./CategoryApi"
import { Get } from "./CategoryApi";
import { Put } from "./CategoryApi";
import { Patch } from "./CategoryApi";
import { Delete } from "./CategoryApi";

export const CategoryApiUrls = {
    create : async (json) => {
        return await Post("/addCategory", json)
    },

    getall : async (json) => {
        return await Get("/getAllCategory", json)
    }, 

    getById : async (json) => {
        return await Patch("/getCategoryById", json)
    },

    update : async (id, json) => {
        return await Put(`/updateCategoryById/${id}`, json)
    },

    delete : async (id, json) => {
        return await Delete(`/deleteCategoryById/${id}`, json)
    }
};