import styles from "./privacypolicy.module.css";
export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Admission Compass LTD</strong>
      </p>

      <div className={styles.section}>
        <h2>Introduction</h2>
        <p>
          Admission Compass (“we,” “our,” or “us”) is a data-driven educational
          platform designed to help students make informed university admission
          decisions.
        </p>

        <p>
          This Privacy Policy explains how we collect, use, store, protect, and
          share your personal data.
        </p>

        <p className={styles.highlight}>
          By using our platform, you agree to this policy.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Data Processing Principles</h2>
        <ul>
          <li>
            <strong>Lawfulness & Transparency:</strong> We process data fairly
            and openly.
          </li>
          <li>
            <strong>Purpose Limitation:</strong> Data is collected only for
            specific purposes.
          </li>
          <li>
            <strong>Data Minimization:</strong> Only necessary data is
            collected.
          </li>
          <li>
            <strong>Accuracy:</strong> We keep data up-to-date.
          </li>
          <li>
            <strong>Storage Limitation:</strong> Data is not kept longer than
            needed.
          </li>
          <li>
            <strong>Security:</strong> We protect your data from unauthorized
            access.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Data We Collect</h2>

        <h3>Personal Information</h3>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number (optional)</li>
        </ul>

        <h3>Academic Information</h3>
        <ul>
          <li>UTME scores</li>
          <li>O’level results</li>
          <li>Course & school preferences</li>
        </ul>

        <h3>Usage Data</h3>
        <ul>
          <li>Pages visited</li>
          <li>Features used</li>
          <li>Time spent</li>
        </ul>

        <h3>Technical Data</h3>
        <ul>
          <li>IP address</li>
          <li>Device type</li>
          <li>Browser information</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How We Use Your Data</h2>

        <ul>
          <li>Provide admission predictions</li>
          <li>Improve platform performance</li>
          <li>Manage your account</li>
          <li>Send updates and notifications</li>
          <li>Process payments</li>
          <li>Ensure security</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Legal Basis for Processing</h2>

        <ul>
          <li>Consent</li>
          <li>Contract performance</li>
          <li>Legal obligations</li>
          <li>Legitimate interests</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How We Share Your Data</h2>

        <ul>
          <li>Cloud providers (hosting)</li>
          <li>Payment processors (e.g., Paystack)</li>
          <li>Analytics tools</li>
          <li>Legal authorities when required</li>
        </ul>

        <p>We do NOT sell your personal data.</p>
      </div>

      <div className={styles.section}>
        <h2>Data Retention</h2>

        <ul>
          <li>Accounts: Until deleted or inactive</li>
          <li>Transactions: Minimum 3 years</li>
          <li>Logs: 6–18 months</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Security Measures</h2>

        <ul>
          <li>Encryption (in transit & at rest)</li>
          <li>Secure cloud infrastructure</li>
          <li>Access control & authentication</li>
          <li>Security monitoring</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Children’s Data</h2>

        <p>Users under 18 must use the platform with parental consent.</p>

        <ul>
          <li>No targeted advertising to children</li>
          <li>Extra protection measures applied</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Your Rights</h2>

        <ul>
          <li>Access your data</li>
          <li>Correct your data</li>
          <li>Delete your data</li>
          <li>Withdraw consent</li>
          <li>Data portability</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Cookies</h2>
        <p>We use cookies to improve your experience and analyze usage.</p>
      </div>

      <div className={styles.section}>
        <h2>Contact Information</h2>

        <div className="contact-box">
          <p>
            <strong>Admission Compass LTD</strong>
          </p>
          <p>Email: admissioncompass.official@gmail.com</p>
          <p>Phone: (+234) 9064311029</p>

          <br />

          <p>
            <strong>Data Protection Officer</strong>
          </p>
          <p>Email: privacy@admissioncompass.org</p>

          <br />

          <p>
            <strong>Regulator</strong>
          </p>
          <p>Nigeria Data Protection Commission (NDPC)</p>
          <p>https://ndpc.gov.ng</p>
        </div>
      </div>
    </div>
  );
}
