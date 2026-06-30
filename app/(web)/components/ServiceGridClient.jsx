"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaRegCircleCheck } from "react-icons/fa6";
import styles from "../styles/service.module.css";

const normalizeUrl = (url) => {
  if (typeof url !== "string") return "#";
  const cleaned = url.trim();
  return cleaned ? cleaned : "#";
};

const ServiceGridClient = ({ data = [] }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.18 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {data.map((item, index) => (
        <motion.article key={item?._id || index} className={styles.card} variants={itemVariants} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <div className={styles.cardTop}>
            <div className={styles.iconWrap}>
              <span className={styles.iconBadge}>
                <FaRegCircleCheck />
              </span>
            </div>
            <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{item?.name || "Service"}</h3>
            <p className={styles.cardDescription}>{item?.description || "Information about this service will appear here."}</p>
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.cardMeta}>Official portal service</span>
            <Link href={normalizeUrl(item?.url)} className={styles.cardLink} target={item?.url ? "_blank" : undefined} rel={item?.url ? "noopener noreferrer" : undefined}>
              Open service
            </Link>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default ServiceGridClient;
