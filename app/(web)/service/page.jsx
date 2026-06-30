import ServiceGridClient from "../components/ServiceGridClient";
import styles from "../styles/service.module.css";

async function getData() {
  try {
    const officeResponse = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      next: {
        revalidate: 3000,
      },
    });
    if (!officeResponse.ok) return null;

    const officeData = await officeResponse.json();
    const isActive = officeData.data?.enabled_services?.includes("service");

    if (!isActive) return null;

    const res = await fetch(`${process.env.BACKLINK}/public/service`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      next: {
        revalidate: 1000,
      },
    });

    if (!res.ok) {
      return console.error(`Failed to fetch service data: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

export default async function ServiceGrid() {
  const data = await getData();
  const services = Array.isArray(data?.data) ? data.data : [];

  if (!services.length) return null;

  return (
    <section id="services" className={styles.section}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.containerWrap}>
        <div className={styles.header}>
          <span className={styles.kicker}>What We Offer</span>
          <h2 className={styles.title}>Services</h2>
          <p className={styles.subtitle}>
            A clean, modern collection of public services presented with a staggered reveal for a more refined browsing experience.
          </p>
          <div className={styles.metaRow}>
            <span>Official portal</span>
            <span>Animated cards</span>
            <span>Easy access</span>
          </div>
        </div>

        <ServiceGridClient data={services} />
      </div>
    </section>
  );
}
