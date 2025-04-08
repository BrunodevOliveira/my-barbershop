import { Injectable } from '@angular/core';
import { eBucketName } from '@shared/enums/bucket-name.enum';
import { injectSupabase } from '@shared/functions/inject-supabase.function';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageApiService {
  public supabase = injectSupabase();

  async insert(bucket: eBucketName, file: File, filePath?: string) {
    if (filePath) this.delete(bucket, filePath);
    filePath = this.generatePath(file);

    await this.supabase.storage.from(bucket).upload(filePath, file);
    return filePath;
  }

  update(bucket: eBucketName, file: File, path: string) {
    return this.supabase.storage.from(bucket).update(path, file);
  }

  download(bucket: eBucketName, path: string) {
    return this.supabase.storage.from(bucket).download(path);
  }

  delete(bucket: eBucketName, path: string) {
    return this.supabase.storage.from(bucket).remove([path]);
  }

  private generatePath(file: File) {
    const fileExt = file.name.split('.').pop();
    return `${uuid()}.${fileExt}`;
  }
}
