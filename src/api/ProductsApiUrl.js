import { Post } from "./apiProducts";
import { Get } from "./apiProducts";
import { Put } from "./apiProducts";
import { Patch } from "./apiProducts";
import { Delete } from "./apiProducts";

export const ProductsApiUrl = {
    create : async (json) => {
        return await Post("/addProducts", json)
    },

    getall : async (json) => {
        return await Get("/getAllProduct", json)
    }, 

    getById : async (json) => {
        return await Patch(`/productgetById/${id}`, json)
    },

    update : async (empId, json) => {
        return await Put(`/updateproductById/${id}`, json)
    },

    delete : async (empId, json) => {
        return await Delete(`/deleteproductById/${id}`, json)
    }
};