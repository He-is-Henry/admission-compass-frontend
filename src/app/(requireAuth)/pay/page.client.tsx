"use client";

import { useState, useEffect } from "react";
import api from "../../api/axios";
import getAllPayments from "@/app/lib/getAllPayments";
import { useAuth } from "@/app/hooks/useAuth";
import styles from "./TokenWallet.module.css";

// ── Icons (inline SVG helpers) ──────────────────────────────────────────────

const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18-3H3m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6"
    />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    style={{ width: "1.25rem", height: "1.25rem" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
    />
  </svg>
);

// ── Plans ───────────────────────────────────────────────────────────────────

const PLANS: Record<
  number,
  { tokens: number; price: number; popular?: boolean }
> = {
  3: { tokens: 3, price: 1000 },
  6: { tokens: 6, price: 1800, popular: true },
  10: { tokens: 10, price: 3000 },
};

const PLAN_KEYS = [3, 6, 10] as const;

// ── Payment type ────────────────────────────────────────────────────────────

// ── Component ───────────────────────────────────────────────────────────────

export default function TokenWallet() {
  const { user } = useAuth();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [txLoading, setTxLoading] = useState(true);

  // ── Fetch transaction history ──────────────────────────────────────────

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllPayments();
        setPayments(data ?? []);
      } catch {
        // silently fail — empty list is fine
      } finally {
        setTxLoading(false);
      }
    })();
  }, []);

  // ── Payment handler ────────────────────────────────────────────────────

  const handlePayment = async () => {
    if (selectedPlan === null) return;
    setLoading(true);
    setError("");

    try {
      const response = await api.post(`/pay`, { quantity: selectedPlan });
      if (response?.data?.url) {
        window.location.href = response.data.url;
      } else {
        setError("Payment link not received.");
      }
    } catch {
      setError("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const statusClass = (status: string) => {
    if (status === "success") return styles.txStatusSuccess;
    if (status === "failed") return styles.txStatusFailed;
    return styles.txStatusPending;
  };

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      {/* Header */}
      <div>
        <h1 className={styles.heading}>Token Wallet</h1>
        <p className={styles.subheading}>
          Manage your tokens and purchase history
        </p>
      </div>

      {/* Balance Card */}
      <div className={styles.balanceCard}>
        <div className={styles.balanceInner}>
          <div className={styles.balanceLeft}>
            <div className={styles.balanceIcon}>
              <WalletIcon />
            </div>
            <div>
              <div className={styles.balanceLabel}>Current Balance</div>
              <div className={styles.balanceAmount}>{user?.tokens ?? 0}</div>
              <div className={styles.balanceSub}>Available Tokens</div>
            </div>
          </div>

          <button
            className={styles.btnPrimary}
            onClick={() => setShowDialog(true)}
          >
            <CreditCardIcon />
            Purchase Tokens
          </button>
        </div>
      </div>

      {/* What 1 Token Unlocks */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>What 1 Token Unlocks</h2>
          <p className={styles.cardDesc}>
            Get premium features with your tokens
          </p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.perksGrid}>
            <div className={styles.perkItem}>
              <div className={`${styles.perkIcon} ${styles.perkIconBlue}`}>
                <CheckIcon />
              </div>
              <div>
                <div className={styles.perkTitle}>
                  Detailed Prediction Report
                </div>
                <div className={styles.perkDesc}>
                  In-depth analysis with historical data and trends
                </div>
              </div>
            </div>

            <div className={styles.perkItem}>
              <div className={`${styles.perkIcon} ${styles.perkIconTeal}`}>
                <CheckIcon />
              </div>
              <div>
                <div className={styles.perkTitle}>
                  Alternative Recommendations
                </div>
                <div className={styles.perkDesc}>
                  Smart course and university alternatives
                </div>
              </div>
            </div>

            <div className={styles.perkItem}>
              <div className={`${styles.perkIcon} ${styles.perkIconBlue}`}>
                <CheckIcon />
              </div>
              <div>
                <div className={styles.perkTitle}>
                  30-Day Past Questions Access
                </div>
                <div className={styles.perkDesc}>
                  Full access to subject past questions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Transaction History</h2>
          <p className={styles.cardDesc}>All your token purchases</p>
        </div>
        <div className={styles.cardBody}>
          {txLoading ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Loading transactions…</p>
            </div>
          ) : payments.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <WalletIcon />
              </div>
              <p className={styles.emptyText}>No transactions yet</p>
            </div>
          ) : (
            <div className={styles.txList}>
              {payments.map((tx) => {
                const plan = PLANS[tx.quantity] ?? {
                  price: tx.quantity * 1000,
                };
                const status = tx.status ?? "success";
                return (
                  <div key={tx._id} className={styles.txRow}>
                    <div className={styles.txLeft}>
                      <div
                        className={`${styles.txIconWrap} ${styles.txIconGreen}`}
                      >
                        <ArrowDownIcon />
                      </div>
                      <div>
                        <div className={styles.txTitle}>
                          Paid ₦{plan.price.toLocaleString() || "1000"} for{" "}
                          {tx.quantity || 1} token{tx.quantity !== 1 ? "s" : ""}
                        </div>
                        <div className={styles.txDate}>
                          {formatDate(tx.createdAt)}
                        </div>
                        <div
                          className={`${styles.txStatus} ${statusClass(status)}`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </div>
                      </div>
                    </div>
                    <div className={styles.txAmount}>+{tx.quantity} tokens</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Purchase Dialog */}
      {showDialog && (
        <div className={styles.overlay} onClick={() => setShowDialog(false)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.dialogTitle}>Purchase Tokens</h2>
            <p className={styles.dialogDesc}>
              Select a plan to continue your admission journey
            </p>

            <div className={styles.plansGrid}>
              {PLAN_KEYS.map((key) => {
                const plan = PLANS[key];
                const isSelected = selectedPlan === key;
                return (
                  <div
                    key={key}
                    className={`${styles.planCard} ${isSelected ? styles.planCardSelected : ""}`}
                    onClick={() => setSelectedPlan(key)}
                  >
                    {plan.popular && (
                      <span className={styles.popularBadge}>Popular</span>
                    )}
                    <div className={styles.planTokens}>{plan.tokens}</div>
                    <div className={styles.planTokenLabel}>Tokens</div>
                    <div className={styles.planPrice}>
                      ₦{plan.price.toLocaleString()}
                    </div>
                    <div className={styles.planPerToken}>
                      ₦{Math.round(plan.price / plan.tokens).toLocaleString()}{" "}
                      per token
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.paymentInfo}>
              <div className={styles.paymentInfoRow}>
                <span className={styles.paymentInfoLabel}>Payment Method</span>
                <img
                  src="https://paystack.com/assets/paystack-badge-cards-NGN.png"
                  alt="Paystack"
                  className={styles.paymentInfoImg}
                />
              </div>
              <p className={styles.paymentInfoText}>
                Secure payment powered by Paystack. We accept cards, bank
                transfers, and USSD.
              </p>
            </div>

            {error && <p className={styles.errorText}>{error}</p>}

            <div className={styles.dialogActions}>
              <button
                className={styles.btnOutline}
                onClick={() => {
                  setShowDialog(false);
                  setSelectedPlan(null);
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                className={`${styles.btnPrimary} ${styles.btnOutline}`}
                style={{ flex: 1, justifyContent: "center" }}
                onClick={handlePayment}
                disabled={selectedPlan === null || loading}
              >
                <CreditCardIcon />
                {loading ? "Redirecting…" : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
