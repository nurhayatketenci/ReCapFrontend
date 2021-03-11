import { CarDetailDto } from "./carDetailDto";
import { ResponseModel } from "./responseModel";

export interface CarResponseModel extends ResponseModel{
    data:CarDetailDto[]
   
}