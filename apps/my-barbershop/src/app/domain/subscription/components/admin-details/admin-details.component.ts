import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { eSubscriptionStep } from '@domain/subscription/enums/subscription-step.enum';
import { SubscriptionService } from '@domain/subscription/services/subscription.service';
import { eDynamicField } from '@widget/components/dynamic-form/dynamic-field.enum';
import { iDynamicFormConfig } from '@widget/components/dynamic-form/dynamic-form-config.interface';
import { DynamicFormComponent } from '@widget/components/dynamic-form/dynamic-form.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime } from 'rxjs';
// import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-admin-details',
  imports: [
    DynamicFormComponent,
    NzTypographyModule,
    NzButtonModule,
    NzFlexModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    RouterModule,
  ],
  templateUrl: './admin-details.component.html',
  styleUrl: './admin-details.component.scss',
})
export class AdminDetailsComponent implements OnInit, AfterViewInit {
  private subscriptionService = inject(SubscriptionService);
  private destroyRef = inject(DestroyRef);
  // adminForm = this.subscriptionService.getAdminForm();
  formConfig: iDynamicFormConfig[] = [
    {
      label: 'Nome',
      name: 'name',
      type: {
        field: eDynamicField.INPUT,
      },
      validations: [Validators.required],
      size: 24,
    },
    {
      label: 'E-mail',
      name: 'email',
      type: {
        field: eDynamicField.INPUT,
      },
      validations: [Validators.required, Validators.email],
      size: 24,
    },
    {
      label: 'Telefone',
      name: 'phone',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'tel',
      },
      mask: '(00) 00000-0000||(00) 0000-0000',
      validations: [Validators.required],
      size: 24,
    },
    {
      label: 'Senha',
      name: 'password',
      type: {
        field: eDynamicField.INPUT,
        typeField: 'password',
      },
      validations: [Validators.required],
      size: 24,
    },
  ];

  @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;

  ngOnInit(): void {
    this.subscriptionService.currentStep.set(eSubscriptionStep.ADMIN);
  }

  ngAfterViewInit(): void {
    this.dynamicForm?.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300)).subscribe(value => {
      const form = this.subscriptionService.getAdminForm();
      form.patchValue(value);
    });

    this.dynamicForm.form.patchValue(this.subscriptionService.getAdminForm().value);
  }
}
