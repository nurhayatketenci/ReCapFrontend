import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarImageDetailComponent } from './components/car-image-detail/car-image-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { FilterComponent } from './components/filter/filter.component';
import { RentalcarComponent } from './components/rentalcar/rentalcar.component';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarComponent},
  {path : "cars/image/:carId", component : CarImageDetailComponent},
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'rent/car/:carId', component: RentalcarComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
