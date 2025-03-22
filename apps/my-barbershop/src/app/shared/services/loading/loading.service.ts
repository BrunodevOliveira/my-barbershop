import { Injectable, signal } from '@angular/core';
import { DateUtil } from '@shared/utils/date.util';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  date = DateUtil.getFormattedDate(new Date());
  loading = signal(false);

  start() {
    this.loading.set(true);
  }

  stop() {
    this.loading.set(false);
  }
}
