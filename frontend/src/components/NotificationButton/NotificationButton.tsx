import { useState } from "react";
import "./NotificationButton.css";
import notificationIcon from "../../assets/icon_notification.svg";
import notificationingIcon from "../../assets/icon_notification_ing.svg";

interface NotificationButtonProps {
    projectId: number | string;
    className?: string;
    defaultNotified?: boolean;
    onToggle?: (notified: boolean) => void;
    notificationCount: number;
    showToast: (message: string) => void;
  }

export default function NotificationButton({  
    projectId,
    className = "",
    defaultNotified = false,
    onToggle,
    notificationCount,
    showToast
}: NotificationButtonProps) {
    const storageKey = `notified-project-${projectId}`;

    const [isNotification, setIsNotification] = useState<boolean>(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : defaultNotified;
      } catch {
        return defaultNotified;
      }
    });

      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
      
        setIsNotification((prev: boolean) => {
          const next = !prev;
      
          localStorage.setItem(storageKey, JSON.stringify(next));
      
          showToast(
            next
              ? "알림신청이 완료되었습니다."
              : "알림신청이 취소되었습니다."
          );
      
          onToggle?.(next);
      
          return next;
        });
      };

  return (
  <>
    <div className="notification_container">
      <div className="notification_status">{notificationCount.toLocaleString()}명 알림신청 중</div>
        <button
        type="button"
        onClick={handleClick}
        className={`notification_btn ${isNotification ? "notification_btn--active" : ""} ${className}`.trim()}
        >
        {!isNotification && (
          <div className="notifi_default">
            <img src={notificationIcon} alt="" aria-hidden="true" />
            <span>알림신청</span>
          </div>
        )}
        {isNotification && (
          <div className="notifi_ing">
            <img src={notificationingIcon} alt="" aria-hidden="true" />
            <span>알림신청 중</span>
          </div>
        )}
        </button>
    </div>
  </>
  );
}