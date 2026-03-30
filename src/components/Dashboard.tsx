import React, { useState, useCallback } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import HomeView from "./views/HomeView";
import TransferView from "./views/TransferView";
import HistoryView from "./views/HistoryView";
import CardsView from "./views/CardsView";
import InvestView from "./views/InvestView";

interface DashboardProps {
  user: { name: string; account: string };
  onLogout: () => void;
}

export type View = "home" | "transfer" | "history" | "cards" | "invest";

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<View>("home");

  // memoized to avoid re-creating on every render
  const renderView = useCallback(() => {
    switch (activeView) {
      case "home":     return <HomeView user={user} />;
      case "transfer": return <TransferView />;
      case "history":  return <HistoryView />;
      case "cards":    return <CardsView />;
      case "invest":   return <InvestView />;
    }
  }, [activeView, user]);

  return (
    <div className="dashboard-root">
      <Sidebar activeView={activeView} onNavigate={setActiveView} user={user} onLogout={onLogout} />
      <main className="dashboard-main">{renderView()}</main>
    </div>
  );
};

export default Dashboard;
