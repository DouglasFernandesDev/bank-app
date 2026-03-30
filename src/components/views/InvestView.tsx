import React, { useState } from "react";
import "./InvestView.css";

// FIX: renamed 'yield' (reserved JS keyword in generator context) to 'returns'
interface Product {
  name: string;
  type: string;
  returns: string;
  risk: string;
  riskKey: string; // FIX: pre-computed ASCII-safe CSS class key (no accented chars)
  min: string;
  icon: string;
  badge: string | null;
}

const products: Product[] = [
  { name: "Tesouro Selic 2029", type: "Renda Fixa", returns: "+12.1% a.a.", risk: "Baixo", riskKey: "baixo", min: "R$ 30,00", icon: "🏛", badge: "Recomendado" },
  { name: "CDB NovaBanco 120%", type: "CDB", returns: "+14.8% a.a.", risk: "Baixo", riskKey: "baixo", min: "R$ 1.000,00", icon: "📈", badge: "Popular" },
  { name: "Fundo Multimercado X", type: "Fundo", returns: "+18.3% a.a.", risk: "Médio", riskKey: "medio", min: "R$ 500,00", icon: "◈", badge: null },
  { name: "ETF IBOV11", type: "Renda Variável", returns: "+22.6% a.a.", risk: "Alto", riskKey: "alto", min: "R$ 10,00", icon: "📊", badge: null },
];

const portfolio = [
  { name: "Tesouro Selic", value: 4820.00, change: +3.2, icon: "🏛" },
  { name: "CDB 120% CDI", value: 2100.00, change: +1.8, icon: "📈" },
  { name: "IBOV11", value: 1560.00, change: -0.4, icon: "📊" },
];

const InvestView: React.FC = () => {
  const [tab, setTab] = useState<"portfolio" | "explore">("portfolio");
  const total = portfolio.reduce((acc, p) => acc + p.value, 0);

  return (
    <div className="invest-view">
      <div className="view-header">
        <h1 className="view-title">Investimentos</h1>
        <p className="view-sub">Faça seu dinheiro crescer</p>
      </div>

      <div className="invest-summary-card">
        <div className="invest-total">
          <span className="invest-total-label">Patrimônio total</span>
          <span className="invest-total-value">
            {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
          <span className="invest-total-change">+R$ 184,20 este mês (+2.2%)</span>
        </div>
        <div className="invest-chart-bars">
          {[40, 60, 45, 70, 55, 80, 75, 90, 65, 85, 78, 95].map((h, i) => (
            <div key={i} className="chart-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className="invest-tabs">
        <button
          className={`invest-tab ${tab === "portfolio" ? "active" : ""}`}
          onClick={() => setTab("portfolio")}
        >
          Minha carteira
        </button>
        <button
          className={`invest-tab ${tab === "explore" ? "active" : ""}`}
          onClick={() => setTab("explore")}
        >
          Explorar produtos
        </button>
      </div>

      {tab === "portfolio" ? (
        <div className="portfolio-list">
          {portfolio.map((item) => (
            <div key={item.name} className="portfolio-item">
              <div className="pi-icon">{item.icon}</div>
              <div className="pi-info">
                <span className="pi-name">{item.name}</span>
                <span className="pi-type">Investimento ativo</span>
              </div>
              <div className="pi-right">
                <span className="pi-value">
                  {item.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span className={`pi-change ${item.change >= 0 ? "up" : "down"}`}>
                  {item.change >= 0 ? "▲" : "▼"} {Math.abs(item.change)}%
                </span>
              </div>
            </div>
          ))}
          <button className="add-invest-btn">+ Aplicar mais</button>
        </div>
      ) : (
        <div className="products-list">
          {products.map((p) => (
            <div key={p.name} className="product-item">
              <div className="prod-icon">{p.icon}</div>
              <div className="prod-info">
                <div className="prod-name-row">
                  <span className="prod-name">{p.name}</span>
                  {p.badge && <span className="prod-badge">{p.badge}</span>}
                </div>
                <span className="prod-type">{p.type} · Mínimo {p.min}</span>
              </div>
              <div className="prod-right">
                {/* FIX: use 'returns' instead of reserved keyword 'yield' */}
                <span className="prod-yield">{p.returns}</span>
                {/* FIX: use pre-computed riskKey (no accented chars) for CSS class */}
                <span className={`prod-risk risk-${p.riskKey}`}>{p.risk} risco</span>
              </div>
              <button className="prod-cta">Aplicar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestView;
