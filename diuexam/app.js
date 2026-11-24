// Tree helpers: T("name", child, child...) = folder, F("name") = file
const T = (n, ...c) => ({ n, c });
const F = (n) => ({ n, file: true });

// ============================================================
//  EDIT THIS FILE: exam title, questions, and the Google link
// ============================================================
const CONFIG = {
  // Paste the Web App URL you get after deploying Code.gs (see setup steps)
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyF1haDRGP5Eh-ISeM0oIw3g2NDnbOj-74gndb6I-qpq28Ec9rkuRmheKb2uPwWNHfX/exec",

  EXAM_TITLE: "Linux Command Practice",
  DURATION_MIN: 50,   // exam time in minutes
  VIVA_COUNT: 6,      // how many random viva questions each student gets

  // Written questions. Even column no -> pink, odd column no -> green.
  WRITTEN: {
    pink: [
      "Suppose your terminal is opened in the g folder. Create a file named task.txt in the d folder, write operating system in it using echo, and then display its content.",
      "Suppose your terminal is opened in the h folder. Using a single command, create three folders named x, y, and z inside the c folder. Then go to the y folder and confirm your current location.",
      "Suppose your terminal is opened in the f folder, and a file named info.txt is in the h folder. Copy the file into the g folder. Then move that copied file from g to the a folder and rename it details.txt.",
      "Suppose your terminal is opened in the d folder. There is an empty folder named unused in e and a file named sample.txt in c. Delete both of them. Would the same command work for both? Explain your answer.",
      "Suppose your terminal is opened in the root folder. Display all files in the b folder, including hidden files, in long format with human-readable file sizes.",
      "Suppose your terminal is opened in the downloads folder. Display the first 10 lines and then the last 5 lines of notes.txt. After that, view the entire file page by page, allowing you to scroll backward.",
      "Suppose your terminal is opened in the student2 folder. Create a file named assignment.txt using nano and write your name in it. Then rename it to submission.txt and move it to the documents folder inside student1.",
      "Suppose your terminal is opened in the documents folder. A folder named semester contains multiple files and subfolders. Your friend suggests using \"rmdir semester\" to delete it. Do you agree? If not, write the correct command to delete the folder and all its contents.",
      "Suppose your terminal is opened in the student1 folder. Create the directory structure archive/2026/december inside the home folder using a single command. Then copy the entire downloads folder into the december folder.",
      "Suppose your terminal is opened in the var folder. Create an empty file named system.log inside the student2 folder without using any text editor. Then verify that the file has been created."
    ],
    green: [
      "Suppose your terminal is opened in the d folder. Create a file named result.txt in the h folder, write linux practice in it using echo, and display its content.",
      "Suppose your terminal is opened in the h folder. Using a single command, create two folders named images and videos inside the e folder. Then navigate to the images folder and confirm your current location.",
      "Suppose your terminal is opened in the c folder, and a file named project.txt is in the d folder. Copy the file into the b folder. Then move the copied file from b to g and rename it final_project.txt.",
      "Suppose your terminal is opened in the a folder. There is an empty folder named backup in c and a file named draft.txt in f. Delete both. Which commands would you use, and why?",
      "Suppose your terminal is opened in the root folder. Display all files in the e folder, including hidden files, in long format with human-readable sizes.",
      "Suppose your terminal is opened in the desktop folder. Display the first 7 lines and then the last 12 lines of records.txt. After that, view the entire file page by page, with the ability to scroll backward.",
      "Suppose your terminal is opened in the guest folder. Create a file named profile.txt using nano and write your name in it. Then rename it to user_profile.txt and move it to the documents folder inside admin.",
      "Suppose your terminal is opened in the documents folder. A folder named database contains several files and subfolders. Your friend suggests using \"rmdir database\" to remove it. Is this command sufficient? If not, write the correct command to delete the folder and everything inside it.",
      "Suppose your terminal is opened in the admin folder. Create the directory structure storage/2026/backup inside the home folder using one command. Then copy the entire documents folder into the backup folder.",
      "Suppose your terminal is opened in the tmp folder. Create an empty file named error.log inside the guest folder without using any text editor. Then verify that the file exists."
    ]
  },

  // Tree diagram shown above a question. Key = question number (1 = first).
  WRITTEN_INTRO: {
    pink: {
      1: { title: "Tree A", tree: T("root", T("a", T("d"), T("e", T("h"))), T("b", T("f"), T("g")), T("c")) },
      6: { title: "Tree B", tree: T("root", T("home", T("student1", T("documents", F("notes.txt")), T("downloads")), T("student2")), T("var"), T("usr")),
           note: "The documents folder contains a file named notes.txt with 80 lines." }
    },
    green: {
      1: { title: "Tree A", tree: T("root", T("a", T("d"), T("e")), T("b", T("f"), T("g", T("h"))), T("c")) },
      6: { title: "Tree B", tree: T("root", T("home", T("admin", T("desktop"), T("documents", F("records.txt"))), T("guest")), T("opt"), T("tmp")),
           note: "The documents folder contains a file named records.txt with 120 lines." }
    }
  },

  // Viva pool (30 questions). Each student gets VIVA_COUNT random ones.
  VIVA_POOL: [
    "What does the pwd command do?",
    "Do you agree that pwd shows the contents of the current directory? Why or why not?",
    "What is the purpose of the ls command?",
    "What information does ls -l display?",
    "Is it correct that ls shows hidden files by default?",
    "Which option is used to display hidden files?",
    "What does the cd command do?",
    "What does cd .. do?",
    "Do you agree that cd with no argument takes you to the home directory?",
    "Which command creates a new directory, and how do you create nested directories in one command?",
    "Is it correct that mkdir -p a/b/c fails if the directory a does not exist? Explain.",
    "How do you copy a file from one name to another?",
    "Is it correct to copy a directory using cp dir1 dir2 without any option? Explain.",
    "What are the two main uses of mv?",
    "Do you agree that mv keeps the original file in its old location? Justify.",
    "What does more do, and how does less improve on it?",
    "Is it correct that more allows easy backward scrolling? Explain.",
    "What does head display by default, and how can you show only the first 5 lines?",
    "Do you agree that tail shows the first 10 lines of a file?",
    "What is the use of tail -f?",
    "What does touch do when the file does not exist?",
    "What are the uses of the cat command?",
    "What is nano, and how do you save and exit a file in it?",
    "Which command removes an empty directory?",
    "Do you agree that rmdir can delete a directory that contains files? Why or why not?",
    "What does the rm command do?",
    "Is it correct that rm can delete a directory without any option? Which option is needed?",
    "What is the difference between rm -r and rm -rf, and why is rm -rf considered dangerous?",
    "What is the difference between rmdir and rm -r?",
    "Do you agree that files deleted with rm go to the Recycle Bin and can be easily restored? Explain."
  ]
};

