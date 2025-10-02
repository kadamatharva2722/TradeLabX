// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

export function BitCoin() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "BITSTAMP:BTCUSD",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCUSD/?exchange=BITSTAMP" rel="noopener nofollow" target="_blank"><span className="blue-text">Bitcoin price</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

// TradingViewWidget.jsx

export function Nifty() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "NSE:NIFTY",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NSE-NIFTY/" rel="noopener nofollow" target="_blank"><span className="blue-text">NIFTY quote</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

// TradingViewWidget.jsx

export function BankNifty() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "NSE:BANKNIFTY",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NSE-BANKNIFTY/" rel="noopener nofollow" target="_blank"><span className="blue-text">BANKNIFTY quote</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

// TradingViewWidget.jsx

export function Gold() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "CAPITALCOM:GOLD",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/CAPITALCOM-GOLD/" rel="noopener nofollow" target="_blank"><span className="blue-text">GOLD quote</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}


// TradingViewWidget.jsx
export function Bhel() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "NSE:BHEL",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NSE-BHEL/" rel="noopener nofollow" target="_blank"><span className="blue-text">BHEL stock price</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}


// TradingViewWidget.jsx

export function CrudeOil() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "PYTH:WTI3!",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/PYTH-WTI3!/" rel="noopener nofollow" target="_blank"><span className="blue-text">WTI3! quote</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}


// TradingViewWidget.jsx

export function UsdInr() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "PEPPERSTONE:USDINR",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/USDINR/?exchange=PEPPERSTONE" rel="noopener nofollow" target="_blank"><span className="blue-text">USDINR rate</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

// TradingViewWidget.jsx

export function Eth() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "BITSTAMP:ETHUSD",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/ETHUSD/?exchange=BITSTAMP" rel="noopener nofollow" target="_blank"><span className="blue-text">Ethereum price</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}



// TradingViewWidget.jsx

export function Btc() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "BITSTAMP:BTCUSD",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCUSD/?exchange=BITSTAMP" rel="noopener nofollow" target="_blank"><span className="blue-text">Bitcoin price</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}


// TradingViewWidget.jsx

function Nasdaq() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "IG:NASDAQ",
          "chartOnly": false,
          "dateRange": "1D",
          "noTimeScale": false,
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "autosize": true,
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/IG-NASDAQ/" rel="noopener nofollow" target="_blank"><span className="blue-text">NASDAQ quote</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

