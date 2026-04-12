import { Alternative } from "../(requireAuth)/dashboard/report/[id]/sections/AlternativeRecommendations";
import { ReportResponse } from "./getReport";
import { faculties } from "@/app/data/faculties";

export function generateAlternatives(report: ReportResponse): Alternative[] {
  const { university, course, probability } = report;

  const uni = university.toLowerCase();

  const school = faculties.find((f) => f.name === uni);

  if (!school) return [];

  let facultyName: string | null = null;
  let relatedCourses: string[] = [];

  // 🔍 Find the faculty that contains the course
  for (const [fac, courses] of Object.entries(school.faculties)) {
    if (courses.includes(course)) {
      facultyName = fac;
      relatedCourses = courses;
      break;
    }
  }

  if (!facultyName) return [];

  //  Status logic (comes from backend probability)
  const status = probability >= 70 ? "high" : "moderate";

  const alternatives: Alternative[] = [];

  //  1. Related courses (same faculty)
  relatedCourses
    .filter((c) => c !== course)
    .slice(0, 2)
    .forEach((c) => {
      alternatives.push({
        type: "course",
        name: c,
        institution: university,
        reason: `Similar field under ${facultyName} with slightly different admission competitiveness.`,
        status,
      });
    });

  // 2. Same course in other universities
  const otherSchools = faculties.filter((f) => f.name !== uni).slice(0, 2);

  otherSchools.forEach((sch) => {
    const hasCourse = Object.values(sch.faculties).some((courses) =>
      courses.includes(course),
    );

    if (hasCourse) {
      alternatives.push({
        type: "university",
        name: course,
        institution: sch.name.toUpperCase(),
        reason:
          "This university offers the same course with potentially lower competition.",
        status,
      });
    }
  });

  return alternatives;
}
