import { Component, inject } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { eSubscriptionStep } from '@domain/subscription/enums/subscription-step.enum';
import { SubscriptionService } from '@domain/subscription/services/subscription.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxMaskDirective } from 'ngx-mask';
// import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-admin-details',
  imports: [NzTypographyModule, NzButtonModule, NzFlexModule, NzFormModule, NzInputModule, NzIconModule, RouterModule, ReactiveFormsModule, NgxMaskDirective, RouterModule],
  templateUrl: './admin-details.component.html',
  styleUrl: './admin-details.component.scss',
})
export class AdminDetailsComponent {
  subscriptionService = inject(SubscriptionService);
  adminForm = this.subscriptionService.getAdminForm();

  nextStep(): void {
    this.subscriptionService.currentStep.set(eSubscriptionStep.COMPANY);
  }
}
