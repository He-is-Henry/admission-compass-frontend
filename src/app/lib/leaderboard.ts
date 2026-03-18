import api from "../api/axios";

export const getLeaderboard = async (
  historyPage: number = 1,
): Promise<{
  lead: LeaderboardEntry[];
  history: { data: ReferralHistory[]; total: number; hasMore: boolean };
  currentUser: LeaderboardEntry | null;
}> => {
  try {
    const res = await api.get(`/leaderboard?historyPage=${historyPage}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Leaderboard fetch failed:", err);
    return {
      lead: [],
      history: { data: [], total: 0, hasMore: false },
      currentUser: null,
    };
  }
};
