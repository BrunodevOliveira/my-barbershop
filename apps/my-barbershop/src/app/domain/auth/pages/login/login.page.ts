import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { injectSupabase } from '@shared/functions/inject-supabase.function';
import { ThemeService } from '@shared/services/theme/theme.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  imports: [TranslocoModule, NzButtonComponent, NzFlexModule, NzFormModule, NzInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private translocoService = inject(TranslocoService);
  private themeService = inject(ThemeService);
  private supabase = injectSupabase();
  private notificationService = inject(NzNotificationService);
  protected route = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  createNotification(type = 'error'): void {
    this.notificationService.create(type, 'Erro', 'Preencha todos os campos corretamente');
  }

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  async login() {
    console.log(this.loginForm.value);

    if (!this.loginForm.valid) {
      this.createNotification();
      return;
    }

    const { email, password } = this.loginForm.value;

    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.notificationService.error('Erro ao fazer login', 'Verifique suas credenciais e tente novamente');
      return;
    }

    this.route.navigate(['/']);
  }
}
