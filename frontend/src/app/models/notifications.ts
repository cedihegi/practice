export interface AppNotification {
  message: string;
  kind: 'error' | 'warning' | 'info' | 'success';
  timestamp: Date;
  removing?: boolean;
}
