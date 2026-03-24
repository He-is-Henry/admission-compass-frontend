"use client";
import subjectStore from "@/app/lib/subjectStore";
import styles from "./subjectList.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
const SubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    subjectStore.get().then(setSubjects);
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Available Subjects</h2>

      {subjects.length === 0 ? (
        <div className={styles.empty}>No subjects found.</div>
      ) : (
        <ul className={styles.list}>
          {subjects.map((subj) => (
            <li key={subj._id} className={styles.item}>
              <div className={styles.name}>
                {subj.name} ({subj.questionCount} questions)
              </div>
              <div className={styles.code}>{subj.code}</div>
            </li>
          ))}
        </ul>
      )}

      <button>
        <Link href={"/subject/add"}>Add Subject</Link>
      </button>
    </div>
  );
};

export default SubjectsList;
