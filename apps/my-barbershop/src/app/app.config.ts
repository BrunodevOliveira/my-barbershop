import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { ApplicationConfig, importProvidersFrom, inject, isDevMode, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthService } from '@domain/auth/services/auth.service';
import { provideTransloco } from '@jsverse/transloco';
import { ThemeService } from '@shared/services/theme/theme.service';
import { provideNzI18n, pt_BR } from 'ng-zorro-antd/i18n';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { appRoutes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideNzI18n(pt_BR),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['pt-BR', 'en'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => inject(ThemeService).loadTheme()),
    provideAppInitializer(() => inject(AuthService).load()),
    provideEnvironmentNgxMask(),
  ],
};
