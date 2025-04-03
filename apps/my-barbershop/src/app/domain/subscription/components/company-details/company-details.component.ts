import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { eSubscriptionStep } from '@domain/subscription/enums/subscription-step.enum';
import { SubscriptionService } from '@domain/subscription/services/subscription.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-company-details',
  imports: [
    NzTypographyModule,
    NzButtonModule,
    NzFlexModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NzIconModule,
    RouterModule,
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss',
})
export class CompanyDetailsComponent implements OnInit {
  subscriptionService = inject(SubscriptionService);
  companyForm = this.subscriptionService.getCompanyForm();

  ngOnInit(): void {
    this.subscriptionService.getZipCode().subscribe(async zipCode => {
      await this.subscriptionService.getAddressByZipCode(zipCode);
    });
  }

  submit() {
    this.subscriptionService.submit();
  }
  previousStep(): void {
    this.subscriptionService.currentStep.set(eSubscriptionStep.ADMIN);
  }
}
