import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/add-component/car-add/car-add.component';
import { CarImageDetailComponent } from './components/car-image-detail/car-image-detail.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { CreditCardComponent } from './components/payment/payment.component';
import { RentalcarComponent } from './components/rentalcar/rentalcar.component';
import { BrandAddComponent } from './components/add-component/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add-component/color-add/color-add.component';
import { BrandUpdateComponent } from './components/update-component/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/update-component/car-update/car-update.component';
import { ColorUpdateComponent } from './components/update-component/color-update/color-update.component';
import { BranddetailsComponent } from './components/details/branddetails/branddetails.component';
import { ColordetailsComponent } from './components/details/colordetails/colordetails.component';
import { CardetailsComponent } from './components/details/cardetails/cardetails.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HomeComponent } from './components/home/home.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarimageComponent } from './components/carimage/carimage.component';



const routes: Routes = [
  { path: "", component: HomeComponent },

  { path: "cars", component: CarComponent },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },
  { path: "cars/cardetails/:carId", component: CarComponent, canActivate: [LoginGuard] },
  { path: "cars/image/:carId", component: CarImageDetailComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: 'cars/detail', component: CardetailsComponent, canActivate: [LoginGuard] },
  { path: 'cars/update/:carId', component: CarUpdateComponent, canActivate: [LoginGuard] },


  { path: 'colors/add', component: ColorAddComponent, canActivate: [LoginGuard] },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent, canActivate: [LoginGuard] },
  { path: 'colors/detail', component: ColordetailsComponent, canActivate: [LoginGuard] },


  { path: 'rent/car/:carId', component: RentalcarComponent, canActivate: [LoginGuard]},


  { path: 'creditCard/:cUsersId', component: CreditCardComponent, canActivate: [LoginGuard] },


  { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },


  { path: 'brands/update/:brandId', component: BrandUpdateComponent, canActivate: [LoginGuard] },
  { path: 'brands/detail', component: BranddetailsComponent, canActivate: [LoginGuard] },
  { path: 'brands/add', component: BrandAddComponent, canActivate: [LoginGuard] },


  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'user/update', component: UserDetailComponent , canActivate: [LoginGuard]},


  { path: 'home', component: HomeComponent },

  { path: 'rental', component: RentalComponent, canActivate: [LoginGuard] },

  { path: 'carimageadd', component: CarimageComponent , canActivate: [LoginGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
