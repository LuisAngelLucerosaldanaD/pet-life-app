import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {SesionRequest, SessionResponse} from '../../../../core/models/auth/login.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from "@angular/common";
import {ILoginForm} from "../../../../core/models/form/form.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {BlockPageComponent} from "../../../../core/ui/block-page/block-page.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, NgIf, BlockPageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent implements OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  private _session!: SessionResponse;

  protected loginForm: FormGroup;
  protected isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = new FormGroup<ILoginForm>({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    this.loginForm.reset();
    this._subscriptions.unsubscribe();
  }

  protected login(): void {

    if (this.loginForm.invalid) {
      alert('Complete todos los campos correctamente');
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data: SesionRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this._subscriptions.add(
      this._authService.login(data).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (!response) {
            alert('No se pudo iniciar sesión, intente nuevamente');
            return;
          }

          this._session = response;

          sessionStorage.setItem('access_token', this._session.token);
          sessionStorage.setItem('session', JSON.stringify(this._session));

          this._router.navigateByUrl('/products');
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
          alert('Error al iniciar sesión: ' + err.error.message);
        }
      })
    );
  }

}
