// webapp/src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import { MENU, TABS } from "./menuData";

function formatUAH(n) {
  return `${n} грн`;
}

// Картинки блюд берём из src/assets/menu/*
function getDishImage(fileName) {
  return new URL(`./assets/menu/${fileName}`, import.meta.url).href;
}

export default function App() {
  const [tab, setTab] = useState("coffee");
  const [q, setQ] = useState("");
  const [hitsOnly, setHitsOnly] = useState(false);

  // Splash (видео)
  const [showSplash, setShowSplash] = useState(true);

  // запасной таймер, если вдруг видео не сыграет (например, старый браузер)
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    // ЛОГИКА ПОИСКА:
    // - если query пустой -> фильтруем по активной категории
    // - если query есть -> ищем по ВСЕМ категориям (то, что ты хотел раньше)
    return MENU.filter((it) => {
      if (hitsOnly && !it.tags?.includes("хит")) return false;

      if (query) {
        const hay = `${it.name} ${it.desc} ${(it.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(query);
      }

      if (tab && it.category !== tab) return false;
      return true;
    });
  }, [tab, q, hitsOnly]);

  return (
    <div className="page">
      {/* Splash: показываем только видео, меню не видно */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.video
              className="splashVideo"
              src="/splash.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setShowSplash(false)}
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.45 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Контент: НЕ показываем, пока splash */}
      <div className={`wrap ${showSplash ? "isHidden" : ""}`}>
        {/* Left / top panel */}
        <div className="top">
          <div className="brand">
            <div className="neonDot" />
            <div>
              <div className="title">Coffee Club</div>
              <div className="subtitle">Бар • Кофе • Атмосфера</div>
            </div>
          </div>

          <div className="searchRow">
            <input
              className="search"
              placeholder="Поиск по меню..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              className={`chip ${hitsOnly ? "chipOn" : ""}`}
              onClick={() => setHitsOnly((v) => !v)}
              type="button"
              title="Показывать только хиты"
            >
              Хиты
            </button>
          </div>

          <div className="tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`tab ${tab === t.id ? "tabOn" : ""}`}
                onClick={() => setTab(t.id)}
                type="button"
                disabled={q.trim().length > 0} // когда идет поиск по всем категориям — табы логически “не главные”
                title={q.trim().length > 0 ? "Очисти поиск, чтобы фильтровать по категории" : ""}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <main className="main">
          <div className="grid">
            {filtered.length === 0 ? (
              <div className="empty">Ничего не найдено.</div>
            ) : (
              filtered.map((it) => {
                const imgSrc = it.image ? getDishImage(it.image) : "";
                return (
                  <motion.article
                    key={it.id}
                    className="card"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="cardMedia">
                      {imgSrc ? (
                        <img className="cardImg" src={imgSrc} alt={it.name} loading="lazy" />
                      ) : (
                        <div className="cardImgFallback">Нет фото</div>
                      )}
                    </div>

                    <div className="cardTop">
                      <div className="cardName">{it.name}</div>
                      <div className="money">{formatUAH(it.price)}</div>
                    </div>

                    <div className="cardDesc">{it.desc}</div>

                    {!!it.tags?.length && (
                      <div className="tagRow">
                        {it.tags.map((tg) => (
                          <div className="pill" key={tg}>
                            {tg === "хит" ? "🔥 хит" : tg}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.article>
                );
              })
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footLine">
            <span className="muted">Адрес:</span> Одесса •{" "}
            <span className="muted">(впиши адрес)</span>
          </div>
          <div className="footLine">
            <span className="muted">Время:</span> <b>10:00–22:00</b>
          </div>
        </footer>
      </div>
    </div>
  );
}