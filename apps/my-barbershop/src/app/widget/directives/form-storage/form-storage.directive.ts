import { DestroyRef, Directive, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { SubscriptionService } from '@domain/subscription/services/subscription.service';
import { debounceTime } from 'rxjs';

@Directive({
  selector: 'form[formGroup][mbFormStorage]',
  standalone: true,
})
export class FormStorageDirective implements OnInit {
  private destroyRef = inject(DestroyRef);
  private subscriptionService = inject(SubscriptionService);

  @Input() formGroup?: FormGroup;
  @Input() mbFormStorage?: string;

  ngOnInit() {
    this.updateFormValue();
    this.listenUpdateValue();
  }

  private updateFormValue() {
    const storageLs = localStorage.getItem(this.mbFormStorage || '');
    const storageValue = JSON.parse(storageLs || '{}');

    if (storageValue) {
      this.formGroup?.patchValue(storageValue);

      // Verifica se existe um CEP salvo e dispara a busca do endereço
      const companyForm = this.formGroup?.get('company');
      const zipCode = companyForm?.get('zip_code')?.value;

      if (zipCode?.length === 8) {
        // this.subscriptionService.getAddressByZipCode(zipCode);
      }
    }
  }

  private listenUpdateValue() {
    this.formGroup?.valueChanges.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      console.log('chegou aqui:', value);
      localStorage.setItem(this.mbFormStorage || '', JSON.stringify(value));
    });
  }
}
