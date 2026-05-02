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
  }

export default function NotificationButton({  
    projectId,
    className = "",
    defaultNotified = false,
    onToggle,
    notificationCount
}: NotificationButtonProps) {
    const storageKey = `notified-project-${projectId}`;

    const [isnotification, setIsNotification] = useState(() => {
        const savedNotified = localStorage.getItem(storageKey);
        return savedNotified ? JSON.parse(savedNotified) : defaultNotified;
      });

    const [toast, setToast] = useState<string | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();   // a 태그 기본 이동 막기
        e.stopPropagation();  // 부모로 이벤트 전파 막기
      
        setIsNotification((prev : any) => {
          const next = !prev;
          localStorage.setItem(storageKey, JSON.stringify(next));
          setToast(next ? "알림신청이 완료되었습니다." : "알림신청이 취소되었습니다.");
          setTimeout(() => setToast(null), 3500);
          onToggle?.(next);
          return next;
        });
      };

  return (
    <div className="notification_container">
      <div className="notification_status">{notificationCount.toLocaleString()}명 알림신청 중</div>
      
      <button 
      type="button" 
      onClick={handleClick} 
      className={`notification_btn ${isnotification ? "notification_btn--active" : ""} ${className}`.trim()}>
        {/* 버튼 기본설정 */}
        { isnotification == false && (
        <div className="notifi_default">
          <img src={notificationIcon} alt="" aria-hidden="true" />
          <span>알림신청</span>
        </div>
        )}

        {/* 버튼 클릭 시 설정 */}
        { isnotification == true && (
        <div className="notifi_ing">
            <img src={notificationingIcon} alt="" aria-hidden="true" />
            <span>알림신청 중</span>
        </div>
        )}
     </button>
        {toast && <div className="toast">{toast}</div>}
    </div>
  );
}