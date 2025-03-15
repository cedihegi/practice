import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AppNotification } from '../../models/notifications';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  notifications: AppNotification[] = [];
  constructor(private notificationService: NotificationsService) { }
  ngOnInit(): void {
    this.notificationService.notifications$.subscribe({
      next: (notification: AppNotification) => {
        console.log("received notification");
        this.notifications.push(notification);
        this.removeNotificationAfterDelay(5000)

      },
    });
  }

  removeNotificationAfterDelay(delay: number) {
    setTimeout(() => {
      this.notifications.shift()
    }, delay)
  }
}
