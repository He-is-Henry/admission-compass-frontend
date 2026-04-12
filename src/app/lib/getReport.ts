import api from "@/app/api/axios";
import { isAxiosError } from "axios";

export interface ReportResponse {
  _id: string;
  university: string;
  course: string;
  probability: number;
  createdAt: string;
  report_data: {
    breakdown: {
      utme_score: number;
      post_utme_score: number | null;
      olevel_points: number | null;
      olevel_average: number | null;
    };
    cutoff: {
      aggregate: number;
      utme: number | null;
      difference: number;
    };
    limits: {
      utme_min: number | null;
      post_utme_max: number | null;
      sittings_max: number | null;
    };
  };
}

export async function getReport(predictionId: string): Promise<ReportResponse> {
  const { data } = await api.post(`/predict/${predictionId}/report`);
  console.log(data);
  return data;
}

export async function getReportSafe(
  predictionId: string,
): Promise<{ data: ReportResponse | null; error: string | null }> {
  try {
    console.log("Getting report for " + predictionId);
    const data = await getReport(predictionId);
    console.log(data);
    return { data, error: null };
  } catch (err) {
    console.error(err);
    if (isAxiosError(err)) {
      return {
        data: null,
        error: err.response?.data?.error || "Failed to fetch report.",
      };
    }
    return { data: null, error: "Something went wrong." };
  }
}
