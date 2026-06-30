import styles from "../styles/StatsCard.module.css";
import StatsCardGrid from "../components/StatsCardGrid";

async function getCountData() {
  try {
    const officeResponse = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      next: {
        revalidate: 1000,
      },
    });
    if (!officeResponse.ok) {
      return [];
    }

    const officeData = await officeResponse.json();
    const isActive = officeData.data?.enabled_services?.includes("counter");

    if (!isActive) return [];

    const res = await fetch(`${process.env.BACKLINK}/public/counter`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      next: {
        revalidate: 1000,
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch notice data: ${res.statusText}`);
      return [];
    }

    const payload = await res.json();
    return Array.isArray(payload?.data?.counter) ? payload.data.counter : [];
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

export default async function StatsCard() {
  const data = await getCountData();
  const metrics = Array.isArray(data) ? data.slice(0, 6) : [];

  return (
    <section className={styles.section} aria-labelledby="stats-title">
      <div className={styles.sectionGlow} aria-hidden="true" />

      <div className={styles.headerShell}>
        <div className={styles.headerCopy}>
          <span className={styles.kicker}>Performance snapshot</span>
          <h2 id="stats-title" className={styles.title}>
            Civic progress at a glance
          </h2>
          <p className={styles.subtitle}>
            Key public counters arranged in a cleaner dashboard format for quick review by residents and officials.
          </p>
          <div className={styles.metaPills}>
            <span>Live counters</span>
            <span>One-time animation</span>
            <span>Official figures</span>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <span>Live metrics</span>
          <strong>{metrics.length || 0}</strong>
          <small>Visible counter items</small>
        </div>
      </div>

      {metrics.length ? (
        <StatsCardGrid metrics={metrics} />
      ) : (
        <div className={styles.emptyState}>
          <span>Metrics unavailable</span>
          <h3>No counter data is published right now.</h3>
          <p>The section is ready and will automatically populate when the office publishes new counters.</p>
        </div>
      )}
    </section>
  );
}