// ============================================================
//  APP LOGIC (no need to edit below this line)
// ============================================================
(() => {
  "use strict";
  const KEY = "exam_state_v1";
  const PAGES = ["login", "menu", "written", "viva"];
  let state = null, unsynced = false, saving = false, saveTimer = null;
  let submitting = false, timeUpFired = false, sessionStarted = false;

  const $ = (s) => document.querySelector(s);

  // ---------- helpers ----------
  async function api(payload) {
    let res;
    try { res = await fetch(CONFIG.SCRIPT_URL, { method: "POST", body: JSON.stringify(payload) }); }
    catch (e) { throw new Error("Cannot reach the server. Check your internet. (If it keeps happening, the teacher should check the Web App URL and that access is set to Anyone.)"); }
    const text = await res.text();
    try { return JSON.parse(text); }
    catch (e) { throw new Error("The server did not return data (HTTP " + res.status + "). Teacher: redeploy the Web App with access set to Anyone, and use the /exec URL."); }
  }
  function load() { try { state = JSON.parse(localStorage.getItem(KEY)); } catch (e) { state = null; } }
  function persist() { localStorage.setItem(KEY, JSON.stringify(state)); }
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function remainingMs() { return state.startTime + CONFIG.DURATION_MIN * 60000 - (Date.now() + state.offset); }
  function locked() { return state ? remainingMs() <= 0 : false; }
  function fmt(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    const p = (n) => String(n).padStart(2, "0");
    return (h ? p(h) + ":" : "") + p(m) + ":" + p(s);
  }
  function payloadState() {
    return { written: state.written, viva: state.viva, submittedAt: state.submittedAt, edited: state.edited };
  }
  function setStatus(t) { $("#saveStatus").textContent = t; }

  // ---------- login ----------
  async function login(name, id, col, pass) {
    if (!Number.isInteger(col) || col < 1) throw new Error("Column no must be a positive whole number.");
    if (CONFIG.SCRIPT_URL.indexOf("PASTE") === 0) throw new Error("The website is not connected to Google Sheet yet.");
    let r;
    try { r = await api({ action: "login", id, name, col, passcode: pass }); }
    catch (e) { throw e; }
    if (!r.ok) throw new Error(r.error || "Login failed.");

    let s = r.state;
    const fresh = !s;
    if (fresh) {
      s = {
        written: CONFIG.WRITTEN[r.set].map(() => ""),
        viva: { questions: shuffle(CONFIG.VIVA_POOL).slice(0, CONFIG.VIVA_COUNT), answers: [] },
        submittedAt: null, edited: false
      };
    }
    while (s.written.length < CONFIG.WRITTEN[r.set].length) s.written.push("");
    state = Object.assign(s, {
      id, name: r.name || name, col: r.col, set: r.set, passcode: pass,
      startTime: r.startTime, offset: r.serverNow - Date.now()
    });
    timeUpFired = false; unsynced = false;
    persist();
    if (fresh) { try { await api({ action: "save", id, passcode: pass, state: payloadState() }); } catch (e) {} }
  }

  // ---------- saving ----------
  function change() {
    state.edited = true; persist(); unsynced = true; setStatus("Saving...");
    clearTimeout(saveTimer); saveTimer = setTimeout(sync, 1200);
  }
  async function sync() {
    if (!unsynced || saving || !state) return;
    saving = true; unsynced = false;
    try {
      const r = await api({ action: "save", id: state.id, passcode: state.passcode, state: payloadState() });
      if (!r.ok) throw new Error(r.error);
      setStatus("Saved ✓");
    } catch (e) { unsynced = true; setStatus("Not saved - retrying..."); }
    saving = false;
  }

  // ---------- submit ----------
  function buildFields() {
    const f = [];
    state.written.forEach((a, i) => f.push(["Written Q" + (i + 1), a || ""]));
    state.viva.questions.forEach((q, i) => {
      f.push(["Viva Q" + (i + 1) + " (question)", q]);
      f.push(["Viva Q" + (i + 1) + " (answer)", state.viva.answers[i] || ""]);
    });
    return f;
  }
  async function submit() {
    if (submitting) return;
    submitting = true;
    clearTimeout(saveTimer);
    try {
      const r = await api({ action: "submit", id: state.id, passcode: state.passcode, state: payloadState(), fields: buildFields() });
      if (!r.ok) throw new Error(r.error || "Submit failed");
      state.submittedAt = r.submittedAt; state.edited = false; unsynced = false; persist();
      setStatus("Submitted ✓");
    } finally { submitting = false; }
  }

  // ---------- timer ----------
  function tick() {
    if (!state) return;
    const el = $("#timer"), ms = remainingMs();
    el.textContent = ms > 0 ? "⏱ " + fmt(ms) : "Time is over";
    el.classList.toggle("warn", ms > 0 && ms < 5 * 60000);
    if (ms <= 0 && !timeUpFired) {
      timeUpFired = true;
      const needs = !state.submittedAt || state.edited;
      if (needs) submit().then(route, () => { timeUpFired = false; });
      else route();
    }
  }

  // ---------- pages ----------
  function route() {
    let p = (location.hash || "").slice(1);
    if (!PAGES.includes(p)) p = "menu";
    if (!state) p = "login";
    else if (p === "login") p = "menu";
    if (location.hash !== "#" + p) { location.replace("#" + p); return; }

    PAGES.forEach((n) => { $("#page-" + n).hidden = n !== p; });
    if (!state) {
      document.body.className = "neutral"; $("#topbar").hidden = true;
    } else {
      document.body.className = state.set;
      $("#topbar").hidden = false;
      $("#who-name").textContent = state.name;
      $("#who-id").textContent = state.id;
      $("#who-set").textContent = "Set " + state.set.charAt(0).toUpperCase() + state.set.slice(1);
      if (!sessionStarted) {
        sessionStarted = true;
        setInterval(tick, 1000); setInterval(sync, 10000);
        window.addEventListener("beforeunload", () => { if (unsynced) sync(); });
      }
      tick();
    }
    if (p === "menu") renderMenu();
    if (p === "written") renderWritten();
    if (p === "viva") renderViva();
    window.scrollTo(0, 0);
  }

  function renderMenu() {
    const s = state;
    const answered = s.written.filter((x) => x.trim()).length;
    $("#wInfo").textContent = answered + " of " + s.written.length + " questions answered";
    $("#vInfo").textContent = s.viva.answers.length + " of " + s.viva.questions.length + " questions answered";
    const msg = $("#msg"); msg.className = ""; msg.textContent = "";
    $("#submitBtn").disabled = false;
    if (locked()) {
      msg.className = "ok"; msg.textContent = "Time is over. Your answers have been submitted.";
      $("#submitBtn").disabled = true;
    } else if (s.submittedAt) {
      msg.className = "ok";
      msg.textContent = "Submitted at " + new Date(s.submittedAt).toLocaleTimeString() +
        (s.edited ? " (you changed answers since - submit again to update)" : ".");
    }
  }

  function treeSvg(root) {
    const SLOT = 104, GAPY = 60, H = 30;
    let leaf = 0, maxD = 0;
    const nodes = [], edges = [];
    (function walk(n, d) {
      maxD = Math.max(maxD, d);
      const kids = n.c || [];
      if (!kids.length) n.x = leaf++ * SLOT + SLOT / 2;
      else { kids.forEach((k) => walk(k, d + 1)); n.x = (kids[0].x + kids[kids.length - 1].x) / 2; }
      n.y = d * GAPY + 6; nodes.push(n);
      kids.forEach((k) => edges.push([n, k]));
    })(root, 0);
    const W = leaf * SLOT, Ht = maxD * GAPY + H + 12;
    const nw = (n) => Math.max(44, n.n.length * 8 + 18);
    const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");
    let out = '<svg class="tree" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + Ht + '" style="width:100%;max-width:' + W + 'px">';
    edges.forEach(([p, k]) => {
      out += '<path class="tedge" d="M' + p.x + " " + (p.y + H) + "V" + (p.y + H + k.y) / 2 + "H" + k.x + "V" + k.y + '"/>';
    });
    nodes.forEach((n) => {
      const w = nw(n);
      out += '<g class="tnode' + (n.file ? " tfile" : "") + (n === root ? " troot" : "") + '">' +
        '<rect x="' + (n.x - w / 2) + '" y="' + n.y + '" width="' + w + '" height="' + H + '" rx="7"/>' +
        '<text x="' + n.x + '" y="' + (n.y + H / 2 + 4.5) + '" text-anchor="middle">' + esc(n.n) + "</text></g>";
    });
    return out + "</svg>";
  }

  function renderWritten() {
    const s = state, list = $("#list"), intros = (CONFIG.WRITTEN_INTRO || {})[s.set] || {};
    list.innerHTML = "";
    CONFIG.WRITTEN[s.set].forEach((q, i) => {
      const it = intros[i + 1];
      if (it) {
        const h = document.createElement("div"); h.className = "intro";
        if (typeof it === "string") h.textContent = it;
        else {
          const t = document.createElement("div"); t.className = "ttitle"; t.textContent = it.title || "";
          const g = document.createElement("div"); g.className = "tsvg"; g.innerHTML = treeSvg(it.tree);
          h.append(t, g);
          if (it.note) { const n = document.createElement("div"); n.className = "tnote"; n.textContent = it.note; h.append(n); }
        }
        list.append(h);
      }
      const d = document.createElement("div"); d.className = "q";
      const p = document.createElement("p"); p.textContent = (i + 1) + ". " + q;
      const ta = document.createElement("textarea");
      ta.placeholder = "Type your answer here..."; ta.value = s.written[i] || ""; ta.readOnly = locked();
      ta.addEventListener("input", () => { s.written[i] = ta.value; change(); });
      d.append(p, ta); list.append(d);
    });
  }

  function bubble(cls, text) {
    const b = document.createElement("div"); b.className = "bubble " + cls; b.textContent = text; $("#chat").append(b);
  }
  function renderViva() {
    const v = state.viva, n = v.questions.length, chat = $("#chat");
    chat.innerHTML = "";
    v.questions.forEach((q, i) => {
      if (i > v.answers.length) return;
      bubble("bot", "Question " + (i + 1) + " of " + n + ":\n" + q);
      if (i < v.answers.length) bubble("me", v.answers[i]);
    });
    const done = v.answers.length >= n;
    if (done) bubble("bot", "That was the last question. Viva finished. Go back to the menu and submit your exam paper.");
    $("#composer").style.display = (done || locked()) ? "none" : "flex";
    chat.scrollTop = chat.scrollHeight;
  }
  function sendViva() {
    if (locked()) return;
    const input = $("#input"), t = input.value.trim();
    if (!t) return;
    state.viva.answers.push(t);
    input.value = ""; change(); renderViva(); input.focus();
  }

  // ---------- start ----------
  $("#title").textContent = CONFIG.EXAM_TITLE;
  document.title = CONFIG.EXAM_TITLE;

  $("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = $("#loginErr"), btn = $("#loginBtn");
    err.textContent = ""; btn.disabled = true; btn.textContent = "Checking...";
    try {
      await login($("#name").value.trim(), $("#sid").value.trim(), Number($("#col").value), $("#pass").value.trim());
      $("#pass").value = "";
      location.hash = "#menu"; route();
    } catch (ex) { err.textContent = ex.message; }
    btn.disabled = false; btn.textContent = "Start Exam";
  });

  $("#submitBtn").addEventListener("click", async (e) => {
    if (!confirm("Submit your exam paper now?")) return;
    const b = e.target; b.disabled = true; b.textContent = "Submitting...";
    try { await submit(); renderMenu(); }
    catch (ex) { alert("Could not submit: " + ex.message + "\nCheck your internet and press Submit again."); }
    b.textContent = "Submit Exam Paper"; b.disabled = locked();
  });

  $("#exitBtn").addEventListener("click", () => {
    if (!confirm("Log out on this device? You can log in again later and continue.")) return;
    localStorage.removeItem(KEY); state = null;
    $("#loginForm").reset(); location.hash = "#login"; route();
  });

  $("#send").addEventListener("click", sendViva);
  $("#input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendViva(); }
  });

  window.addEventListener("hashchange", route);
  load();
  route();
})();
