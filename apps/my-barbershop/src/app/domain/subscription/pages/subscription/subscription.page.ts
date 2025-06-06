import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SubscriptionService } from '@domain/subscription/services/subscription.service';
import { FormStorageDirective } from '@widget/directives/form-storage/form-storage.directive';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [NzCardModule, NzStepsModule, RouterModule, ReactiveFormsModule, FormStorageDirective, RouterOutlet],
  templateUrl: './subscription.page.html',
  styleUrl: './subscription.page.scss',
})
export class SubscriptionPage {
  subscriptionService = inject(SubscriptionService);
}
