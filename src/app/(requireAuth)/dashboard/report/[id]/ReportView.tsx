"use client";

import { getReportSafe, ReportResponse } from "@/app/lib/getReport";
import styles from "./report.module.css";

import PredictionSummary from "./sections/PredictionSummary";
import ScoreBreakdown from "./sections/ScoreBreakdown";
import AdmissionAnalysis from "./sections/Methodology";
import Alternatives from "./sections/AlternativeRecommendations";
import ActionPlan from "./sections/ActionPlan";
import Disclaimer from "./sections/Disclaimer";
import { useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function ReportView({ id }: Props) {
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      if (!id) return;

      // Check sessionStorage first — avoid re-charging token on refresh
      const cacheKey = `report_${id}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          setReport(JSON.parse(cached));
          setLoading(false);
          return;
        } catch {
          sessionStorage.removeItem(cacheKey);
        }
      }

      const { data, error } = await getReportSafe(id);
      if (error || !data) {
        setError(error ?? "Failed to load report.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      setReport(data);
      setLoading(false);
    }

    fetchReport();
  }, [id]);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Loading your report…</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorText}>
          {error ?? "No report data available."}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Download bar — hidden on print */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>
          {report.course} · {report.university}
        </span>
        <button className={styles.downloadBtn} onClick={handlePrint}>
          ⬇ Download PDF
        </button>
      </div>

      {/* Pages */}
      <div className={styles.container}>
        <div className={styles.page}>
          <PredictionSummary report={report} />
        </div>

        <div className={styles.page}>
          <ScoreBreakdown report={report} />
        </div>

        {report.report_data && (
          <>
            <div className={styles.page}>
              <AdmissionAnalysis report={report} />
            </div>

            <div className={styles.page}>
              <Alternatives report={report} />
            </div>

            <div className={styles.page}>
              <ActionPlan report={report} />
            </div>
          </>
        )}

        <div className={styles.page}>
          <Disclaimer reportId={report._id} generatedAt={report.createdAt} />
        </div>
      </div>
    </div>
  );
}
