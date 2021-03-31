import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import {CarImageDetailComponent} from './components/car-image-detail/car-image-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { FiltercarpipePipe } from './pipes/filtercarpipe.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { RentalcarComponent } from './components/rentalcar/rentalcar.component';
import { CarAddComponent } from './components/add-component/car-add/car-add.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CartComponent } from './components/cart/cart.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { BrandAddComponent } from './components/add-component/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add-component/color-add/color-add.component';
import { CardetailsComponent } from './components/details/cardetails/cardetails.component';
import { BranddetailsComponent } from './components/details/branddetails/branddetails.component';
import { ColordetailsComponent } from './components/details/colordetails/colordetails.component';
import { BrandDeleteComponent } from './components/delete-component/brand-delete/brand-delete.component';
import { CarDeleteComponent } from './components/delete-component/car-delete/car-delete.component';
import { ColorDeleteComponent } from './components/delete-component/color-delete/color-delete.component';
import { CarUpdateComponent } from './components/update-component/car-update/car-update.component';
import { BrandUpdateComponent } from './components/update-component/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/update-component/color-update/color-update.component';



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarComponent,
    RentalComponent,
    CarImageDetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    FilterColorPipePipe,
    FiltercarpipePipe,
    FilterComponent,
    RentalcarComponent,
    CarAddComponent,
    CartComponent,
    CreditCardComponent,
    BrandAddComponent,
    ColorAddComponent,
    CardetailsComponent,
    BranddetailsComponent,
    ColordetailsComponent,
    BrandDeleteComponent,
    CarDeleteComponent,
    ColorDeleteComponent,
    CarUpdateComponent,
    BrandUpdateComponent,
    ColorUpdateComponent
    
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
