import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filtercarpipe'
})
export class FiltercarpipePipe implements PipeTransform {

  transform(value:CarDetailDto[],filterText:string ): CarDetailDto[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
     return filterText?value.filter((p:CarDetailDto)=>p.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
   }

}
