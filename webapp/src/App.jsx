// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import logo from "./assets/logo.png";
import splashVideo from "./assets/splash.mp4";
import { MENU, TABS } from "./menuData";

function formatUAH(n) {
  return `${n} грн`;
}

// Картинки блюд берём из src/assets/menu/*
function getDishImage(fileName) {
  // Vite: динамический URL из папки assets
  return new URL(`./assets/menu/${fileName}`, import.meta.url).href;
}

export default function App() {
  const [tab, setTab] = useState("coffee");
  const [q, setQ] = useState("");
  const [hitsOnly, setHitsOnly] = useState(false);

  // Splash (лого)
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1300);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    // ВАЖНО:
    // - если query есть: ищем по ВСЕМ категориям (таб игнорируем)
    // - если query пустой: фильтруем по текущей вкладке
    const baseList = query
      ? MENU
      : MENU.filter((it) => !tab || it.category === tab);

    // фильтр хитов применяем всегда (и при поиске, и без)
    const afterHits = hitsOnly
      ? baseList.filter((it) => it.tags?.includes("хит"))
      : baseList;

    // если нет поиска — уже можно возвращать
    if (!query) return afterHits;

    // поиск по name + desc + tags
    return afterHits.filter((it) => {
      const hay = `${it.name} ${it.desc} ${(it.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [tab, q, hitsOnly]);

  const isSearchActive = q.trim().length > 0;

  return (
    <div className="page">
      {/* Splash: меню не видно пока showSplash=true */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              className="splashVideo"
  src={splashVideo}
  autoPlay
  muted
  playsInline
  preload="auto"
  initial={{ scale: 1, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 1, opacity: 0 }}
  transition={{ duration: 0.45 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Контент рендерим всегда, но визуально скрываем пока splash */}
      <div className={`wrap ${showSplash ? "isHidden" : ""}`}>
        {/* Left / top panel */}
        <div className="top">
          <div className="brand">
            <div className="neonDot" />
            <div>
              <div className="title">Glam Bar</div>
              <div className="subtitle">Бар • Кофе • Атмосфера</div>
            </div>
          </div>

          <div className="searchRow">
            <input
              className="search"
              placeholder="Пошук по меню..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              className={`chip ${hitsOnly ? "chipOn" : ""}`}
              onClick={() => setHitsOnly((v) => !v)}
              type="button"
              title="Показувати лише хіти"
            >
              Хиты
            </button>
          </div>

          {/* маленькая подсказка, чтобы не путало */}
          {isSearchActive && (
            <div className="muted" style={{ marginTop: 8 }}>
              Пошук по всьому меню
            </div>
          )}

          <div className="tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`tab ${tab === t.id ? "tabOn" : ""}`}
                onClick={() => setTab(t.id)}
                type="button"
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
              <div className="empty">Нічого не знайдено.</div>
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
                    {/* MEDIA */}
                    <div className="cardMedia">
                      {imgSrc ? (
                        <img
                          className="cardImg"
                          src={imgSrc}
                          alt={it.name}
                          loading="lazy"
                        />
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
            <span className="muted">Адреса:</span> Одеса •{" "}
            <span className="muted">(Пантелеймонівська 53)</span>
          </div>
          <div className="footLine">
            <span className="muted">Часи роботи:</span> <b>10:00–22:00</b>
          </div>
        </footer>
      </div>
    </div>
  );
}