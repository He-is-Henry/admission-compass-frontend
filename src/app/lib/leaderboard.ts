import api from "../api/axios";

export const getLeaderboard = async (
  historyPage?: number,
  leaderboardPage?: number,
) => {
  const params = new URLSearchParams();
  if (historyPage) params.set("historyPage", String(historyPage));
  if (leaderboardPage) params.set("leaderboardPage", String(leaderboardPage));
  const res = await api.get(`/leaderboard?${params.toString()}`, {
    headers: { "Cache-Control": "no-cache" },
  });
  return res.data;
};
