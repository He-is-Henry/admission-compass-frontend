"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import api from "@/app/api/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import styles from "./MessagesPage.module.css";

type Message = {
  _id: string;
  subject: string;
  email: string;
  message: string;
  replied: boolean;
  createdAt: string;
};

type FilterType = "unreplied" | "replied";

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<FilterType>("unreplied");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  // ── Reply state ──────────────────────────────
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // message _id
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState<Message | null>(null); // for confirm modal
  const [actionLoading, setActionLoading] = useState(false);

  // ── Delete state ─────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);

  // ── Admin guard ──────────────────────────────
  useEffect(() => {
    if (user && user.role !== "admin") router.push("/dashboard");
  }, [user, router]);

  // ── Fetch ────────────────────────────────────
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await api.get("/message", {
          params: {
            replied: filter === "replied" ? "true" : "false",
            page,
          },
        });
        setMessages(res.data);
        setHasMore(res.data.length === 20);
      } catch {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [filter, page]);

  // ── Handlers ─────────────────────────────────

  const handleReplyConfirm = async () => {
    if (!replyTarget) return;
    setActionLoading(true);
    try {
      console.log("Replying....");
      // await api.patch(`/message/${replyTarget._id}`, { reply: replyText });
      setMessages((prev) => prev.filter((m) => m._id !== replyTarget._id));
      toast.success("Reply sent");
      setReplyTarget(null);
      setReplyingTo(null);
      setReplyText("");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error ?? "Failed to send reply");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      await api.delete(`/message/${deleteTarget._id}`);
      setMessages((prev) => prev.filter((m) => m._id !== deleteTarget._id));
      toast.success("Message deleted");
      setDeleteTarget(null);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error ?? "Failed to delete message");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (!user || user.role !== "admin") return null;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div>
        <h1 className={styles.heading}>Messages</h1>
        <p className={styles.subheading}>Support messages from users</p>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${filter === "unreplied" ? styles.filterTabActive : ""}`}
            onClick={() => {
              setFilter("unreplied");
              setPage(1);
            }}
          >
            Unreplied
          </button>
          <button
            className={`${styles.filterTab} ${filter === "replied" ? styles.filterTabActive : ""}`}
            onClick={() => {
              setFilter("replied");
              setPage(1);
            }}
          >
            Replied
          </button>
        </div>
        {!loading && (
          <span className={styles.count}>
            {messages.length} message{messages.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className={styles.emptyState}>Loading messages…</div>
      ) : messages.length === 0 ? (
        <div className={styles.emptyState}>No {filter} messages</div>
      ) : (
        <div className={styles.list}>
          {messages.map((msg) => (
            <div key={msg._id} className={styles.messageCard}>
              <div className={styles.messageTop}>
                <p className={styles.messageSubject}>{msg.subject}</p>
                <div className={styles.messageMeta}>
                  <span className={styles.messageEmail}>{msg.email}</span>
                  <span className={styles.messageDate}>
                    {formatDate(msg.createdAt)}
                  </span>
                  {msg.replied && (
                    <span className={styles.repliedBadge}>Replied</span>
                  )}
                </div>
              </div>

              <p className={styles.messageBody}>{msg.message}</p>

              {/* Inline Reply Box */}
              {replyingTo === msg._id && (
                <div className={styles.replyBox}>
                  <label className={styles.replyLabel}>
                    Reply to {msg.email}
                  </label>
                  <textarea
                    className={styles.replyTextarea}
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    autoFocus
                  />
                  <div className={styles.replyActions}>
                    <button
                      className={styles.btnPrimary}
                      disabled={!replyText.trim()}
                      onClick={() => setReplyTarget(msg)}
                    >
                      Send Reply
                    </button>
                    <button
                      className={styles.btnOutline}
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.messageActions}>
                {!msg.replied && replyingTo !== msg._id && (
                  <button
                    className={styles.btnPrimary}
                    onClick={() => {
                      setReplyingTo(msg._id);
                      setReplyText("");
                    }}
                  >
                    Reply
                  </button>
                )}
                <button
                  className={styles.btnDanger}
                  onClick={() => setDeleteTarget(msg)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && (messages.length > 0 || page > 1) && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>Page {page}</span>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
          >
            Next
          </button>
        </div>
      )}

      {/* Reply Confirm Modal */}
      {replyTarget && (
        <ConfirmModal
          title="Send Reply?"
          description={`Send your reply to ${replyTarget.email}?`}
          confirmLabel="Send"
          loading={actionLoading}
          onConfirm={handleReplyConfirm}
          onCancel={() => setReplyTarget(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <ConfirmModal
          title="Delete Message?"
          description={`Permanently delete "${deleteTarget.subject}" from ${deleteTarget.email}?`}
          confirmLabel="Delete"
          loading={actionLoading}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
