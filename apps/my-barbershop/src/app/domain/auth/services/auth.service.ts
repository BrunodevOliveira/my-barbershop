import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from '../interfaces/user.interface';
import { injectSupabase } from './../../../shared/functions/inject-supabase.function';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = injectSupabase();
  private route = inject(Router);

  currentUser = signal<iUser | null>(null);
  isLoggedIn = signal<boolean>(false);

  async load() {
    // const getLSUser = localStorage.getItem('sb-zqvsvjvihqsmdahwucof-auth-token');
    // const { user } = JSON.parse(getLSUser || '{}');
    // console.log('User localStorage: ', user);
    const { data } = await this.supabase.auth.getSession();

    if (!data.session) {
      // await this.purgeAndRedirect();
      return;
    }

    this.currentUser.set(data.session.user as unknown as iUser);
    this.isLoggedIn.set(true);
    console.log('User loaded:', this.currentUser());
  }

  async purgeAndRedirect() {
    await this.supabase.auth.signOut();
    this.route.navigate(['/auth']);
  }
}
