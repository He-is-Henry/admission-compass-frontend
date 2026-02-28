import axios from "../api/axios";

export const getLeaderboard = async (): Promise<{
  lead: LeaderboardEntry[];
  history: ReferralHistory[];
}> => {
  try {
    const res = await axios.get("/leaderboard");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Leaderboard fetch failed:", err);
    return { lead: [], history: [] };
  }
};
