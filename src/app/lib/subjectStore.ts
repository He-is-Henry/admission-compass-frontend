let subjects: Subject[] | null = null;

const subjectStore = {
  get: () => subjects,
  set: (data: Subject[]) => {
    subjects = data;
  },
  clear: () => {
    subjects = null;
  },
};

export default subjectStore;

/*
── Usage Example ────────────────────────────────────────────────────────────

import { subjectStore } from "@/app/stores/subjectStore";
import { getAllSubjects } from "@/app/lib/subject";

// Inside any component:
useEffect(() => {
  const load = async () => {
    const cached = subjectStore.get();
    if (cached) {
      setSubjects(cached);
      return;
    }
    const data = await getAllSubjects();
    subjectStore.set(data);
    setSubjects(data);
  };

  load();
}, []);

// Every subsequent page that needs subjects skips the fetch entirely.
// On logout, call subjectStore.clear() alongside tokenStore.clear().
*/
