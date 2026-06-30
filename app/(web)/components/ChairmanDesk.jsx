import Image from "next/image";
import Link from "next/link";
import styles from "../styles/desk.module.css";

async function getData() {
  const res = await fetch(process.env.BACKLINK + "/public/people", {
    headers: {
      "x-api-key": process.env.API_KEY,
      "office-id": process.env.OFFICE,
    },
    next: {
        revalidate: 1000,
      },
  });
  if (!res.ok) {
    return res.statusText;
  }
  return res.json();
}
async function getTitleData() {
  const res = await fetch(process.env.BACKLINK + "/public/headings", {
    headers: {
      "x-api-key": process.env.API_KEY,
      "office-id": process.env.OFFICE,
    },
    next: {
        revalidate: 1000,
      },
  });
  if (!res.ok) {
    return res.statusText;
  }
  return res.json();
}
export default async function ChairmanDesk({ showFullDescription = true }) {
  const deskdata = await getData();
  const titeldata = await getTitleData();
  const data = deskdata?.data;
  const title = titeldata?.data?.people || " Desk";

  return (
    <section className="backimge chairman-section">
      <div className={styles.deskwrpper}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionKicker}>Leadership</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionSubtitle}>
            A refined leadership section with a stronger visual hierarchy, clearer messaging, and a more professional public-service presentation.
          </p>
          <div className={styles.sectionMeta}>
            <span>Public message</span>
            <span>Citizen focused</span>
            <span>Official leadership note</span>
          </div>
        </div>

        {!data?.length && <div className={styles.emptyState}>Chairman desk information is not available right now.</div>}

        {data?.map((person, index) => (
          <article key={index} className={styles.chairmanDesk} aria-labelledby={`chair-${index}`}>
            <div className={styles.imageSection}>
              {person.image ? (
                <div className={styles.imageFrame}>
                  <Image
                    src={`${process.env.BACKPUBLIC}/${person.image?.slice(7)}`}
                    alt={person.name || "Portrait"}
                    width={420}
                    height={520}
                    className={styles.portrait}
                  />
                  <div className={styles.imageBadge}>
                    <span>{person.designation || "Chairman"}</span>
                    <strong>{person.name}</strong>
                  </div>
                </div>
              ) : (
                <div className={styles.portraitPlaceholder}>No image</div>
              )}
            </div>

            <div className={styles.personMeta}>
              <span className={styles.nameTag}>{person.designation || "Chairman"}</span>
              <h3 id={`chair-${index}`} className={styles.personName}>{person.name}</h3>
              <p className={styles.personLead}>
                {person.designation || "Chairman"} {person.name ? `, ${person.name}` : ""}
              </p>

              <div className={styles.quoteBlock}>
                <span className={styles.quoteMark}>“</span>
                <p className={styles.deskDetails}>
                  {showFullDescription ? person.about : `${person.about?.slice(0, 450) || ""}${person.about?.length > 450 ? "..." : ""}`}
                </p>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <span>Community</span>
                  <strong>Service-first leadership</strong>
                </div>
                <div className={styles.infoCard}>
                  <span>Focus</span>
                  <strong>Transparent governance</strong>
                </div>
              </div>

              <div className={styles.metaFooter}>
                <div className={styles.featureRow}>
                  <span className={styles.featureChip}>Public Leadership</span>
                  <span className={styles.featureChip}>Citizen Message</span>
                </div>

                <div className={styles.contactButtons}>
                  <Link href="/Desk" className={styles.btnOutline}>Read More</Link>
                  <Link href="/contact" className={styles.btnPrimary}>Contact Office</Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
