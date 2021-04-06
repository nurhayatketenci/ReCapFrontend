import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private authService:AuthService) {}

  ngOnInit(): void {}
  cleanLocal() {
    this.localStorageService.cleanLocal()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/"])
  }
  isAuth(){
    return this.authService.isAuthenticated();
  }
  getName(){
    
    return this.authService.getName()
  }
}
