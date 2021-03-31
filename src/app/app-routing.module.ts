import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/add-component/car-add/car-add.component';
import { CarImageDetailComponent } from './components/car-image-detail/car-image-detail.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorComponent } from './components/color/color.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { RentalcarComponent } from './components/rentalcar/rentalcar.component';
import { BrandAddComponent } from './components/add-component/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add-component/color-add/color-add.component';
import { BrandUpdateComponent } from './components/update-component/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/update-component/car-update/car-update.component';
import { ColorUpdateComponent } from './components/update-component/color-update/color-update.component';
import { BranddetailsComponent } from './components/details/branddetails/branddetails.component';
import { ColordetailsComponent } from './components/details/colordetails/colordetails.component';
import { CardetailsComponent } from './components/details/cardetails/cardetails.component';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarComponent},
  {path : "cars/image/:carId", component : CarImageDetailComponent},
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'rent/car/:carId', component: RentalcarComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cart', component: CartComponent },
  { path: 'creditCard', component: CreditCardComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent },
  { path: 'cars/update/:carId', component: CarUpdateComponent },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent },
  { path: 'brands/detail', component: BranddetailsComponent },
  { path: 'colors/detail', component: ColordetailsComponent },
  { path: 'cars/detail', component: CardetailsComponent },




 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
