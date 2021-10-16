import Response from "../models/response";

import axios from 'axios';

export default class BaseService{
    private static baseUrl: string = 'http://127.0.0.1:5035/api';

    public static async getAll<T>(url: string){
        console.log(this.baseUrl + url);
        let res = await axios.get<Array<T>>(this.baseUrl + url)
            .then((response: any) =>{
                console.log(response);
                const result = response.data;
                if(result && result.success){
                    return new Response(true, result.Person, "Success", "");
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
                    return new Response(true, result.Person, "Success", "");
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

        let res = axios.delete(this.baseUrl + url + param.id, {data: param})
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
                console.log(response.data);
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