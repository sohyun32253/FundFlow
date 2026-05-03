// 남은 일 수 포맷팅
export const formatAmount = (amount: number) => {
    return amount.toLocaleString("ko-KR");
  };
  
  export const getRemainingDaysFromTTL = (timeToLive: number | null) => {
    if (timeToLive === null || timeToLive <= 0) return "종료";
  
    const DAY = 1000 * 60 * 60 * 24;
  
    if (timeToLive <= DAY) {
      return "오늘 마감";
    }
  
    const days = Math.ceil(timeToLive / DAY);
  
    return `${days}일 남음`;
  };