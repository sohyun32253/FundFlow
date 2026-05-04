import { useState } from "react";
import ProjectListPage from "./pages/ProjectListPage";

function App() {
  // 토스트 메세지 관리
  const [toast, setToast] = useState<string>("");

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      <ProjectListPage showToast={showToast} />
    </>
  );
}

export default App;