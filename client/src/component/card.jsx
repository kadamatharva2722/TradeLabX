import { useEffect, useState } from "react";
import style from "./card.module.css";

function CardDiv() {
  const [index, setIndex] = useState(0);

  const cards = [
    {
      title: "Trade Entry",
      desc: "Record trades including dates, pairs, setups and results",
    },
    {
      title: "Performance Tracking",
      desc: "Analyze trading statistics, win rates, profit/loss",
    },
    {
      title: "Risk Management",
      desc: "Monitor risk through position sizes and outcomes",
    },
    {
      title: "Insights & Analytics",
      desc: "Improve our strategies with detailed reports and data visualiz",
    },
  ];

  useEffect(() => {
    if (window.innerWidth > 600) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.alignCard}>
      <div
        className={style.sliderTrack}
        style={{
          transform:
            window.innerWidth <= 600
              ? `translateX(-${index * 100}%)`
              : "none",
        }}
      >
        {cards.map((item, i) => (
          <div className={style.slide} key={i}>
            <div className={style.ccard}>
              <p className={style.headerofcard}>{item.title}</p>
              <p className={style.content}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardDiv;
