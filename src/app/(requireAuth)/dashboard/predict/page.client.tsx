"use client";
import React, { useEffect, useState } from "react";
import api from "@/app/api/axios";
import { isAxiosError } from "axios";
import styles from "./PredictionForm.module.css";
import { faculties } from "@/app/data/faculties";
import { useRouter } from "next/navigation";
import { universities } from "@/app/data/universities";

type OlevelGrade = "A1" | "B2" | "B3" | "C4" | "C5" | "C6" | "D7" | "E8" | "F9";

const GRADES: OlevelGrade[] = [
  "A1",
  "B2",
  "B3",
  "C4",
  "C5",
  "C6",
  "D7",
  "E8",
  "F9",
];
const VALID_GRADES: OlevelGrade[] = ["A1", "B2", "B3", "C4", "C5", "C6"];

const SUBJECTS = [
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature in English",
  "Geography",
  "Agricultural Science",
  "Further Mathematics",
  "Civic Education",
  "Computer Science",
  "Financial Accounting",
  "Commerce",
  "Other",
];

type OlevelEntry = { subject: string; grade: OlevelGrade | "" };
type Faculty = keyof (typeof faculties)[number]["faculties"];
type FormData = {
  utme_score: string;
  post_utme_score: string;
  faculty: Faculty;
  department: string;
  sittings: string;
  olevel_entries: OlevelEntry[];
};

const emptyEntry = (): OlevelEntry => ({ subject: "", grade: "" });

