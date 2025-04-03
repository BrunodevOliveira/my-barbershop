import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import cep from 'cep-promise';
import { EMPTY, filter, Observable } from 'rxjs';
import { eSubscriptionStep } from '../enums/subscription-step.enum';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  currentStep = signal<number>(eSubscriptionStep.ADMIN); // eSubscriptionStep.ADMIN

  form = new FormGroup({
    admin: new FormGroup({
      name: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    }),
    company: new FormGroup({
      name: new FormControl<string | null>(null),
      cnpj: new FormControl<string | null>(null),
      zip_code: new FormControl<string | null>(null), //CEP
      address: new FormControl<string | null>(null),
      number: new FormControl<string | null>(null),
      complement: new FormControl<string | null>(null),
      neighborhood: new FormControl<string | null>(null),
      city: new FormControl<string | null>(null),
      state: new FormControl<string | null>(null),
      country: new FormControl<string | null>(null),
    }),
  });

  private switchFields = ['address', 'neighborhood', 'city', 'state', 'country'];

  getAdminForm() {
    return this.form.get('admin') as FormGroup;
  }

  getCompanyForm() {
    return this.form.get('company') as FormGroup;
  }

  submit() {
    console.log(this.form.value);
  }

  getZipCode(): Observable<string> {
    return (
      this.getCompanyForm()
        .get('zip_code')
        ?.valueChanges.pipe(filter((zipCode: string) => zipCode?.length === 8)) ?? EMPTY
    );
  }

  private enableFields(fields: string[]) {
    fields.forEach(field => this.getCompanyForm().get(field)?.enable());
  }

  private disableFields(fields: string[]) {
    fields.forEach(field => this.getCompanyForm().get(field)?.disable());
  }

  async getAddressByZipCode(zipCode: string) {
    try {
      const address = await cep(zipCode);
      console.log('Chegou aqui:', zipCode, address);
      this.getCompanyForm().patchValue({
        address: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        country: 'Brasil',
      });

      // Desabilita os campos para evitar que o usuário altere o endereço:
      this.disableFields(this.switchFields);
    } catch (error) {
      // Limpa os campos em caso de erro
      this.getCompanyForm().patchValue({
        address: null,
        neighborhood: null,
        city: null,
        state: null,
        country: null,
      });
      console.log(error);
      // habilitar os campos novamente em caso de erro
      this.enableFields(this.switchFields);
    }
  }
}
