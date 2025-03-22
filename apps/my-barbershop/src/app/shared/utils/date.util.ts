export class DateUtil {
  static getFormattedDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  }
}
