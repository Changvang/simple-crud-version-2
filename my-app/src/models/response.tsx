export default class Response{
    public Status: boolean;
    public Data: any;
    public Message: string;
    public Exception: string;

    constructor(status: boolean, data: any, message: string, exception:string){
        this.Status = status;
        this.Data = data;
        this.Message = message;
        this.Exception = exception;
    }

}