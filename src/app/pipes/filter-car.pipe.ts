import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value:CarDetailDto[],filterText:string ): CarDetailDto[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
     return filterText?value.filter((p:CarDetailDto)=>p.carName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
   }

}
