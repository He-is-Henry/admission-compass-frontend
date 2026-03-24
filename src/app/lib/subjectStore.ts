import { getAllSubjects } from "./subject";

let subjects: Subject[] | null = null;

const subjectStore = {
  get: async () => {
    if (!subjects) {
      const data = await getAllSubjects();
      subjects = data; // cache it
      return data;
    }
    return subjects;
  },
  set: (data: Subject[]) => {
    subjects = data;
  },
  clear: () => {
    subjects = null;
  },
};

export default subjectStore;
