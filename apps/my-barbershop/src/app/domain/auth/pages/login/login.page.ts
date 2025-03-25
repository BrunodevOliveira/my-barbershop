import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ThemeService } from '@shared/services/theme/theme.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-login',
  imports: [TranslocoModule, NzButtonComponent, NzFlexModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private translocoService = inject(TranslocoService);
  private themeService = inject(ThemeService);

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
