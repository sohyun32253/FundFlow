import type { ReactNode, MouseEventHandler } from "react";

interface ActionButtonProps {
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export default function ActionButton({
  active,
  onClick,
  children,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: active ? "#222" : "#fff",
        color: active ? "#fff" : "#222",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}