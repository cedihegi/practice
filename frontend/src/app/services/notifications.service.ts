import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AppNotification } from "../models/notifications";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  private notifications = new Subject<AppNotification>();
  notifications$: Observable<AppNotification> = this.notifications.asObservable()

  showNotification(notification: AppNotification) {
    this.notifications.next(notification)
  }

  showError(message: string) {
    this.showNotification({
      message: message,
      kind: 'error',
      timestamp: new Date()
    })
  }
}
