import React from "react";
import { View } from "./Dashboard";
import "./Sidebar.css";

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  user: { name: string; account: string };
  onLogout: () => void;
}

const navItems: { id: View; label: string; icon: string }[] = [
  { id: "home",     label: "Início",      icon: "⬡" },
  { id: "transfer", label: "Transferir",  icon: "↗" },
  { id: "history",  label: "Extrato",     icon: "≡" },
  { id: "cards",    label: "Cartões",     icon: "▭" },
  { id: "invest",   label: "Investir",    icon: "◈" },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, user, onLogout }) => {
  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">◆</div>
        <span className="sidebar-brand-name">NovaBanco</span>
      </div>

      <p className="sidebar-section-label">Menu</p>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon-wrap" aria-hidden="true">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeView === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">{initials}</div>
          <div className="user-details">
            <span className="user-name">{user.name.split(" ")[0]}</span>
            <span className="user-account">Ag {user.account}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout} aria-label="Sair da conta" title="Sair">
          <span aria-hidden="true">⏻</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
