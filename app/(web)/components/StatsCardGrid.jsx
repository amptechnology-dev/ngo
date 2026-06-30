"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "../styles/StatsCard.module.css";

const formatMetric = (value) => {
  if (value === null || value === undefined || value === "") return "0";

  const numericValue = Number(String(value).replace(/,/g, "").trim());
  if (!Number.isFinite(numericValue)) return String(value);

  return new Intl.NumberFormat("en-US").format(numericValue);
};

const AnimatedMetric = ({ value, active }) => {
  const targetValue = useMemo(() => {
    const parsed = Number(String(value).replace(/,/g, "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  }, [value]);

  const [displayValue, setDisplayValue] = useState(targetValue ?? 0);

  useEffect(() => {
    if (!active || targetValue === null) {
      setDisplayValue(targetValue ?? 0);
      return;
    }

    let frameId;
    const startTime = performance.now();
    const duration = 1400;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(targetValue * easing));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    setDisplayValue(0);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [active, targetValue]);

  return <>{targetValue === null ? formatMetric(value) : new Intl.NumberFormat("en-US").format(displayValue)}</>;
};

const StatsCardGrid = ({ metrics = [] }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const shouldAnimate = inView;

  return (
    <div ref={ref} className={styles.grid}>
      {metrics.map((item, index) => (
        <article key={item?._id || index} className={styles.card}>
          <div className={styles.cardTop}>
            <span className={styles.icon}>📊</span>
            <span className={styles.index}>0{index + 1}</span>
          </div>
          <div className={styles.metricValue} aria-label={`Metric value ${formatMetric(item?.value ?? 0)}`}>
            <AnimatedMetric value={item?.value ?? 0} active={shouldAnimate} />
          </div>
          <p className={styles.description}>{item?.text || "Public metric"}</p>
        </article>
      ))}
    </div>
  );
};

export default StatsCardGrid;