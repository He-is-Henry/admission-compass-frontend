import api from "../api/axios";

export default async function revokeSessions(sessions: string[]) {
  try {
    const res = await api.post("/revoke", sessions);
    const newSessions = res.data;
    return newSessions;
  } catch (err) {
    return err;
  }
}
