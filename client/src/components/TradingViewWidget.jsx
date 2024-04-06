import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget(props) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
    {
      "autosize": true,
      "symbol": "${props.symbol}",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    }`;

    // Remove any existing script with the same ID before appending
    const existingScript = document.getElementById("tradingview-widget-script");
    if (existingScript) {
      existingScript.remove();
    }

    container.current.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (script) {
        script.remove();
      }
    };
  }, [props.symbol]);

  return (
    <div className="tradingview-widget-container w-full h-full" ref={container}>
      <div
        className="tradingview-widget-container__widget"
        style={{ height:"100%" , width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        ></a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
