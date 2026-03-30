import React, { useState } from "react";
import "./CardsView.css";

interface Card {
  id: string;
  type: string;
  number: string;
  name: string;
  expiry: string;
  limit: number;
  used: number;
  color: string;
  color2: string;
}

const CardsView: React.FC = () => {
  const [selectedId, setSelectedId] = useState("card-4821");
  const [cardFlipped, setCardFlipped] = useState(false);

  // FIX Bug 6: use stable unique id instead of array index as React key
  const cards: Card[] = [
    { id: "card-4821", type: "Visa Platinum", number: "**** **** **** 4821", name: "ANA CAROLINA", expiry: "12/28", limit: 8000, used: 2640, color: "var(--blue-800)", color2: "var(--blue-600)" },
    { id: "card-9034", type: "Mastercard Gold", number: "**** **** **** 9034", name: "ANA CAROLINA", expiry: "08/27", limit: 5000, used: 1820, color: "#1e3a5f", color2: "#2563eb" },
  ];

  const card = cards.find((c) => c.id === selectedId) ?? cards[0];
  const usedPct = (card.used / card.limit) * 100;

  const handleCardSelect = (id: string) => {
    setSelectedId(id);
    setCardFlipped(false);
  };

  return (
    <div className="cards-view">
      <div className="view-header">
        <h1 className="view-title">Meus Cartões</h1>
        <p className="view-sub">Gerencie seus cartões de crédito</p>
      </div>

      <div className="cards-layout">
        <div className="card-selector">
          {/* FIX Bug 6: key uses card.id instead of array index */}
          {cards.map((c) => (
            <button
              key={c.id}
              className={`card-thumb ${selectedId === c.id ? "active" : ""}`}
              onClick={() => handleCardSelect(c.id)}
              aria-pressed={selectedId === c.id}
              aria-label={`Selecionar ${c.type} final ${c.number.slice(-4)}`}
            >
              <span className="card-thumb-type">{c.type}</span>
              <span className="card-thumb-num">{c.number.slice(-4)}</span>
            </button>
          ))}
          <button className="card-add-btn">+ Adicionar cartão</button>
        </div>

        <div className="card-display-area">
          {/* FIX Bug 9: aria-label on card flip button */}
          <div
            className={`credit-card ${cardFlipped ? "flipped" : ""}`}
            onClick={() => setCardFlipped(!cardFlipped)}
            role="button"
            tabIndex={0}
            aria-label={cardFlipped ? "Virar cartão para ver a frente" : "Virar cartão para ver o verso"}
            onKeyDown={(e) => e.key === "Enter" && setCardFlipped(!cardFlipped)}
          >
            <div
              className="card-front"
              style={{ background: `linear-gradient(135deg, ${card.color} 0%, ${card.color2} 100%)` }}
            >
              <div className="card-top">
                <span className="bank-name">◆ NovaBanco</span>
                <span className="chip" aria-hidden="true">▣</span>
              </div>
              <div className="card-number" aria-label={`Número do cartão: ${card.number}`}>
                {card.number}
              </div>
              <div className="card-bottom">
                <div>
                  <div className="card-label">TITULAR</div>
                  <div className="card-holder">{card.name}</div>
                </div>
                <div>
                  <div className="card-label">VÁLIDO ATÉ</div>
                  <div className="card-holder">{card.expiry}</div>
                </div>
                <div className="card-brand">{card.type.split(" ")[0].toUpperCase()}</div>
              </div>
            </div>
            <div className="card-back">
              <div className="magnetic-strip" />
              <div className="cvv-area">
                <div className="cvv-label">CVV</div>
                <div className="cvv-value" aria-label="CVV oculto">•••</div>
              </div>
              <div className="card-back-note">Clique para virar</div>
            </div>
          </div>
          <p className="flip-hint">Clique no cartão para ver o verso</p>

          <div className="card-limit-section">
            <div className="limit-header">
              <span>Limite utilizado</span>
              <span className="limit-amounts">
                <span className="used">
                  R$ {card.used.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
                {" / "}
                R$ {card.limit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div
              className="limit-track"
              role="progressbar"
              aria-valuenow={Math.round(usedPct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Limite utilizado: ${Math.round(usedPct)}%`}
            >
              <div className="limit-progress" style={{ width: `${usedPct}%` }} />
            </div>
            <div className="limit-footer">
              <span>
                Disponível: R$ {(card.limit - card.used).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
              <span>{usedPct.toFixed(0)}% utilizado</span>
            </div>
          </div>
        </div>

        <div className="card-actions-panel">
          <h3>Ações rápidas</h3>
          {[
            { icon: "🔒", label: "Bloquear cartão", sub: "Temporário ou permanente" },
            { icon: "🔑", label: "Alterar senha", sub: "Mudar PIN do cartão" },
            { icon: "📱", label: "Cartão virtual", sub: "Para compras online" },
            { icon: "📊", label: "Fatura atual", sub: "Vence em 10/04" },
          ].map((action) => (
            <button key={action.label} className="card-action-item">
              <span className="ca-icon" aria-hidden="true">{action.icon}</span>
              <div className="ca-info">
                <span className="ca-label">{action.label}</span>
                <span className="ca-sub">{action.sub}</span>
              </div>
              <span className="ca-arrow" aria-hidden="true">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsView;
