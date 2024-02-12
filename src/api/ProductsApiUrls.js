import { Post } from "./ProductsApi";
import { Get } from "./ProductsApi";
import { Put } from "./ProductsApi";
import { Patch } from "./ProductsApi";
import { Delete } from "./ProductsApi";

export const ProductsApiUrls = {
    create : async (json) => {
        return await Post("/addProducts", json)
    },

    getall : async (json) => {
        return await Get("/getAllProduct", json)
    }, 

    getById : async (json) => {
        return await Patch("/productGetById", json)
    },

    update : async (id, json) =>{
        return await Put(`/updateProductById/${id}`, json);
    },

    delete : async (id, json) => {
        return await Delete(`/deleteproductById/${id}`, json)
    }
};