import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login, RegisterUser } from 'src/app/shared';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  message: string = '';
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.route.queryParams.subscribe(
      (params) => (this.message = params['error'])
    );
  }

  onSubmit() {
    this.loading = true;
    const newUser: RegisterUser = this.registerForm.value;
    this.loginService
      .register(newUser)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (response) => {
          this.message = response.error.message;
        },
        complete: () => {
          this.loading = false;
        },
      })
      .add(() => {
        this.loading = false;
      });
    return false;
  }
}