const PredictionForm = () => {
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<
    (typeof faculties)[number]["faculties"] | null
  >(faculties[0].faculties);
  const [form, setForm] = useState<FormData>({
    utme_score: "",
    post_utme_score: "",
    faculty: Object.keys(faculties[0].faculties)[0] as Faculty,
    department: "",
    sittings: "1",
    olevel_entries: Array.from({ length: 5 }, emptyEntry),
  });

  const [paid, setPaid] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (!selectedUniversity) return;
    const foundFaculties = faculties.find(
      (f) => f.name === selectedUniversity?.id,
    )!;
    setSelectedFaculty(foundFaculties?.faculties);
    const defaultFacultyKey = Object.keys(
      foundFaculties?.faculties,
    )[0] as Faculty;
    const defaultDepartment = foundFaculties.faculties[defaultFacultyKey]?.[0];
    if (!defaultDepartment) return;
    updateField("faculty", defaultFacultyKey);
    updateField("department", defaultDepartment);
  }, [selectedUniversity]);

  useEffect(() => {
    if (!selectedFaculty) return;
    const defaultFacultyKey = form.faculty;
    const defaultDepartment = selectedFaculty[defaultFacultyKey]?.[0];
    if (!defaultDepartment) return;
    updateField("department", defaultDepartment);
  }, [form.faculty, selectedFaculty]);

  const onUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const found = universities.find((u) => u.id === id) ?? null;
    setSelectedUniversity(found);
    setResult(null);
    setError(null);
    setPredictionId(null);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateOlevel = (
    index: number,
    key: keyof OlevelEntry,
    value: string,
  ) => {
    setForm((prev) => {
      const entries = [...prev.olevel_entries];
      entries[index] = { ...entries[index], [key]: value };
      return { ...prev, olevel_entries: entries };
    });
  };

  const addSubject = () => {
    if (form.olevel_entries.length >= 9) return;
    setForm((prev) => ({
      ...prev,
      olevel_entries: [...prev.olevel_entries, emptyEntry()],
    }));
  };

  const removeSubject = (index: number) => {
    if (form.olevel_entries.length <= 5) return;
    setForm((prev) => ({
      ...prev,
      olevel_entries: prev.olevel_entries.filter((_, i) => i !== index),
    }));
  };

  const computeOlevelValid = (): boolean => {
    const filled = form.olevel_entries.filter((e) => e.grade !== "");
    return (
      filled.length >= 5 &&
      filled.every((e) => VALID_GRADES.includes(e.grade as OlevelGrade))
    );
  };

  const getOlevelGrades = (): string[] => {
    return form.olevel_entries
      .filter((e) => e.grade !== "")
      .map((e) => e.grade as string);
  };

  const validate = (): string | null => {
    if (!selectedUniversity) return "Please select a university.";
    if (!form.utme_score || isNaN(Number(form.utme_score)))
      return "Enter a valid UTME score.";
    if (Number(form.utme_score) < 0 || Number(form.utme_score) > 400)
      return "UTME score must be between 0 and 400.";
    if (selectedUniversity.requires_post_utme) {
      if (!form.post_utme_score || isNaN(Number(form.post_utme_score)))
        return "Enter a valid Post-UTME score.";
    }
    if (!form.faculty.trim()) return "Enter your faculty.";
    if (!form.department.trim()) return "Enter your department.";
    if (selectedUniversity.requires_olevel_grades) {
      const filled = form.olevel_entries.filter((e) => e.subject && e.grade);
      if (filled.length < 5)
        return "Enter at least 5 O'level subjects with grades.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setPredictionId(null);
    setReportError(null);

    const payload: Record<string, unknown> = {
      utme_score: Number(form.utme_score),
      faculty: form.faculty,
      department: form.department,
    };

    if (selectedUniversity!.requires_post_utme)
      payload.post_utme_score = Number(form.post_utme_score);
    if (selectedUniversity!.requires_olevel_grades) {
      payload.olevel_grades = getOlevelGrades();
      payload.olevel_valid = computeOlevelValid();
    } else {
      payload.olevel_valid = true;
    }
    if (selectedUniversity!.requires_sittings)
      payload.sittings = Number(form.sittings);
    payload.paid = paid;

    try {
      const { data } = await api.post(
        `/predict/${selectedUniversity!.id}`,
        payload,
      );
      setResult(data);
      if (data._id) setPredictionId(data._id);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || "Prediction failed.");
      } else {
        setError("Could not reach the server. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const percentage = Number(result?.admission_probability.slice(0, -1));
  const decisionColor =
    percentage > 50
      ? styles.admitted
      : percentage < 50
        ? styles.notAdmitted
        : styles.notEligible;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Check Your Admission Chances</h2>

        <div className={styles.field}>
          <label className={styles.label}>University</label>
          <select
            className={styles.select}
            onChange={onUniversityChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select a university
            </option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        {selectedUniversity && (
          <>
            <div className={styles.field}>
              <label className={styles.label}>
                UTME Score <span className={styles.range}>(0 – 400)</span>
              </label>
              <input
                className={styles.input}
                type="number"
                min={0}
                max={400}
                placeholder="e.g. 265"
                value={form.utme_score}
                onChange={(e) => updateField("utme_score", e.target.value)}
              />
            </div>

            {selectedUniversity.requires_post_utme && (
              <div className={styles.field}>
                <label className={styles.label}>Post-UTME Score</label>
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  max={100}
                  placeholder="e.g. 24"
                  value={form.post_utme_score}
                  onChange={(e) =>
                    updateField("post_utme_score", e.target.value)
                  }
                />
              </div>
            )}

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Faculty</label>
                <select
                  className={styles.input}
                  value={form.faculty}
                  onChange={(e) => updateField("faculty", e.target.value)}
                >
                  {selectedFaculty &&
                    Object.keys(selectedFaculty).map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Department</label>
                <select
                  className={styles.input}
                  value={form.department}
                  onChange={(e) => updateField("department", e.target.value)}
                >
                  {selectedFaculty &&
                    form.faculty &&
                    selectedFaculty[form.faculty]?.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {selectedUniversity.requires_sittings && (
              <div className={styles.field}>
                <label className={styles.label}>O&apos;level Sittings</label>
                <div className={styles.sittingsGroup}>
                  {["1", "2"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.sittingBtn} ${form.sittings === s ? styles.sittingActive : ""}`}
                      onClick={() => updateField("sittings", s)}
                    >
                      {s} Sitting{s === "2" ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedUniversity.requires_olevel_grades && (
              <div className={styles.field}>
                <label className={styles.label}>
                  O&apos;level Grades{" "}
                  <span className={styles.range}>
                    (min. 5 subjects, C6 or better)
                  </span>
                </label>
                <div className={styles.olevelList}>
                  {form.olevel_entries.map((entry, i) => (
                    <div key={i} className={styles.olevelRow}>
                      <select
                        className={styles.selectSmall}
                        value={entry.subject}
                        onChange={(e) =>
                          updateOlevel(i, "subject", e.target.value)
                        }
                      >
                        <option value="">Subject</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <select
                        className={styles.selectSmall}
                        value={entry.grade}
                        onChange={(e) =>
                          updateOlevel(i, "grade", e.target.value)
                        }
                      >
                        <option value="">Grade</option>
                        {GRADES.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                      {form.olevel_entries.length > 5 && (
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeSubject(i)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {form.olevel_entries.length < 9 && (
                  <button
                    type="button"
                    className={styles.addBtn}
                    onClick={addSubject}
                  >
                    + Add Subject
                  </button>
                )}
              </div>
            )}

            <label htmlFor="paid" className={styles.tokenLabel}>
              <input
                type="checkbox"
                name="paid"
                id="paid"
                checked={paid}
                onChange={(e) => setPaid(e.target.checked ?? false)}
              />
              Use a token?
            </label>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <button
              className={styles.submitBtn}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                "Check Admission"
              )}
            </button>
          </>
        )}
      </form>

      {result && (
        <div className={styles.result}>
          <div className={`${styles.decision} ${decisionColor}`}>
            {percentage >= 70
              ? "High "
              : percentage >= 50
                ? "Moderate"
                : "Low "}{" "}
            chance
          </div>

          <div className={styles.probability}>
            {result.admission_probability}
          </div>

          {result.chance_label && (
            <div className={styles.chanceLabel}>
              {result.chance_label} Chance
            </div>
          )}

          {result.aggregate_score !== undefined && (
            <p className={styles.meta}>
              Aggregate Score: <strong>{result.aggregate_score}</strong>
            </p>
          )}
          {result.screening_score !== undefined && (
            <p className={styles.meta}>
              Screening Score: <strong>{result.screening_score}</strong>
            </p>
          )}
          {result.olevel_avg_points !== undefined && (
            <p className={styles.meta}>
              O&apos;Level Average: <strong>{result.olevel_avg_points}</strong>
            </p>
          )}

          {result.explanation && (
            <ul className={styles.explanation}>
              {result.explanation.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}

          {result.reason && <p className={styles.reason}>{result.reason}</p>}

          {/* Report CTA — only shows if prediction was saved  */}
          {predictionId && (
            <div className={styles.reportCta}>
              <div className={styles.reportCtaText}>
                <span className={styles.reportCtaTitle}>
                  Want a full breakdown?
                </span>
                <span className={styles.reportCtaDesc}>
                  Get your detailed admission report — score breakdown,
                  insights, and action plan.
                </span>
              </div>
              {reportError && <p className={styles.errorMsg}>{reportError}</p>}
              <button
                className={styles.reportBtn}
                onClick={() => {
                  setReportLoading(true);
                  router.push(`/dashboard/report/${predictionId}`);
                }}
              >
                {reportLoading ? (
                  <span className={styles.spinner} />
                ) : (
                  "Get Full Report — 1 Token"
                )}
              </button>
            </div>
          )}

          <button
            className={styles.resetBtn}
            onClick={() => {
              setResult(null);
              setError(null);
              setPredictionId(null);
              setReportError(null);
            }}
          >
            Try Another University
          </button>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
