import { Notify } from 'quasar';

export default class Notification {
  static error(message: string) {
    Notify.create({
      progress: true,
      type: 'negative',
      message: message,
      position: 'bottom-right',
    });
  }
  static success(message: string) {
    Notify.create({
      progress: true,
      type: 'positive',
      message: message,
      position: 'bottom-right',
    });
  }
}
