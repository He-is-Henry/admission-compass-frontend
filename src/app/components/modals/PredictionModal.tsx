"use client";
import styles from "./modal.module.css";

export default function PredictionModal() {
  return (
    <div
      id="predictionModal"
      className={`${styles.overlay} hidden`}
      role="dialog"
      aria-labelledby="predictionTitle"
      aria-modal="true"
    >
      <div className={`${styles.modal} ${styles.large}`}>
        <button
          className={styles.closeButton}
          aria-label="Close prediction modal"
          // todo: connect to closeModal('predictionModal')
        >
          ✕
        </button>

        <div className={styles.header}>
          <h2 id="predictionTitle">Check Your Admission Chances</h2>
          <p>Enter your details to get personalized predictions</p>
        </div>

        <form className={styles.form}>
          <div className={styles.twoCols}>
            <div>
              <label htmlFor="utmeScore">UTME Score</label>
              <input
                className={styles.input}
                type="number"
                id="utmeScore"
                placeholder="e.g. 280"
                min="0"
                max="400"
                required
              />
              <p className={styles.note}>Enter your UTME score (0–400)</p>
            </div>

            <div>
              <label htmlFor="desiredCourse">Desired Course</label>
              <select className={styles.select} id="desiredCourse" required>
                <option value="">Select Course</option>
                <option>Medicine and Surgery</option>
                <option>Law</option>
                <option>Engineering</option>
                <option>Computer Science</option>
                <option>Accounting</option>
                <option>Economics</option>
                <option>Psychology</option>
              </select>
            </div>
          </div>

          <div>
            <label className={styles.label}>
              O&apos;Level Subjects & Grades
            </label>
            <div className={styles.twoCols}>
              <div className={styles.gradeRow}>
                <select className={styles.select}>
                  <option>Mathematics</option>
                  <option>English Language</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                </select>
                <select className={`${styles.grade} ${styles.select}`}>
                  <option>A1</option>
                  <option>B2</option>
                  <option>B3</option>
                  <option>C4</option>
                  <option>C5</option>
                  <option>C6</option>
                </select>
              </div>

              <div className={styles.gradeRow}>
                <select className={styles.select}>
                  <option>English Language</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                </select>
                <select className={`${styles.grade} ${styles.select}`}>
                  <option>A1</option>
                  <option>B2</option>
                  <option>B3</option>
                  <option>C4</option>
                  <option>C5</option>
                  <option>C6</option>
                </select>
              </div>
            </div>
            <p className={styles.note}>
              Add your most relevant O&apos;Level subjects and grades
            </p>
          </div>

          <div>
            <label htmlFor="preferredUniversity">Preferred University</label>
            <select id="preferredUniversity" className={styles.select} required>
              <option value="">Select University</option>
              <option>University of Lagos (UNILAG)</option>
              <option>University of Ibadan (UI)</option>
              <option>Obafemi Awolowo University (OAU)</option>
              <option>University of Nigeria (UNN)</option>
              <option>Ahmadu Bello University (ABU)</option>
            </select>
          </div>

          <button
            type="button"
            className={styles.primaryBtn}
            aria-label="Get prediction preview"
            // todo: connect to showPreviewResult()
          >
            Get Prediction Preview
          </button>
        </form>
      </div>
    </div>
  );
}

// todo: Add JS to handle show/hide modal, validate fields, and preview result animation
