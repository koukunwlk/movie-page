import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from 'src/app/shared';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
   this.route.queryParams.subscribe(params => this.message = params['error']);
  }

  onSubmit() {
    this.loading = true;
    const login: Login = this.loginForm.value;
    this.loginService.login(login).subscribe(
      {
        next: (user) => {
          if(user) {
            this.loginService.setUser(user);
            this.router.navigate(['/home']);
          } else {
            this.message = "Invalid credentials";
          }
        },
        error: (error) => {
          this.message = "Invalid credentials";
        },
        complete: () => {
          this.loading = false;
        }
      }
    ).add(() => {
      this.loading = false;
    })
    return false
  }
}


