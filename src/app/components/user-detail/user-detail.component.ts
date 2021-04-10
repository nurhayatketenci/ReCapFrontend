import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userUpdateForm: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getUserByEmail(this.localStorageService.getLocal('email'));
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.user.id, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      password: ['', Validators.required],
      email: [this.user.email, Validators.required],
    });
  }

  getUserByEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe((response) => {
      this.user = response.data;
      this.createUserUpdateForm();
    });
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.userId = this.user.id;
      this.authService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success('güncellendi');
        },
        (responseError) => {
          this.toastrService.error('hata olustu');
        }
      );
    } else {
      this.toastrService.error('Form eksik', 'Hata');
    }
  }
}
