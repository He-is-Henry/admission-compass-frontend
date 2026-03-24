import styles from "./privacy-policy.module.css";
export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.heading}>Privacy Policy</h1>
        <h1 className={styles.heading}>
          <strong>Admission Compass LTD</strong>
        </h1>

        <h2 className={styles.heading}>A. Introduction</h2>
        <p className={styles.text}>
          <strong>Admission Compass</strong> (“we,” “our,” or “us”) is a
          data-driven educational technology platform designed to help students
          make informed decisions about university admissions. We provide
          personalized admission predictions, school recommendations, past
          question access, and other guidance tools based on the academic
          information students share with us. This Privacy Policy explains{" "}
          <strong>
            how we collect, use, store, protect, and share your personal
            information
          </strong>{" "}
          when you use any of our services, whether through our mobile
          application, website, communication channels, or any associated
          digital platform.
        </p>

        <p>Our goal is transparency. We want you to clearly understand:</p>
        <ul className={styles.text}>
          <li>
            <strong>What personal data we collect</strong>
          </li>
          <li>
            <strong>Why we collect it</strong>
          </li>
          <li>
            <strong>How we process and protect it</strong>
          </li>
          <li>
            <strong>Your rights and choices</strong> under the Nigeria Data
            Protection Regulation (NDPR) and Nigeria Data Protection Act (NDPA)
          </li>
          <li>
            <strong>How to contact us</strong> if you have questions or wish to
            exercise your rights
          </li>
        </ul>

        <p className={styles.highlight}>
          By accessing or using <strong>Admission Compass</strong>, you
          acknowledge that you have read and understood this Privacy Policy. If
          you do not agree with any part of this Policy, please discontinue use
          of our services.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Data Processing Principles</h2>
        <p className={styles.text}>
          We process personal data in accordance with the principles set out
          under the Nigeria Data Protection Regulation (NDPR) and the Nigeria
          Data Protection Act (NDPA). These principles include:
        </p>
        <ul>
          <li>
            <strong>Lawfulness & Transparency:</strong> We process personal data
            lawfully, fairly, and in a transparent manner. We ensure that
            individuals are informed about how their data is collected and used.
          </li>
          <li>
            <strong>Purpose Limitation:</strong> Personal data is collected for
            specified, explicit, and legitimate purposes and is not further
            processed in a manner incompatible with those purposes.
          </li>
          <li>
            <strong>Data Minimization:</strong> We only collect personal data
            that is adequate, relevant, and limited to what is necessary for the
            purposes for which it is processed.
          </li>
          <li>
            <strong>Accuracy:</strong> We take reasonable steps to ensure that
            personal data is accurate and kept up to date. Users are encouraged
            to update their information where necessary.
          </li>
          <li>
            <strong>Storage Limitation:</strong> Personal data is retained only
            for as long as necessary to fulfill the purposes for which it was
            collected, or as required by applicable laws.
          </li>
          <li>
            <strong>Integrity and Confidentiality (Security):</strong> We
            implement appropriate technical and organizational measures to
            protect personal data against unauthorized access, loss, misuse, or
            disclosure.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}> C. Data We Collect</h2>
        <p className={styles.text}>
          To provide accurate admission predictions, recommendations, and
          personalized services, <strong>Admission Compass</strong> collects
          different types of information. We only collect data that is relevant,
          necessary, and lawful under the Nigeria Data Protection Regulation
          (NDPR) and Nigeria Data Protection Act (NDPA). Below is a breakdown of
          the categories of data we collect:
        </p>

        <h3 className={styles.heading}>Personal Identification Information</h3>
        <p className={styles.text}>
          Information that helps us identify or contact you, such as:
        </p>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number (optional)</li>
          <li>Account login details</li>
        </ul>
        <p className={styles.text}>
          This information is required to create and maintain your account and
          communicate with you.
        </p>

        <h3 className={styles.heading}>
          Academic & Admission-Related Information
        </h3>
        <p className={styles.text}>
          Since our platform provides predictions and guidance, we collect
          academic data including:
        </p>
        <ul>
          <li>UTME scores</li>
          <li>Post-UTME / Screening scores</li>
          <li>O’level grades (WAEC/NECO/GCE)</li>
          <li>Subjects taken</li>
          <li>Course choices and preferred institutions</li>
          <li>Number of exam sittings</li>
          <li>Previous admission attempts (optional)</li>
        </ul>
        <p className={styles.text}>
          This information powers your personalized admission probability,
          alternative recommendations, academic insights, and downloadable
          reports.
        </p>

        <h3 className={styles.heading}>Usage Data</h3>
        <p className={styles.text}>
          Data about how you interact with our platform, including:
        </p>
        <ul>
          <li>Pages visited</li>
          <li>Features used (predictions, past questions, reports, tokens)</li>
          <li>Time spent on the platform</li>
          <li>Buttons clicked and actions taken</li>
          <li>Tokens purchase and wallet activity</li>
          <li>Referal activity and rewards</li>
        </ul>
        <p className={styles.text}>
          This helps us understand user behaviour and improve your experience.
        </p>

        <h3 className={styles.heading}>Technical Data</h3>
        <p className={styles.text}></p>
        <ul>
          <li>IP address</li>
          <li>Device type and model</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>App version</li>
          <li>Unique device identifiers</li>
          <li>Log files and diagnostic information</li>
          <li>Cookies, pixels, and tracking technology</li>
        </ul>
        <p className={styles.text}>
          This data helps with security, performance optimization, fraud
          prevention, and effective service delivery.
        </p>

        <h3 className={styles.heading}>Payment & Transaction Information</h3>
        <p className={styles.text}>
          When you purchase tokens or premium services, we may collect:
        </p>
        <ul>
          <li>Payment confirmations</li>
          <li>Transaction timestamps</li>
          <li>Wallet credit/debits</li>
          <li>
            Payment method details (processed securely by third-party providers,
            we do not store card details)
          </li>
        </ul>
        <p className={styles.text}>
          This ensures secure payments and accurate token management.
        </p>

        <h3 className={styles.heading}>Communication Data</h3>
        <p className={styles.text}>Any data shared through: </p>
        <ul>
          <li>Customer support messages</li>
          <li>Email inquiries</li>
          <li>WhatsApp or in-app chat</li>
          <li>Feedback, reviews, or surveys</li>
        </ul>
        <p className={styles.text}>
          These help us respond to your requests and improve our services.
        </p>

        <h3 className={styles.heading}>Optional or Sensitive Information</h3>
        <p className={styles.text}>
          We only collect sensitive data{" "}
          <strong>with your explicit consent</strong>, such as:
        </p>
        <ul>
          <li>Additional academic documents uploaded</li>
          <li>Any other personal information voluntarily submitted by you</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}> D. How We Use Your Data</h2>
        <p className={styles.text}>
          We use the information we collect to deliver accurate predictions,
          improve your experience, maintain platform security, and operate in
          compliance with Nigerian data protection laws. Admission Compass
          processes your data{" "}
          <strong>strictly for legitimate, clearly defined purposes</strong>.
          Below are the key ways we use your information:
        </p>
        <ul>
          <h3 className={styles.heading}>
            To Provide Admission Predictions & Recommendations
          </h3>
          <p className={styles.text}>
            We use your UTME scores, O’level grades, course preferences, and
            related academic data to:
          </p>
          <li>Calculate admission probability scores</li>
          <li>Generate personalized recommendations for schools and courses</li>
          <li>Produce downloadable guidance reports</li>
          <li>Suggest alternative institutions based on your profile</li>
          <p className={styles.text}>
            These features depend entirely on accurate data inputs from you.
          </p>
        </ul>

        <h3 className={styles.heading}>
          To Operate, Maintain & Improve the Platform
        </h3>
        <p className={styles.text}>We use your device and usage data to:</p>
        <ul>
          <li>Keep the platform functional and secure</li>
          <li>Diagnose technical issues</li>
          <li>Optimize performance and load times</li>
          <li>Analyze how features are used</li>
          <li>Improve prediction accuracy and user experience</li>
        </ul>
        <p className={styles.text}>
          This helps us build a smarter, more reliable system over time
        </p>

        <h3 className={styles.heading}>To Manage Your Account</h3>
        <p className={styles.text}>Your personal information allows us to:</p>
        <ul>
          <li>Create and authenticate your account</li>
          <li>Track token purchases and wallet balances</li>
          <li>Save your prediction history</li>
          <li>Synchronize your activity across devices</li>
          <li>Maintain account settings</li>
        </ul>

        <h3 className={styles.heading}>For Communication & Support</h3>
        <p className={styles.text}>We use your contact information to:</p>
        <ul>
          <li>Send confirmation messages</li>
          <li>Respond to customer support inquiries</li>
          <li>Notify you about updates or new features</li>
          <li>Send important legal or policy notices</li>
          <li>
            Provide reminders about predictions, cut-off changes, or recommended
            improvements
          </li>
        </ul>
        <p className={styles.text}>
          All communications respect your notification preferences.
        </p>

        <h3 className={styles.heading}>For Payment Processing</h3>
        <p className={styles.text}>
          When you purchase tokens or premium features, we use transaction data
          to:
        </p>
        <ul>
          <li>Confirm payments</li>
          <li>Deliver purchased tokens</li>
          <li>Prevent fraud or unauthorized transactions</li>
        </ul>
        <p className={styles.text}>
          (We do <strong>not</strong> store your card or bank details; payments
          are handled by secure third-party providers.)
        </p>

        <h3 className={styles.heading}>
          For Research, Analytics & Product Development
        </h3>
        <p className={styles.text}>We analyze aggregated, anonymous data to:</p>
        <ul>
          <li>Improve algorithm accuracy</li>
          <li>Identify trends in student admissions</li>
          <li>Enhance model fairness and transparency</li>
          <li>Develop new features or services</li>
        </ul>
        <p className={styles.text}>
          Your personal identity is never revealed in these analyses.
        </p>

        <h3 className={styles.heading}>To Ensure Security & Prevent Misuse</h3>
        <p className={styles.text}>
          We process technical and behavioral data to:
        </p>
        <ul>
          <li>Detect and prevent fraudulent activities</li>
          <li>Protect accounts from unauthorized access</li>
          <li>Maintain the integrity of our prediction models</li>
          <li>Enforce platform policies and prevent abuse</li>
        </ul>

        <h3 className={styles.heading}>To Comply with Legal Obligations</h3>
        <p className={styles.text}>We may use your data to:</p>
        <ul>
          <li>Respond to lawful requests from regulatory authorities</li>
          <li>
            Fulfill obligations under NDPR and the Nigeria Data Protection Act
            (NDPA)Maintain records required by Nigerian law
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>
          E. LEGAL BASIS FOR PROCESSING YOUR DATA
        </h2>

        <p className={styles.text}>
          Admission Compass processes personal data in accordance with the{" "}
          <strong>Nigeria Data Protection Regulation (NDPR)</strong> and the{" "}
          <strong>Nigeria Data Protection Act (NDPA)</strong>. We only process
          your information when there is a lawful and legitimate basis to do so.
        </p>

        <p className={styles.text}>
          <strong>
            Below are the legal grounds under which we process your data:
          </strong>
        </p>

        <h3 className={styles.heading}>Your Consent</h3>
        <p className={styles.text}>
          Consent means a freely given, specific, informed and unambiguous
          agreement allowing the company to collect, process, or share personal
          information.
        </p>

        <p className={styles.text}>
          <strong>We rely on your consent when you:</strong>
        </p>
        <ul className={styles.text}>
          <li>Create an account</li>
          <li>
            Provide academic information (UTME scores, O’level grades, screening
            data, etc.)
          </li>
          <li>Use prediction and recommendation features</li>
          <li>Choose to receive notifications or updates</li>
          <li>Submit optional or sensitive information</li>
        </ul>

        <p className={styles.text}>
          You may withdraw your consent at any time, although this may limit
          your ability to use some features.
        </p>

        <h3 className={styles.heading}>Performance of a Contract</h3>
        <p className={styles.text}>
          Certain processing is necessary to provide you with the services you
          signed up for.
        </p>
        <ul className={styles.text}>
          <li>Generating admission predictions</li>
          <li>Giving course and school recommendations</li>
          <li>Maintaining your account and wallet</li>
          <li>Delivering purchased tokens and premium features</li>
        </ul>

        <p className={styles.text}>
          Without this data, we cannot offer core platform functions.
        </p>

        <h3 className={styles.heading}>Compliance with Legal Obligations</h3>
        <p className={styles.text}>We process certain information to:</p>
        <ul className={styles.text}>
          <li>Meet regulatory and statutory requirements</li>
          <li>Maintain records as required under Nigerian law</li>
          <li>Respond to lawful government requests</li>
          <li>Fulfill NDPR/NDPA compliance duties</li>
        </ul>

        <h3 className={styles.heading}>Legitimate Interests</h3>
        <p className={styles.text}>
          We may process data when it is necessary for our legitimate business
          interest, <strong>and does not override your rights</strong>, such as:
        </p>
        <ul className={styles.text}>
          <li>Improving prediction accuracy</li>
          <li>Enhancing user experience</li>
          <li>Preventing fraud and unauthorized platform usage</li>
          <li>Conducting analytics, research, and product development</li>
          <li>Ensuring network and information security</li>
        </ul>

        <p className={styles.text}>
          We always evaluate whether such interests are balanced with your
          privacy rights.
        </p>

        <h3 className={styles.heading}>
          Public Interest or Protection of Vital Interests
        </h3>
        <p className={styles.text}>In rare cases, we may process data to:</p>
        <ul className={styles.text}>
          <li>Protect users from security threats</li>
          <li>Prevent fraud affecting multiple users</li>
          <li>Ensure platform safety and integrity</li>
        </ul>
        <p className={styles.text}>
          This basis is used only when strictly necessary.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}> F. HOW WE SHARE YOUR DATA</h2>

        <p className={styles.text}>
          Admission Compass does <strong>not</strong> sell your personal
          information. We only share data when necessary to deliver services,
          comply with the law, or protect the platform. When sharing is
          required, we ensure that all third parties meet the standards of the
          NDPR, the Nigeria Data Protection Act (NDPA), and other applicable
          laws. Below are the situations where your data may be shared:
        </p>

        <h3 className={styles.heading}>Service Providers (Processors)</h3>
        <p className={styles.text}>
          We engage trusted third-party service providers (“Data Processors”) to
          support the operation, security, and improvement of Admission Compass.
          These providers process personal data strictly on our behalf and only
          for the purposes outlined in this Privacy Policy.
        </p>

        <p className={styles.subText}>Categories of Service Providers</p>
        <ul className={styles.text}>
          <li>
            <strong>Cloud Hosting Providers:</strong> Vercel, Render – to host
            and store application data securely
          </li>
          <li>
            <strong>Payment Processors:</strong> Paystack – to process
            transactions and manage payments
          </li>
          <li>
            <strong>Analytics Services:</strong> (e.g., Google Analytics) – to
            understand user behavior and improve platform performance
          </li>
          <li>
            <strong>Email & Communication Services:</strong> (e.g., Resend or
            similar providers) – to send notifications, updates, and support
            messages
          </li>
          <li>
            <strong>Security & Infrastructure Tools:</strong> To ensure system
            integrity, prevent fraud, and maintain platform reliability
          </li>
        </ul>

        <p className={styles.subText}>Data Shared with Third Parties</p>
        <div>
          <p className={styles.text}>
            We only share data that is necessary for the specific service being
            performed, including:
          </p>

          <ul className={styles.text}>
            <li>
              <strong>Payment Providers (e.g., Paystack):</strong> Email
              address, transaction amount, and transaction ID
            </li>
            <li>
              <strong>Analytics Providers (e.g., Google Analytics):</strong>{" "}
              Device information, IP address, and usage behavior (such as pages
              visited and interactions)
            </li>
            <li>
              <strong>Hosting Providers (e.g., Vercel, Render):</strong>{" "}
              Personal and academic data stored on our platform, solely for
              secure storage, processing, and system functionality
            </li>
          </ul>

          <p className={styles.text}>
            These providers do not have the right to use your data for their own
            independent purposes.
          </p>

          <h3 className={styles.heading}>International Data Transfers</h3>

          <p className={styles.text}>
            Some of our service providers operate outside Nigeria. As a result,
            your personal data may be transferred to and processed in countries
            with different data protection laws.
          </p>

          <p className={styles.text}>
            Where such transfers occur, we ensure that appropriate safeguards
            are in place, including:
          </p>

          <ul className={styles.text}>
            <li>
              Use of secure data transmission protocols (e.g., HTTPS encryption)
            </li>
            <li>
              Reliance on reputable service providers with established data
              protection and security standardsAl
            </li>
            <li>
              Contractual obligations requiring data protection and
              confidentiality
            </li>
          </ul>

          <h3 className={styles.heading}>
            Data Protection & Security Obligations
          </h3>

          <p className={styles.text}>
            All third-party service providers are required to:
          </p>

          <ul className={styles.text}>
            <li>Process data only on our instructions</li>
            <li>Maintain strict confidentiality</li>
            <li>
              Implement appropriate technical and organizational security
              measures
            </li>
            <li>Comply with applicable data protection laws</li>
          </ul>

          <p className={styles.text}>
            We rely on their standard contractual terms and data protection
            commitments to ensure compliance with the Nigeria Data Protection
            Regulation (NDPR) and Nigeria Data Protection Act (NDPA).
          </p>

          <h3 className={styles.heading}>User Awareness and Control</h3>

          <p className={styles.text}>
            By using our platform, you acknowledge that your data may be
            processed by third-party providers as described in this Policy.
          </p>

          <p className={styles.text}>
            Where required, we provide clear information about such processing,
            and you may exercise your data rights at any time, including
            requesting deletion or restriction of your data.
          </p>

          <h3 className={styles.heading}>Technical & Development Partners</h3>

          <p className={styles.text}>
            To maintain and improve our prediction models, developers and data
            analysts may access:
          </p>

          <ul className={styles.text}>
            <li>Diagnostic reports</li>
            <li>Anonymized usage data</li>
            <li>Error logs</li>
            <li>System performance metrics</li>
          </ul>

          <p className={styles.text}>
            Access to identifiable personal data is restricted and only granted
            when absolutely necessary under strict confidentiality obligations.
          </p>

          <h3 className={styles.heading}>
            Schools, Tutorial Centers, and Institutional Partners (Optional)
          </h3>

          <p className={styles.text}>
            When you opt in or provide clear consent, we may share:
          </p>

          <ul className={styles.text}>
            <li>Summary reports</li>
            <li>Performance insights</li>
            <li>Prediction results</li>
            <li>Admission readiness evaluations</li>
          </ul>

          <p className={styles.text}>This is typically done when:</p>

          <ul className={styles.text}>
            <li>You participate in school-based programs</li>
            <li>You use referral or scholarship programs</li>
            <li>You access admission support through a partner institution</li>
          </ul>

          <p className={styles.text}>
            We never share your personal academic data (scores, grades,
            documents) with institutions without your explicit permission.
          </p>

          <h3 className={styles.heading}>Legal and Regulatory Authorities</h3>

          <p className={styles.text}>
            We may disclose your information if required to:
          </p>

          <ul className={styles.text}>
            <li>Respond to lawful government or regulatory requests</li>
            <li>Comply with court orders or legal obligations</li>
            <li>
              Assist with investigations relating to fraud, cybersecurity
              threats, or misuse of the platform
            </li>
          </ul>

          <p className={styles.text}>
            We only provide the minimum data necessary in these situations.
          </p>

          <h3 className={styles.heading}>Business Transfers</h3>

          <p className={styles.text}>If Admission Compass undergoes:</p>

          <ul className={styles.text}>
            <li>A merger</li>
            <li>Acquisition</li>
            <li>Investment due diligence</li>
            <li>Asset transfer</li>
            <li>Corporate restructuring</li>
          </ul>

          <p className={styles.text}>
            Your data may be transferred to the new entity while maintaining the
            same or higher privacy protections. Users will be notified if such
            changes occur.
          </p>

          <h3 className={styles.heading}>Aggregated or Anonymized Data</h3>

          <p className={styles.text}>
            We may share anonymized insights that cannot identify you, such as:
          </p>

          <ul className={styles.text}>
            <li>Trends in admission competition</li>
            <li>System usage statistics</li>
            <li>General performance metrics</li>
            <li>Prediction accuracy improvements</li>
          </ul>

          <p className={styles.text}>
            This type of data is often used for product development, research,
            partnerships, or public reporting.
          </p>

          <h3 className={styles.heading}>With Your Explicit Consent</h3>

          <p className={styles.text}>
            We may share your data in any other scenario only when you give
            clear, explicit permission.
          </p>

          <p className={styles.text}>You can withdraw consent at any time.</p>
          <div>
            <h2 className={styles.heading}>DATA RETENTION</h2>

            <p className={styles.text}>
              Admission Compass retains personal data only for as long as it is
              reasonably necessary to provide our services, fulfill the purposes
              described in this Privacy Policy, comply with legal obligations,
              resolve disputes, and enforce our agreements. We apply strict
              retention timelines in line with the Nigeria Data Protection
              Regulation (NDPR) and the Nigeria Data Protection Act (NDPA).
            </p>

            <p className={styles.text}>
              Below is how long we keep different categories of data:
            </p>

            <h3 className={styles.heading}>
              Account & Identification Information
            </h3>

            <p className={styles.text}>
              Data such as your name, email, phone number, and account details
              are retained:
            </p>

            <ul className={styles.text}>
              <li>For as long as your account remains active, and</li>
              <li>
                Up to 24 months continuous period of inactivity, unless you
                request earlier deletion..
              </li>
            </ul>

            <p className={styles.text}>
              This helps us maintain records, prevent fraud, and resolve
              complaints.
            </p>

            <h3 className={styles.heading}>Academic & Admission Data</h3>

            <p className={styles.text}>
              Your UTME scores, O’level grades, screening scores, and prediction
              history are retained:
            </p>

            <ul className={styles.text}>
              <li>For as long as you maintain an account, and</li>
              <li>
                Automatically deleted within 24 months of account deactivation,
                unless you request earlier deletion.
              </li>
            </ul>

            <p className={styles.text}>
              These timelines support future predictions, updates, and user
              convenience.
            </p>

            <h3 className={styles.heading}>
              Token Purchases & Transaction Data
            </h3>

            <p className={styles.text}>
              Payment and transaction confirmations are retained for:
            </p>

            <ul className={styles.text}>
              <li>
                A minimum of 3 years, for financial auditing and regulatory
                compliance.
              </li>
            </ul>

            <p className={styles.text}>
              We do not store your card or bank information, only transaction
              references.
            </p>

            <h3 className={styles.heading}>Usage & Technical Logs</h3>

            <p className={styles.text}>
              Device logs, diagnostic data, and activity logs are retained for:
            </p>

            <ul className={styles.text}>
              <li>6 to 18 months, depending on the type of log.</li>
            </ul>

            <p className={styles.text}>
              This helps us improve performance and enhance security.
            </p>

            <h3 className={styles.heading}>Communication & Support Requests</h3>

            <p className={styles.text}>
              Messages, emails, tickets, and support conversations are retained
              for:
            </p>

            <ul className={styles.text}>
              <li>
                12–24 months, to help with follow-ups and quality monitoring.
              </li>
            </ul>

            <h3 className={styles.heading}>Aggregated or Anonymized Data</h3>

            <p className={styles.text}>
              Data that has been fully anonymized (and can no longer identify
              you):
            </p>

            <ul className={styles.text}>
              <li>May be retained indefinitely</li>
              <li>
                Used for research, statistics, model training, and improvement
              </li>
            </ul>

            <p className={styles.text}>
              This data cannot be linked back to any individual user.
            </p>

            <h3 className={styles.heading}>Early Deletion Upon Request</h3>

            <p className={styles.text}>
              You have the right to ask us to delete your personal data at any
              time.
            </p>

            <p className={styles.text}>
              If technically feasible and not restricted by law, we will:
            </p>

            <ul className={styles.text}>
              <li>Remove or de-identify your data</li>
              <li>Confirm deletion</li>
              <li>Ensure no unauthorized copies remain</li>
            </ul>

            <p className={styles.text}>
              Certain information (e.g., financial transaction logs) may be
              retained where required by law.
            </p>
          </div>

          <div>
            <h2 className={styles.heading}>SECURITY MEASURES</h2>

            <p className={styles.text}>
              At Admission Compass, protecting your personal information is a
              core priority. We implement technical, organizational, and
              administrative safeguards designed to keep your data secure,
              prevent unauthorized access, and ensure compliance with the
              Nigeria Data Protection Regulation (NDPR) and the Nigeria Data
              Protection Act (NDPA).
            </p>

            <p className={styles.text}>
              While no system can guarantee absolute security, we take robust
              measures to minimize risks and protect your information at every
              stage.
            </p>

            <h3 className={styles.heading}>Data Encryption</h3>

            <p className={styles.text}>
              We use encryption to safeguard your data:
            </p>

            <ul className={styles.text}>
              <li>
                In transit (when information is being sent between your device
                and our servers), and
              </li>
              <li>At rest (when stored on our systems or databases)</li>
            </ul>

            <p className={styles.text}>
              This helps ensure your personal and academic information cannot be
              easily accessed by unauthorized parties.
            </p>

            <h3 className={styles.heading}>Secure Cloud Infrastructure</h3>

            <p className={styles.text}>
              We host our services on reputable, industry-standard cloud
              providers that offer:
            </p>

            <ul className={styles.text}>
              <li>Firewalls</li>
              <li>Multi-layer security architectures</li>
              <li>Distributed denial-of-service (DDoS) protection</li>
              <li>Redundancy and backup systems</li>
            </ul>

            <p className={styles.text}>
              These platforms follow best-in-class security frameworks to keep
              your data safe.
            </p>

            <h3 className={styles.heading}>Strict Access Control</h3>

            <p className={styles.text}>
              Only authorized team members and contractors who need access to
              perform their duties can view restricted data. We enforce:
            </p>

            <ul className={styles.text}>
              <li>Role-based access controls (RBAC)</li>
              <li>Unique user credentials</li>
              <li>Audit trails and activity logs</li>
              <li>Two-factor authentication (2FA) for internal systems</li>
            </ul>

            <p className={styles.text}>
              This reduces the risk of unauthorized internal or external access.
            </p>

            <h3 className={styles.heading}>
              Secure Software Development Practices
            </h3>

            <p className={styles.text}>
              Our development team follows secure coding and deployment
              guidelines, including:
            </p>

            <ul className={styles.text}>
              <li>Code reviews and version control</li>
              <li>Private repositories for sensitive code</li>
              <li>Security testing and vulnerability scanning</li>
              <li>Regular patching and updates</li>
            </ul>

            <p className={styles.text}>
              We continuously work to identify and eliminate security
              weaknesses.
            </p>

            <h3 className={styles.heading}>Network & Application Monitoring</h3>

            <p className={styles.text}>
              We maintain active monitoring systems to detect:
            </p>

            <ul className={styles.text}>
              <li>Suspicious login attempts</li>
              <li>Unusual account activity</li>
              <li>Potential breaches or vulnerabilities</li>
              <li>System errors and performance issues</li>
            </ul>

            <p className={styles.text}>
              This helps us act quickly to prevent or mitigate security threats.
            </p>

            <h3 className={styles.heading}>
              Data Minimization & Controlled Storage
            </h3>

            <p className={styles.text}>
              We only collect and store the data necessary to deliver our
              services. Wherever possible, we:
            </p>

            <ul className={styles.text}>
              <li>Anonymize or pseudonymize sensitive data</li>
              <li>Limit retention periods</li>
              <li>Remove outdated or unnecessary records</li>
            </ul>

            <p className={styles.text}>This reduces your exposure to risks.</p>

            <h3 className={styles.heading}>
              Regular Security Audits & Compliance Checks
            </h3>

            <p className={styles.text}>
              To stay compliant with Nigerian laws and industry standards, we
              conduct:
            </p>

            <ul className={styles.text}>
              <li>Periodic internal audits</li>
              <li>System penetration testing</li>
              <li>Risk assessments</li>
              <li>Compliance reviews for NDPR and NDPA</li>
            </ul>

            <p className={styles.text}>
              We also update our policies and systems as new threats and
              regulations emerge.
            </p>

            <h3 className={styles.heading}>
              Staff Training & Confidentiality Obligations
            </h3>

            <p className={styles.text}>
              All employees, developers, and contractors are:
            </p>

            <ul className={styles.text}>
              <li>Trained on data protection principles</li>
              <li>Required to follow internal security policies</li>
              <li>Bound by confidentiality agreements</li>
            </ul>

            <p className={styles.text}>
              This ensures that everyone handling your data does so responsibly.
            </p>

            <h3 className={styles.heading}>Data Breach Response Plan</h3>

            <p className={styles.text}>
              If a data breach is suspected or confirmed, we will:
            </p>

            <ul className={styles.text}>
              <li>Investigate the incident immediately</li>
              <li>Contain and mitigate potential harm</li>
              <li>Notify affected users and authorities (where required)</li>
              <li>Implement corrective and preventative measures</li>
            </ul>

            <p className={styles.text}>
              We follow NDPR/NDPA guidelines on breach reporting and
              notification timelines.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contactBox}>
        <div className={styles.section}>
          <h2 className={styles.heading}>Contact Information</h2>
          <p className={styles.text}>
            If you have questions about this Privacy Policy, need clarification
            on how your data is used, or wish to exercise any of your rights
            under the NDPR or the Nigeria Data Protection Act (NDPA), you may
            contact us through any of the channels below. We are committed to
            responding promptly and transparently.
          </p>

          <h3 className={styles.heading}>Data Controller</h3>
          <p className={styles.SubText}>Admission Compass LTD</p>
          <p className={styles.text}>
            (Responsible for determining how and why your data is processed)
          </p>
          <a
            className={styles.link}
            href="mailto:admissioncompass.official@gmail.com"
          >
            Email: admissioncompass.official@gmail.com
          </a>

          <a className={styles.link} href="tel:(+234) 9064311029">
            Phone: (+234) 9064311029
          </a>

          <br />

          <h3 className={styles.heading}>Data Protection Officer(DPO)</h3>
          <p className={styles.text}>
            The Data Protection Officer oversees compliance with data protection
            laws and ensures your rights are respected. If you have any
            questions about this Privacy Policy, or if you wish to exercise your
            data protection rights, please contact our Data Protection Officer
            and we’ll get back to you within 72 hours:
          </p>
          <ul>
            <li>
              {" "}
              <a
                className={styles.link}
                href="mailto:privacy@admissioncompass.org"
              >
                Email: privacy@admissioncompass.org
              </a>
            </li>
          </ul>

          <h3 className={styles.heading}>General Support</h3>
          <p className={styles.text}>
            For technical issues, account questions, or help with predictions:
          </p>

          <a
            className={styles.link}
            href="mailto:admissioncompass.official@gmail.com"
          >
            Support Email: admissioncompass.official@gmail.com
          </a>

          <a className={styles.link} href="tel:(+234) 9064311029">
            WhatsApp: (+234) 9064311029
          </a>

          <br />

          <p>
            <strong>Regulator</strong>
          </p>
          <p>Nigeria Data Protection Commission (NDPC)</p>
          <p>
            <a className={styles.link} href="https://ndpc.gov.ng">
              https://ndpc.gov.ng
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
