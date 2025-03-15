export interface AppNotification {
  message: string;
  kind: 'error' | 'warning' | 'info';
  timestamp: Date;
  removing?: boolean;
}
