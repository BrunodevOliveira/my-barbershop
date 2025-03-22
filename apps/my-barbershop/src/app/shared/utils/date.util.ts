export class DateUtil {
  static getFormattedDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      timeStyle: 'long',
      timeZone: 'America/Sao_Paulo',
    }).format(date);
  }
}
