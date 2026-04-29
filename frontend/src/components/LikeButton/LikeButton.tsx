import { useState } from "react";
import "./LikeButton.css";

interface LikeButtonProps {
  projectId: number | string;
  className?: string;
  defaultLiked?: boolean;
  onToggle?: (liked: boolean) => void;
}

export default function LikeButton({
    projectId,
    className = "",
  defaultLiked = false,
  onToggle,
}: LikeButtonProps) {
    const storageKey = `liked-project-${projectId}`;

    const [liked, setLiked] = useState(() => {
        const savedLiked = localStorage.getItem(storageKey);
        return savedLiked ? JSON.parse(savedLiked) : defaultLiked;
      });

  const handleClick = () => {
    setLiked((prev : any) => {
      const next = !prev;

      localStorage.setItem(storageKey, JSON.stringify(next));

      alert(
        next
          ? "좋아요한 프로젝트에 추가되었습니다"
          : "취소되었습니다."
      );

      onToggle?.(next);
      return next;
    });
  };

  const rootClassName = `like-button ${liked ? "like-button--active" : ""} ${className}`.trim();

  return (
    <button
      type="button"
      onClick={handleClick}
      className={rootClassName}
      aria-pressed={liked}
      aria-label="좋아요"
    >
      {liked ? (
        // ❤️ 채워진 하트 
        <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.4988 6.81131L10.8016 5.27789C9.10432 3.74471 6.284 4.08858 4.73976 5.78906C2.80019 7.83319 2.80009 11.2928 4.8524 13.4559L12.499 20.9404L20.1452 13.4559C22.1975 11.2928 22.1976 7.83355 20.2578 5.78906C18.7136 4.08858 15.8934 3.74477 14.1961 5.27789L12.4988 6.81131ZM19.0031 12.3349C20.4713 10.7663 20.4252 8.29008 19.0971 6.89031L19.0851 6.87764L19.0733 6.86471C18.0257 5.71106 16.21 5.61505 15.2687 6.46513L12.4988 8.9676L9.72908 6.4652C8.78787 5.61512 6.97191 5.71104 5.92423 6.86471L5.91247 6.87766L5.90042 6.89036C4.5726 8.28976 4.52629 10.7663 5.99449 12.3349L12.499 18.7015L19.0031 12.3349Z"
            fill="#fd5744"
            stroke="#fd5744"
            stroke-width="0.5"
        />
        </svg>
            ) : (
            // 🤍 빈 하트 
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.5 20.94L4.85 13.46C2.8 11.29 2.8 7.83 4.74 5.79C6.28 4.09 9.1 3.74 10.8 5.28L12.5 6.81L14.2 5.28C15.89 3.74 18.71 4.09 20.26 5.79C22.2 7.83 22.2 11.29 20.15 13.46L12.5 20.94Z"
            fill="#000"
            fill-opacity="0.25"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
        />
        </svg>
      )}
    </button>
  );
}