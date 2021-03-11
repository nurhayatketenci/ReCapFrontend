import { Customer } from "./customer";
import { ResponseModel } from "./responseModel";

export interface CustomeResponseModel extends ResponseModel{
    data:Customer[]
}