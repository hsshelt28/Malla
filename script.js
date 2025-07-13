// script.js

const subjects = [
  { code: "DER-LAB-IND", name: "Derecho laboral individual", prereqs: [] },
  { code: "DER-ROM", name: "Derecho romano", prereqs: [] },
  { code: "ING1", name: "Inglés I", prereqs: [] },
  { code: "INTRO-DER", name: "Introducción al derecho", prereqs: [] },
  { code: "MET-INV", name: "Metodología general de la investigación", prereqs: [] },
  { code: "VALORES", name: "Taller de vivencia de los valores", prereqs: [] },
  { code: "TEO-CONST", name: "Teoría constitucional y del estado", prereqs: [] },
  { code: "ELEC-COMP1", name: "Electiva complementación I", prereqs: [] },
  { code: "DER-CIV-GRAL", name: "Derecho civil general y personas", prereqs: ["DER-LAB-IND", "DER-ROM", "ING1", "INTRO-DER", "MET-INV", "VALORES", "TEO-CONST", "ELEC-COMP1"] },
  { code: "DER-LAB-COL", name: "Derecho laboral colectivo", prereqs: ["DER-LAB-IND"] },
  { code: "ELEC-PROF1", name: "Electiva de profundización I", prereqs: ["DER-LAB-IND", "DER-ROM", "ING1", "INTRO-DER", "MET-INV", "VALORES", "TEO-CONST", "ELEC-COMP1"] },
  { code: "FIL-DER", name: "Filosofía del derecho", prereqs: ["DER-LAB-IND", "DER-ROM", "ING1", "INTRO-DER", "MET-INV", "VALORES", "TEO-CONST", "ELEC-COMP1"] },
  { code: "HIST-ID-POL", name: "Historia de las ideas políticas", prereqs: ["DER-LAB-IND", "DER-ROM", "ING1", "INTRO-DER", "MET-INV", "VALORES", "TEO-CONST", "ELEC-COMP1"] },
  { code: "ING2", name: "Inglés II", prereqs: ["ING1"] },
  { code: "SEM-INV1", name: "Seminario de Investigación I", prereqs: ["MET-INV"] },
  { code: "ELEC-COMP2", name: "Electiva de complementación II", prereqs: ["DER-LAB-IND", "DER-ROM", "ING1", "INTRO-DER", "MET-INV", "VALORES", "TEO-CONST", "ELEC-COMP1"] }
];

const mallaDiv = document.getElementById("malla");

function createSubject(subject) {
  const div = document.createElement("div");
  div.className = "subject";
  div.textContent = subject.name;
  div.dataset.code = subject.code;
  div.dataset.prereqs = subject.prereqs.join(",");
  if (subject.prereqs.length > 0) {
    div.classList.add("locked");
  }
  div.addEventListener("click", () => {
    if (div.classList.contains("locked")) return;
    div.classList.toggle("approved");
    updateUnlocks();
  });
  return div;
}

function updateUnlocks() {
  const all = document.querySelectorAll(".subject");
  const approved = new Set(
    [...all].filter(s => s.classList.contains("approved")).map(s => s.dataset.code)
  );

  all.forEach(subject => {
    const prereqs = subject.dataset.prereqs ? subject.dataset.prereqs.split(",") : [];
    const locked = prereqs.some(p => !approved.has(p));
    if (locked) {
      subject.classList.add("locked");
    } else {
      subject.classList.remove("locked");
    }
  });
}

// Init
subjects.forEach(subject => {
  const div = createSubject(subject);
  mallaDiv.appendChild(div);
});

