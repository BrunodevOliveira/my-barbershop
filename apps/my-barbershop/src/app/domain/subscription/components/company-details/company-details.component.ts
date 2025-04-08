import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { COMPANY_FORM_CONFIG } from '@domain/subscription/constants/company-form-config.constants';
import { eSubscriptionStep } from '@domain/subscription/enums/subscription-step.enum';
import { SubscriptionService } from '@domain/subscription/services/subscription.service';
import { iDynamicFormConfig } from '@widget/components/dynamic-form/dynamic-form-config.interface';
import { DynamicFormComponent } from '@widget/components/dynamic-form/dynamic-form.component';
import { IconDirective } from '@widget/directives/icon/icon.directive';
import { DownloadStoragePipe } from '@widget/pipes/download-storage/download-storage.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-company-details',
  imports: [
    DynamicFormComponent,
    DownloadStoragePipe,
    NzTypographyModule,
    NzButtonModule,
    NzFlexModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    RouterModule,
    ReactiveFormsModule,
    NzIconModule,
    RouterModule,
    IconDirective,
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss',
})
export class CompanyDetailsComponent implements OnInit, AfterViewInit {
  subscriptionService = inject(SubscriptionService);
  private destroyRef = inject(DestroyRef);
  companyForm = this.subscriptionService.getCompanyForm();

  formConfig: iDynamicFormConfig[] = COMPANY_FORM_CONFIG();

  @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;

  ngOnInit(): void {
    this.subscriptionService.currentStep.set(eSubscriptionStep.COMPANY);
    // this.subscriptionService.getZipCode().subscribe(async zipCode => {
    //   await this.subscriptionService.getAddressByZipCode(zipCode);
    // });
  }

  ngAfterViewInit(): void {
    this.dynamicForm?.form.statusChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300)).subscribe(() => {
      const form = this.subscriptionService.getCompanyForm();
      form.patchValue(this.dynamicForm.form.getRawValue());
    });

    this.dynamicForm.form.patchValue(this.subscriptionService.getCompanyForm().getRawValue());
  }

  submit() {
    this.subscriptionService.submit();
  }
  previousStep(): void {
    this.subscriptionService.currentStep.set(eSubscriptionStep.ADMIN);
  }
}
