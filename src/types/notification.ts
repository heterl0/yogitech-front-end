import { LabelColor } from "@/components/label";

export type INotification = {
  id: number;
  user: number;
  title: string;
  body: string;
  time: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  active_status: number;
};

export function getNotificationStatus(status: number): {
  label: string;
  color: LabelColor;
  value: number;
} {
  return NOTIFICATION_STATUS[status];
}

export const NOTIFICATION_STATUS = [
  { label: "Disabled", color: "default" as LabelColor, value: 0 },
  { label: "Active", color: "success" as LabelColor, value: 1 },
];

export type INotificationTableFilters = {
  name: string;
  status: string[];
};

export type INotificationTableFilterValue = string | string[];
