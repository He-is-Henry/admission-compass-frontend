import { ReportResponse } from "./getReport";
export type ActionPriority = "high" | "medium" | "low";
import { universities } from "../data/universities";

export interface ActionItem {
  title: string;
  description: string;
  priority: ActionPriority;
}
export function generateActionPlan(report: ReportResponse): ActionItem[] {
  const data = report.report_data;
  const selectedUni = universities.find((u) => u.id === report.university);
  if (!data) return [];

  const actions: ActionItem[] = [];

  const utme = data.breakdown.utme_score;
  const postUtme = data.breakdown.post_utme_score;
  const olevel = data.breakdown.olevel_average;
  const diff = data.cutoff.difference;
  const utmeCutoff = data.cutoff.utme;

  /* 🔴 BELOW CUTOFF (actual risk) */
  if (diff < 0) {
    actions.push({
      title: "You are below the cutoff",
      description: `You are ${Math.abs(
        diff,
      )} points below the required aggregate. Consider improving your scores or choosing safer alternatives.`,
      priority: Math.abs(diff) > 15 ? "high" : "medium",
    });
  }

  /* 🟡 BORDERLINE */
  if (diff === 0) {
    actions.push({
      title: "You are right on the cutoff",
      description:
        "Your score meets the minimum requirement, but competition may still affect your chances.",
      priority: "high",
    });
  }

  /* 🟢 ABOVE CUTOFF */
  if (diff > 0 && diff < 10) {
    actions.push({
      title: "Slightly above cutoff",
      description:
        "You are above the cutoff, but competition may still be strong. Strengthen other areas to improve your chances.",
      priority: "medium",
    });
  }

  if (diff >= 10) {
    actions.push({
      title: "Strong position",
      description:
        "You are comfortably above the cutoff. Maintain your performance and prepare for the next stages.",
      priority: "low",
    });
  }

  /* 🔴 UTME CHECK */
  if (utmeCutoff && utme < utmeCutoff) {
    actions.push({
      title: "Improve your UTME score",
      description:
        "Your UTME score is below the required threshold. Retaking the exam could significantly improve your chances.",
      priority: "high",
    });
  }

  /* 🔵 POST UTME */
  if (!postUtme && selectedUni?.requires_post_utme) {
    actions.push({
      title: "Prepare for Post-UTME",
      description:
        "Your Post-UTME score is not available. Performing well here can significantly boost your aggregate.",
      priority: "high",
    });
  }

  /* 🟡 O’LEVEL */
  if (olevel && olevel < 7) {
    actions.push({
      title: "Improve your O’level results",
      description:
        "Better grades in key subjects can increase your competitiveness.",
      priority: "medium",
    });
  }

  /* 🟣 STRATEGY */
  if (diff <= 5) {
    actions.push({
      title: "Apply strategically",
      description:
        "Consider applying to alternative courses or universities to maximize your chances.",
      priority: "medium",
    });
  }

  return actions;
}
