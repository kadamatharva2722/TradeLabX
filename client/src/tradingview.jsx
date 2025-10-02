import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    if (!container.current) return;

    // Clear previous script if any (prevents double render in dev)
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `{
      "symbols": [
        { "proName": "FOREXCOM:NSXUSD", "title": "US 100 Cash CFD" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
        { "proName": "NSE:NIFTY", "title": "Nifty" },
        { "proName": "NSE:BANKNIFTY", "title": "Banknifty" },
        { "proName": "CAPITALCOM:GOLD", "title": "Gold" },
        { "proName": "NSE:BHEL", "title": "Bhel" },
        { "proName": "PYTH:WTI3!", "title": "Crude oil" },
        { "proName": "PEPPERSTONE:USDINR", "title": "USDINR" }
      ],
      "colorTheme": "dark",
      "locale": "en",
      "showSymbolLogo": true,
      "displayMode": "adaptive"
    }`;

    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

// memo prevents unnecessary re-renders when parent updates
export default memo(TradingViewWidget);
