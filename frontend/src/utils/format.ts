// src/utils/format.ts
export const formatAmount = (amount: number) => {
    return amount.toLocaleString("ko-KR");
  };
  
  export const getRemainingDaysFromTTL = (timeToLive: number | null) => {
    if (!timeToLive || timeToLive <= 0) return "종료";
  
    const days = Math.ceil(timeToLive / (1000 * 60 * 60 * 24));
    return `${days}일 남음`;
  };