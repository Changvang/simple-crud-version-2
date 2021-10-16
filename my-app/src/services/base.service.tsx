import Response from "../models/response";

import axios from 'axios';

export default class BaseService{
    private static baseUrl: string = 'https:localhost:3100/';

    public static async getAll<T>(url: string){
        let res = await axios.get<Array<T>>(this.baseUrl + url)
            .then((response: any) =>{
                const result = response.data;
                if(result && result.success){
                    return new Response(true, result.data as Array<T>, "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList .length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function(error){
                return new Response(false, null, "Error", error)
            })
        return res;
    }

    public static get<T>(url: string, param: any): Promise<Response>{
        let res = axios.get<T>(this.baseUrl + url + param)
            .then((response: any)=>{
                const result = response.data;
                if(result && result.success){
                    return new Response(true, result.data, "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList .length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function(error){
                return new Response(false, null, "Error", error)
            })
        return res;
    }

    public static delete(url: string, param: any): Promise<Response>{
        console.log(param);

        let res = axios.delete(this.baseUrl + url , {data: param})
            .then((response: any)=>{
                const result = response.data;
                if(result && result.success){
                    return new Response(true, result.data, "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList .length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function(error){
                return new Response(false, null, "Error", error)
            })
        return res;
    }

    public static create<T>(url: string, obj: T): Promise<Response>{
        let res = axios.post<T>(this.baseUrl + url , obj)
            .then((response: any)=>{
                const result = response.data;
                if(result && result.success){
                    return new Response(true, result.data, "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList .length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function(error){
                return new Response(false, null, "Error", error)
            })
        return res;
    }

    public static update<T>(url: string, param: any, obj: T): Promise<Response>{
        let res = axios.post<T>(this.baseUrl + url + param , obj)
            .then((response: any)=>{
                const result = response.data;
                if(result && result.success){
                    return new Response(true, result.data, "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList .length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function(error){
                return new Response(false, null, "Error", error)
            })
        return res;
    }
}