import { NotificationType } from "@/context";

export const filterUnreadNotifications = (Notifications: NotificationType[]) => {
  return Notifications.filter((notification: NotificationType) => notification.isRead === false);
}