import { Post } from "./apiCategory";
import { Get } from "./apiCategory";
import { Put } from "./apiCategory";
import { Patch } from "./apiCategory";
import { Delete } from "./apiCategory";

export const CategoryApiUrl = {
    create : async (json) => {
        return await Post("/addCategory", json)
    },

    getall : async (json) => {
        return await Get("/getAll", json)
    }, 

    getById : async (json) => {
        return await Patch(`/getById/${id}`, json)
    },

    update : async (empId, json) => {
        return await Put(`/updateById/${id}`, json)
    },

    delete : async (empId, json) => {
        return await Delete(`/deleteById/${id}`, json)
    }
};