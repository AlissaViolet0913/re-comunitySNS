import React, { useEffect, useState } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { default as LogSt } from "./components/cookie/logSt";
import styles from "./styles/index.module.css";
import PersonalPost from "./components/post/personalPost/personalPost";
import BelongIsland from "./components/post/belongIsland/belongIsland";
import BelongEvent from "./components/post/belongEvent/belongEvent";
import { Link } from "react-router-dom";
import { fetchIslands } from "./components/index/fetchIslands";
import { fetchEvents } from "./components/index/fetchEvents";
import { render } from "@testing-library/react";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
reportWebVitals();

export default function Index() {
  LogSt();

  const [islands, setIslands] = useState([]);
  const [events, setEvents] = useState([]);
  const [tag, setTag] = useState("islands");
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    fetchIslands(setIslands);
    fetchEvents(setEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 島とイベント表示タブ切り替え
  const changeTagHandler = (selectedTag) => {
    setTag(selectedTag);
  };

  return (
    <div className={styles.all}>
      <img
        className={styles.img}
        id="img"
        src="/images/bgA.png"
        alt="Thumbnail"
      ></img>
      {/* ロゴ */}
      <div className={styles.displayAll}>
        <div className={styles.onImg}>
          <img
            src="/images/logo.png"
            className={styles.logo}
            alt="Island Thumbnail"
          />

          <div className={styles.information}>
            <h3 className={styles.news}>お知らせ</h3>
            <PersonalPost
              hasNewMessage={hasNewMessage}
              setHasNewMessage={setHasNewMessage}
            />
            <BelongIsland />
            <BelongEvent />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.tabs}>
            <button
              className={`${tag === "islands" ? styles.active : ""} ${
                styles.buttonA
              }`}
              onClick={() => changeTagHandler("islands")}
            >
              おすすめ島
            </button>
            <button
              className={`${tag === "events" ? styles.active : ""} ${
                styles.buttonB
              }`}
              onClick={() => changeTagHandler("events")}
              name="新着イベント"
              data-testid="newEvent"
            >
              新着イベント
            </button>
          </div>
          <div className={styles.down}>
            {tag === "islands" && (
              <div className={styles.islands}>
                {islands.slice(0, 5).map((island) => (
                  <div key={island.id} className={styles.island}>
                    <Link to={`/island/${island.id}`} className={styles.link}>
                      <img
                        className={styles.icon}
                        src={island.thumbnail || "/images/island.png"}
                        alt="Event Thumbnail"
                      />
                      <h3 className={styles.islandName}>{island.islandName}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {tag === "events" && (
              <div>
                <div className={styles.events}>
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className={styles.event}>
                      <Link
                        to={`/event/${event.id}`}
                        className={styles.link}
                        data-testid="eventLink"
                      >
                        <img
                          className={styles.iconB}
                          src={event.thumbnail || "/images/event.png"}
                          alt="Event Thumbnail"
                        />
                        <h3 className={styles.eventName}>{event.eventName}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.wave}>
        {/* 画像描画 */}
        <svg
          className={styles.waves}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={styles.move}>
            {/* useタグ：svgの使い回し（特に色違いの場合に使用）、アニメーション */}
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgb(0, 151, 194, 0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgb(0, 171, 199, 0.9)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
