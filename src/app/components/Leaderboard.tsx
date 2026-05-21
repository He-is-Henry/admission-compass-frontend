import styles from "./leaderboard.module.css";

type Props = {
  leaderboard: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
  hasMore: boolean;
  onLoadMore: () => void;
  loading: boolean;
};

const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

export default function Leaderboard({
  leaderboard,
  currentUser,
  hasMore,
  onLoadMore,
  loading,
}: Props) {
  if (!leaderboard.length && !currentUser) return null;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Referral Leaderboard</h3>
      <div className={styles.list}>
        {currentUser && (
          <div className={`${styles.entry} ${styles.you}`}>
            <div className={styles.left}>
              <span className={styles.position}>
                {currentUser.position ? `#${currentUser.position}` : "—"}
              </span>
              <div>
                <p className={styles.username}>
                  @{currentUser.referrer.username}
                  <span className={styles.youBadge}>you</span>
                </p>
                <p className={styles.name}>{currentUser.referrer.firstName}</p>
              </div>
            </div>
            <div className={styles.right}>
              <p className={styles.count}>{currentUser.count}</p>
              <p className={styles.label}>referrals</p>
            </div>
          </div>
        )}

        {leaderboard
          .filter(
            (entry) =>
              !currentUser ||
              entry.referrer._id !== currentUser.referrer._id,
          )
          .map((entry) => (
            <div key={entry.referrer._id} className={`${styles.entry} ${entry.position === 1 ? styles.first : ""}`}>
              <div className={styles.left}>
                <span className={styles.position}>
                  {(entry.position ?? 0) <= 5
                    ? medals[(entry.position ?? 0) - 1]
                    : `#${entry.position}`}
                </span>
                <div>
                  <p className={styles.username}>@{entry.referrer.username}</p>
                  <p className={styles.name}>{entry.referrer.firstName}</p>
                </div>
              </div>
              <div className={styles.right}>
                <p className={styles.count}>{entry.count}</p>
                <p className={styles.label}>referrals</p>
              </div>
            </div>
          ))}
      </div>

      {hasMore && (
        <button onClick={onLoadMore} disabled={loading} className={styles.loadMore}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
