/* =========================================================
   AVENTRA STUDY
   COMPLETE REPAIRED JAVASCRIPT
   Works with the supplied Aventra index.html
   Class 6–12
   Real PDF storage with IndexedDB
   Local progress storage
   Homework
   10 quizzes
   Mira AI foundation
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const API_URL = "https://aventra-pearl.vercel.app/";
const STORAGE_KEY = "aventraStudyData";

const PDF_DB_NAME = "AventraPDFDatabase";
const PDF_DB_VERSION = 1;
const PDF_STORE_NAME = "pdfFiles";

/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_DATA = {
    profile: {
        name: "Student",
        class: 6,
        theme: "light"
    },

    dailyGoal: 60,
    studyMinutes: 0,
    streak: 0,
    xp: 0,

    classData: {},
    subjects: {},

    homework: [],
    timetable: [],

    pdfs: [],
    activity: [],

    quizResults: {},
    aiQuizResults: [],

    achievements: {},

    chat: [],

    notifications: []
};

/* =========================================================
   SUBJECTS
========================================================= */

const CLASS_SUBJECTS = {
    6: [
        ["Mathematics", "📐"],
        ["Science", "🔬"],
        ["English", "📖"],
        ["Hindi", "📝"],
        ["Social Science", "🌍"],
        ["Computer", "💻"]
    ],

    7: [
        ["Mathematics", "📐"],
        ["Science", "🔬"],
        ["English", "📖"],
        ["Hindi", "📝"],
        ["Social Science", "🌍"],
        ["Computer", "💻"]
    ],

    8: [
        ["Mathematics", "📐"],
        ["Science", "🔬"],
        ["English", "📖"],
        ["Hindi", "📝"],
        ["Social Science", "🌍"],
        ["Computer", "💻"]
    ],

    9: [
        ["Mathematics", "📐"],
        ["Science", "🔬"],
        ["English", "📖"],
        ["Hindi", "📝"],
        ["Social Science", "🌍"],
        ["Computer", "💻"]
    ],

    10: [
        ["Mathematics", "📐"],
        ["Science", "🔬"],
        ["English", "📖"],
        ["Hindi", "📝"],
        ["Social Science", "🌍"],
        ["Computer", "💻"]
    ],

    11: [
        ["Mathematics", "📐"],
        ["Physics", "⚛️"],
        ["Chemistry", "🧪"],
        ["English", "📖"],
        ["Computer Science", "💻"],
        ["Biology", "🧬"]
    ],

    12: [
        ["Mathematics", "📐"],
        ["Physics", "⚛️"],
        ["Chemistry", "🧪"],
        ["English", "📖"],
        ["Computer Science", "💻"],
        ["Biology", "🧬"]
    ]
};

/* =========================================================
   QUIZ DATA
========================================================= */

const QUIZZES = {
    6: [
        {
            id: "math-6",
            title: "Mathematics Basics",
            subject: "Mathematics",
            icon: "📐",
            questions: [
                {
                    q: "What is 12 × 5?",
                    options: ["50", "60", "70", "80"],
                    answer: 1
                },
                {
                    q: "Which number is prime?",
                    options: ["12", "15", "17", "21"],
                    answer: 2
                },
                {
                    q: "What is 100 ÷ 4?",
                    options: ["20", "25", "30", "40"],
                    answer: 1
                }
            ]
        },

        {
            id: "science-6",
            title: "Science Explorer",
            subject: "Science",
            icon: "🔬",
            questions: [
                {
                    q: "Which organ helps humans breathe?",
                    options: ["Heart", "Lungs", "Stomach", "Brain"],
                    answer: 1
                },
                {
                    q: "Plants prepare food by which process?",
                    options: [
                        "Respiration",
                        "Photosynthesis",
                        "Digestion",
                        "Evaporation"
                    ],
                    answer: 1
                },
                {
                    q: "Which is a natural source of light?",
                    options: ["Bulb", "Candle", "Sun", "Torch"],
                    answer: 2
                }
            ]
        },

        {
            id: "english-6",
            title: "English Grammar",
            subject: "English",
            icon: "📖",
            questions: [
                {
                    q: "Choose the noun: 'The girl reads a book.'",
                    options: ["reads", "the", "girl", "a"],
                    answer: 2
                },
                {
                    q: "What is the past tense of 'go'?",
                    options: ["goed", "went", "going", "goes"],
                    answer: 1
                },
                {
                    q: "Which word is an adjective?",
                    options: ["beautiful", "run", "quickly", "sing"],
                    answer: 0
                }
            ]
        },

        {
            id: "hindi-6",
            title: "Hindi Practice",
            subject: "Hindi",
            icon: "📝",
            questions: [
                {
                    q: "‘जल’ का समानार्थी शब्द क्या है?",
                    options: ["आकाश", "पानी", "अग्नि", "धरती"],
                    answer: 1
                },
                {
                    q: "‘दिन’ का विलोम क्या है?",
                    options: ["सुबह", "शाम", "रात", "दोपहर"],
                    answer: 2
                },
                {
                    q: "‘सुंदर’ किस प्रकार का शब्द है?",
                    options: ["संज्ञा", "सर्वनाम", "विशेषण", "क्रिया"],
                    answer: 2
                }
            ]
        },

        {
            id: "sst-6",
            title: "Social Science",
            subject: "Social Science",
            icon: "🌍",
            questions: [
                {
                    q: "Which planet do we live on?",
                    options: ["Mars", "Earth", "Venus", "Jupiter"],
                    answer: 1
                },
                {
                    q: "A map represents what?",
                    options: [
                        "A place",
                        "A person",
                        "A sound",
                        "A story"
                    ],
                    answer: 0
                },
                {
                    q: "Which is a continent?",
                    options: ["India", "Asia", "Delhi", "Ganga"],
                    answer: 1
                }
            ]
        },

        {
            id: "computer-6",
            title: "Computer Basics",
            subject: "Computer",
            icon: "💻",
            questions: [
                {
                    q: "What does CPU stand for?",
                    options: [
                        "Central Processing Unit",
                        "Computer Power Unit",
                        "Central Program Utility",
                        "Control Processing User"
                    ],
                    answer: 0
                },
                {
                    q: "Which device is used to type?",
                    options: ["Monitor", "Keyboard", "Speaker", "Printer"],
                    answer: 1
                },
                {
                    q: "Which is an input device?",
                    options: ["Mouse", "Monitor", "Speaker", "Projector"],
                    answer: 0
                }
            ]
        }
    ]
};

/* =========================================================
   STATE
========================================================= */

let data = loadData();

let currentQuiz = null;
let currentQuestion = 0;
let currentQuizScore = 0;

let studyTimer = null;
let studySeconds = 0;

let toastTimer = null;
let miraInitialized = false;

/* =========================================================
   HELPERS
========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);

function createID() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).slice(2, 9)
    );
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatBytes(bytes) {
    const value = Number(bytes) || 0;

    if (value === 0) {
        return "0 Bytes";
    }

    const units = ["Bytes", "KB", "MB", "GB"];

    const index = Math.min(
        Math.floor(Math.log(value) / Math.log(1024)),
        units.length - 1
    );

    return `${(
        value / Math.pow(1024, index)
    ).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function formatDate(dateValue) {
    if (!dateValue) {
        return "No date";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return String(dateValue);
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function formatTime(timeValue) {
    if (!timeValue) {
        return "";
    }

    const parts = String(timeValue).split(":");

    if (parts.length < 2) {
        return timeValue;
    }

    let hour = Number(parts[0]);
    const minute = parts[1];

    const suffix = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
        hour = 12;
    }

    return `${hour}:${minute} ${suffix}`;
}

function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
}

/* =========================================================
   DATA
========================================================= */

function createEmptyClassData(classNumber) {
    const subjects = {};

    const classSubjects =
        CLASS_SUBJECTS[classNumber] ||
        CLASS_SUBJECTS[6];

    classSubjects.forEach(([name]) => {
        subjects[name] = {
            progress: 0,
            studiedMinutes: 0,
            quizzes: 0
        };
    });

    return {
        subjects
    };
}

function createDefaultData() {
    const result = cloneData(DEFAULT_DATA);

    result.classData = {};

    Object.keys(CLASS_SUBJECTS).forEach(classNumber => {
        result.classData[classNumber] =
            createEmptyClassData(Number(classNumber));
    });

    result.profile.class = 6;

    result.subjects =
        result.classData["6"].subjects;

    return result;
}

function mergeData(defaults, saved) {
    const merged = {
        ...defaults,
        ...(saved || {})
    };

    merged.profile = {
        ...defaults.profile,
        ...((saved && saved.profile) || {})
    };

    merged.classData = {
        ...defaults.classData,
        ...((saved && saved.classData) || {})
    };

    Object.keys(CLASS_SUBJECTS).forEach(classNumber => {
        if (!merged.classData[classNumber]) {
            merged.classData[classNumber] =
                createEmptyClassData(Number(classNumber));
        }

        if (!merged.classData[classNumber].subjects) {
            merged.classData[classNumber].subjects = {};
        }

        const subjects =
            merged.classData[classNumber].subjects;

        CLASS_SUBJECTS[classNumber].forEach(([name]) => {
            if (!subjects[name]) {
                subjects[name] = {
                    progress: 0,
                    studiedMinutes: 0,
                    quizzes: 0
                };
            }
        });
    });

    merged.homework =
        Array.isArray(saved?.homework)
            ? saved.homework
            : [];

    merged.timetable =
        Array.isArray(saved?.timetable)
            ? saved.timetable
            : [];

    merged.pdfs =
        Array.isArray(saved?.pdfs)
            ? saved.pdfs
            : [];

    merged.activity =
        Array.isArray(saved?.activity)
            ? saved.activity
            : [];

    merged.chat =
        Array.isArray(saved?.chat)
            ? saved.chat
            : [];

    merged.notifications =
        Array.isArray(saved?.notifications)
            ? saved.notifications
            : [];

    merged.achievements =
        saved?.achievements || {};

    merged.quizResults =
        saved?.quizResults &&
        !Array.isArray(saved.quizResults)
            ? saved.quizResults
            : {};

    merged.aiQuizResults =
        Array.isArray(saved?.aiQuizResults)
            ? saved.aiQuizResults
            : [];

    const currentClass =
        String(Number(merged.profile.class) || 6);

    merged.subjects =
        merged.classData[currentClass].subjects;

    return merged;
}

function loadData() {
    try {
        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return createDefaultData();
        }

        return mergeData(
            createDefaultData(),
            JSON.parse(saved)
        );
    } catch (error) {
        console.error(
            "Aventra data load error:",
            error
        );

        return createDefaultData();
    }
}

function saveData() {
    try {
        const currentClass =
            String(getCurrentClass());

        if (
            data.classData &&
            data.classData[currentClass]
        ) {
            data.classData[currentClass].subjects =
                data.subjects || {};
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

if (
    document
        .getElementById("page-progress")
        ?.classList.contains("active-page")
) {
    renderProgressPage();
}

    } catch (error) {
        console.error(
            "Could not save Aventra data:",
            error
        );
    }
}



/* =========================================================
   CLASS
========================================================= */

function getCurrentClass() {
    return Number(data.profile.class) || 6;
}

function getCurrentClassKey() {
    return String(getCurrentClass());
}

function getCurrentSubjects() {
    return (
        CLASS_SUBJECTS[getCurrentClass()] ||
        CLASS_SUBJECTS[6]
    );
}

function ensureSubjectsForClass() {
    const classNumber = getCurrentClass();
    const classKey = String(classNumber);

    if (!data.classData) {
        data.classData = {};
    }

    if (!data.classData[classKey]) {
        data.classData[classKey] =
            createEmptyClassData(classNumber);
    }

    const subjects =
        data.classData[classKey].subjects;

    CLASS_SUBJECTS[classNumber].forEach(([name]) => {
        if (!subjects[name]) {
            subjects[name] = {
                progress: 0,
                studiedMinutes: 0,
                quizzes: 0
            };
        }
    });

    const validSubjects = new Set(
        CLASS_SUBJECTS[classNumber].map(
            ([name]) => name
        )
    );

    Object.keys(subjects).forEach(name => {
        if (!validSubjects.has(name)) {
            delete subjects[name];
        }
    });

    data.subjects = subjects;

    saveData();
}

function changeStudentClass(newClass) {
    const classNumber = Number(newClass);

    if (!CLASS_SUBJECTS[classNumber]) {
        return;
    }

    const oldClass = getCurrentClassKey();

    if (
        data.classData &&
        data.classData[oldClass]
    ) {
        data.classData[oldClass].subjects =
            data.subjects || {};
    }

    data.profile.class = classNumber;

    if (!data.classData[String(classNumber)]) {
        data.classData[String(classNumber)] =
            createEmptyClassData(classNumber);
    }

    data.subjects =
        data.classData[String(classNumber)].subjects;

    ensureSubjectsForClass();

    updateProfileUI();

    renderAll();

    addActivity(
        `Switched to Class ${classNumber}`,
        "🎓"
    );

    showToast(
        `Now studying in Class ${classNumber}`,
        "🎓"
    );
}

/* =========================================================
   PROGRESS
========================================================= */

function calculateOverallProgress() {
    const subjects = getCurrentSubjects();

    if (!subjects.length) {
        return 0;
    }

    const total = subjects.reduce(
        (sum, [name]) => {
            return (
                sum +
                Number(
                    data.subjects[name]?.progress || 0
                )
            );
        },
        0
    );

    return Math.round(
        total / subjects.length
    );
}

function updateSubjectProgress(
    subject,
    amount
) {
    if (!data.subjects[subject]) {
        return;
    }

    data.subjects[subject].progress =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    data.subjects[subject].progress
                ) + Number(amount)
            )
        );

    saveData();

    renderAll();
}

/* =========================================================
   ACTIVITY
========================================================= */

function addActivity(
    text,
    icon = "✨"
) {
    if (!Array.isArray(data.activity)) {
        data.activity = [];
    }

    data.activity.unshift({
        id: createID(),
        text,
        icon,
        classNumber: getCurrentClass(),
        time: new Date().toISOString()
    });

    data.activity =
        data.activity.slice(0, 30);

    saveData();
}

/* =========================================================
   XP
========================================================= */

function addXP(amount, reason = "") {
    const value = Math.max(
        0,
        Number(amount) || 0
    );

    data.xp =
        Number(data.xp || 0) + value;

    if (reason) {
        addActivity(
            `${reason} +${value} XP`,
            "⭐"
        );
    }

    saveData();

    updateDashboard();
    updateAchievements();
}

/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {
    $$(".nav-item").forEach(button => {
        if (
            button.dataset.navigationReady ===
            "true"
        ) {
            return;
        }

        button.dataset.navigationReady = "true";

        button.addEventListener(
            "click",
            () => {
                const page =
                    button.dataset.page;

                if (page) {
                    navigateTo(page);
                }
            }
        );
    });

    $$("[data-page-link]").forEach(button => {
        if (
            button.dataset.navigationReady ===
            "true"
        ) {
            return;
        }

        button.dataset.navigationReady = "true";

        button.addEventListener(
            "click",
            event => {
                event.preventDefault();

                const page =
                    button.dataset.pageLink;

                if (page) {
                    navigateTo(page);
                }
            }
        );
    });

    $$("[data-page-action]").forEach(button => {
        if (
            button.dataset.navigationReady ===
            "true"
        ) {
            return;
        }

        button.dataset.navigationReady = "true";

        button.addEventListener(
            "click",
            () => {
                const page =
                    button.dataset.pageAction;

                if (page) {
                    navigateTo(page);
                }
            }
        );
    });

    $("#topProfileButton")?.addEventListener(
        "click",
        () => navigateTo("settings")
    );
}

function navigateTo(pageName) {
    $$(".page").forEach(page => {
        page.classList.remove(
            "active-page"
        );
    });

    const target =
        $(`#page-${pageName}`);

    if (!target) {
        return;
    }

    target.classList.add(
        "active-page"
    );

    if (pageName === "progress") {
    setTimeout(() => {
        renderProgressPage();
    }, 50);
}

    $$(".nav-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page ===
                pageName
        );
    });

    const titles = {
        dashboard: "Dashboard",
        "ai-teacher": "AI Teacher",
        subjects: "My Subjects",
        "pdf-library": "PDF Library",
        homework: "Homework",
        quizzes: "Tests & Quizzes",
        progress: "My Progress",
        achievements: "Achievements",
        timetable: "Timetable",
        "live-class": "Live Class",
        batch: "My Batch",
        settings: "Settings"
    };

    if ($("#pageTitle")) {
        $("#pageTitle").textContent =
            titles[pageName] || "Aventra";
    }

    closeSidebar();

    if (pageName === "dashboard") {
        updateDashboard();
    }

    if (pageName === "subjects") {
        renderSubjects();
    }

    if (pageName === "pdf-library") {
        renderPDFLists();
        populateSubjectSelects();
    }

    if (pageName === "homework") {
        renderHomework();
        populateSubjectSelects();
    }

    if (pageName === "quizzes") {
        renderQuizLibrary();
        populateSubjectSelects();
    }

    if (pageName === "progress") {
        renderProgress();
    }

    if (pageName === "achievements") {
        renderAchievements();
    }

    if (pageName === "timetable") {
        renderTimetable();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function openPage(pageName) {
    navigateTo(pageName);
}

/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {
    const menuButton =
        $("#menuButton");

    const sidebar =
        $("#sidebar");

    const overlay =
        $("#sidebarOverlay");

    menuButton?.addEventListener(
        "click",
        () => {
            sidebar?.classList.toggle(
                "open"
            );

            overlay?.classList.toggle(
                "show"
            );
        }
    );

    overlay?.addEventListener(
        "click",
        closeSidebar
    );
}

function closeSidebar() {
    $("#sidebar")?.classList.remove(
        "open"
    );

    $("#sidebarOverlay")?.classList.remove(
        "show"
    );
}

/* =========================================================
   PROFILE UI
========================================================= */

function updateProfileUI() {
    const name =
        data.profile.name ||
        "Student";

    const classNumber =
        getCurrentClass();

    $("#sidebarStudentName")?.replaceChildren(
        document.createTextNode(name)
    );

    $("#topStudentName")?.replaceChildren(
        document.createTextNode(name)
    );

    $("#dashboardStudentName")?.replaceChildren(
        document.createTextNode(name)
    );

    if ($("#studentNameInput")) {
        $("#studentNameInput").value =
            name;
    }

    if ($("#settingsName")) {
        $("#settingsName").textContent =
            name;
    }

    if ($("#sidebarStudentClass")) {
        $("#sidebarStudentClass").textContent =
            `Class ${classNumber}`;
    }

    if ($("#topStudentClass")) {
        $("#topStudentClass").textContent =
            `Class ${classNumber}`;
    }

    if ($("#batchName")) {
        $("#batchName").textContent =
            `Aventra Class ${classNumber}`;
    }

    if ($("#classSelector")) {
        $("#classSelector").value =
            String(classNumber);
    }

    if ($("#dailyGoalInput")) {
        $("#dailyGoalInput").value =
            data.dailyGoal || 60;
    }

    if ($("#themeSelector")) {
        $("#themeSelector").value =
            data.profile.theme ||
            "light";
    }

    updateAvatarLetters(name);
}

function updateAvatarLetters(name) {
    const letter =
        String(name || "Student")
            .trim()
            .charAt(0)
            .toUpperCase() || "S";

    $$(".profile-avatar, .top-avatar, .settings-avatar")
        .forEach(element => {
            element.textContent =
                letter;
        });
}

/* =========================================================
   THEME
========================================================= */

function applyTheme() {
    const theme =
        data.profile.theme ||
        "light";

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    document.body?.setAttribute(
        "data-theme",
        theme
    );
}

/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    icon = "✓"
) {
    const toast =
        $("#toast");

    const toastMessage =
        $("#toastMessage");

    const toastIcon =
        $("#toastIcon");

    if (!toast) {
        console.log(message);
        return;
    }

    if (toastMessage) {
        toastMessage.textContent =
            message;
    }

    if (toastIcon) {
        toastIcon.textContent =
            icon;
    }

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {
            toast.classList.remove(
                "show"
            );
        }, 3000);
}

/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {
    const subjects =
        getCurrentSubjects();

    const progress =
        calculateOverallProgress();

    if ($("#dashboardSubjects")) {
        $("#dashboardSubjects").textContent =
            subjects.length;
    }

    if ($("#dashboardProgress")) {
        $("#dashboardProgress").textContent =
            progress;
    }

    if ($("#dashboardStreak")) {
        $("#dashboardStreak").textContent =
            Number(data.streak || 0);
    }

    if ($("#dashboardXP")) {
        $("#dashboardXP").textContent =
            Number(data.xp || 0);
    }

    if ($("#goalMinutes")) {
        $("#goalMinutes").textContent =
            Number(
                data.studyMinutes || 0
            );
    }

    if ($("#goalTarget")) {
        $("#goalTarget").textContent =
            Number(
                data.dailyGoal || 60
            );
    }

    const goal =
        Math.max(
            1,
            Number(
                data.dailyGoal || 60
            )
        );

    const minutes =
        Number(
            data.studyMinutes || 0
        );

    const goalPercent =
        Math.min(
            100,
            Math.round(
                (minutes / goal) * 100
            )
        );

    if ($("#goalPercentage")) {
        $("#goalPercentage").textContent =
            goalPercent;
    }

    updateGoalCircle(goalPercent);

    renderDashboardSubjects();
    renderRecentActivity();
    renderUpcomingClasses();
}

function updateGoalCircle(percent) {
    const circle =
        $("#goalCircle");

    if (!circle) {
        return;
    }

    const radius = 50;

    const circumference =
        2 * Math.PI * radius;

    circle.style.strokeDasharray =
        circumference;

    circle.style.strokeDashoffset =
        circumference -
        (percent / 100) *
            circumference;
}

function renderDashboardSubjects() {
    const container =
        $("#dashboardSubjectList");

    if (!container) {
        return;
    }

    const subjects =
        getCurrentSubjects();

    if (!subjects.length) {
        container.innerHTML =
            `<div class="empty-state">
                No subjects available.
            </div>`;

        return;
    }

    container.innerHTML =
        subjects
            .map(([name, icon]) => {
                const progress =
                    Number(
                        data.subjects[name]
                            ?.progress || 0
                    );

                return `
                    <div class="subject-progress-item">
                        <div class="subject-progress-top">
                            <div class="subject-name">
                                <span>${icon}</span>
                                <strong>${escapeHTML(name)}</strong>
                            </div>

                            <strong>${progress}%</strong>
                        </div>

                        <div class="progress-track">
                            <div
                                class="progress-fill"
                                style="width:${progress}%"
                            ></div>
                        </div>
                    </div>
                `;
            })
            .join("");
}

function renderRecentActivity() {
    const container =
        $("#recentActivity");

    if (!container) {
        return;
    }

    const currentClass =
        getCurrentClass();

    const activities =
        data.activity
            .filter(
                item =>
                    Number(
                        item.classNumber
                    ) === currentClass
            )
            .slice(0, 6);

    if (!activities.length) {
        container.innerHTML =
            `<div class="empty-state">
                <span>✨</span>
                <p>Your learning activity will appear here.</p>
            </div>`;

        return;
    }

    container.innerHTML =
        activities
            .map(item => {
                return `
                    <div class="activity-item">
                        <div class="activity-icon">
                            ${escapeHTML(item.icon)}
                        </div>

                        <div class="activity-info">
                            <strong>
                                ${escapeHTML(item.text)}
                            </strong>

                            <span>
                                ${formatDate(item.time)}
                            </span>
                        </div>
                    </div>
                `;
            })
            .join("");
}

function renderUpcomingClasses() {
    const container =
        $("#upcomingClasses");

    if (!container) {
        return;
    }

    const currentClass =
        getCurrentClass();

    const classes =
        data.timetable
            .filter(
                item =>
                    Number(
                        item.classNumber
                    ) === currentClass
            )
            .slice(0, 5);

    if (!classes.length) {
        container.innerHTML =
            `<div class="empty-state">
                <span>🗓️</span>
                <p>No classes added yet.</p>
            </div>`;

        return;
    }

    container.innerHTML =
        classes
            .map(item => {
                return `
                    <div class="upcoming-item">
                        <div class="upcoming-time">
                            ${escapeHTML(
                                formatTime(item.time)
                            )}
                        </div>

                        <div class="upcoming-info">
                            <strong>
                                ${escapeHTML(item.title)}
                            </strong>

                            <span>
                                ${escapeHTML(item.subject)}
                            </span>
                        </div>
                    </div>
                `;
            })
            .join("");
}

/* =========================================================
   START STUDY
========================================================= */

function setupStudyButton() {
    $("#startStudyButton")?.addEventListener(
        "click",
        () => {
            if (studyTimer) {
                stopStudySession();
                return;
            }

            startStudySession();
        }
    );
}

function startStudySession() {
    if (studyTimer) {
        return;
    }

    studySeconds = 0;

    const button =
        $("#startStudyButton");

    if (button) {
        button.innerHTML =
            `<span>⏹️</span> Stop Studying`;
    }

    showToast(
        "Study session started!",
        "🚀"
    );

    studyTimer =
        setInterval(() => {
            studySeconds++;

            if (
                studySeconds % 60 === 0
            ) {
                data.studyMinutes =
                    Number(
                        data.studyMinutes || 0
                    ) + 1;

                data.streak =
                    Math.max(
                        1,
                        Number(
                            data.streak || 0
                        )
                    );

                addXP(
                    2,
                    "Study time"
                );

                saveData();
                updateDashboard();
            }
        }, 1000);
}

function stopStudySession() {
    if (!studyTimer) {
        return;
    }

    clearInterval(studyTimer);

    studyTimer = null;

    const minutes =
        Math.floor(
            studySeconds / 60
        );

    if (minutes > 0) {
        data.studyMinutes += minutes;

        addXP(
            minutes * 2,
            "Study session completed"
        );

        addActivity(
            `Studied for ${minutes} minute${minutes === 1 ? "" : "s"}`,
            "📚"
        );
    }

    studySeconds = 0;

    const button =
        $("#startStudyButton");

    if (button) {
        button.innerHTML =
            `<span>🚀</span> Start Studying`;
    }

    saveData();
    updateDashboard();

    showToast(
        "Study session saved!",
        "📚"
    );
}

/* =========================================================
   SUBJECTS PAGE
========================================================= */

function renderSubjects() {
    const container =
        $("#subjectsGrid");

    if (!container) {
        return;
    }

    const subjects =
        getCurrentSubjects();

    container.innerHTML =
        subjects
            .map(([name, icon]) => {
                const subject =
                    data.subjects[name] ||
                    {
                        progress: 0,
                        studiedMinutes: 0,
                        quizzes: 0
                    };

                return `
                    <div class="glass-card subject-card">

                        <div class="subject-card-icon">
                            ${icon}
                        </div>

                        <div class="subject-card-content">
                            <span class="eyebrow">
                                CLASS ${getCurrentClass()}
                            </span>

                            <h3>
                                ${escapeHTML(name)}
                            </h3>

                            <div class="subject-progress-top">
                                <span>Progress</span>
                                <strong>
                                    ${Number(subject.progress || 0)}%
                                </strong>
                            </div>

                            <div class="progress-track">
                                <div
                                    class="progress-fill"
                                    style="width:${Number(subject.progress || 0)}%"
                                ></div>
                            </div>

                            <div class="subject-meta">
                                <span>
                                    📚 ${Number(subject.studiedMinutes || 0)} min
                                </span>

                                <span>
                                    🧠 ${Number(subject.quizzes || 0)} quizzes
                                </span>
                            </div>

                            <button
                                class="secondary-btn subject-study-button"
                                type="button"
                                data-subject="${escapeHTML(name)}"
                            >
                                Study ${escapeHTML(name)}
                            </button>
                        </div>

                    </div>
                `;
            })
            .join("");

    $$(".subject-study-button").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    const subject =
                        button.dataset.subject;

                    openSubjectInMira(
                        subject
                    );
                }
            );
        }
    );
}

function openSubjectInMira(subject) {
    navigateTo("ai-teacher");

    const input =
        $("#chatInput");

    if (input) {
        input.value =
            `Help me study ${subject} for Class ${getCurrentClass()}.`;
        input.focus();
    }
}

/* =========================================================
   SUBJECT SELECTS
========================================================= */

function populateSubjectSelects() {
    const subjects =
        getCurrentSubjects();

    const selects = [
        $("#aiPdfSubject"),
        $("#homeworkSubject"),
        $("#aiQuizSubject"),
        $("#classSubject")
    ];

    selects.forEach(select => {
        if (!select) {
            return;
        }

        const current =
            select.value;

        select.innerHTML =
            `<option value="">Select Subject</option>` +
            subjects
                .map(
                    ([name]) =>
                        `<option value="${escapeHTML(name)}">
                            ${escapeHTML(name)}
                        </option>`
                )
                .join("");

        if (
            current &&
            subjects.some(
                ([name]) =>
                    name === current
            )
        ) {
            select.value =
                current;
        }
    });

    updateHomeworkAIPreview();
}

/* =========================================================
   PDF DATABASE
========================================================= */

let pdfDatabasePromise = null;

function openPDFDatabase() {
    if (pdfDatabasePromise) {
        return pdfDatabasePromise;
    }

    pdfDatabasePromise =
        new Promise(
            (resolve, reject) => {
                if (!("indexedDB" in window)) {
                    reject(
                        new Error(
                            "IndexedDB is not supported."
                        )
                    );

                    return;
                }

                const request =
                    indexedDB.open(
                        PDF_DB_NAME,
                        PDF_DB_VERSION
                    );

                request.onupgradeneeded =
                    event => {
                        const db =
                            event.target.result;

                        if (
                            !db.objectStoreNames.contains(
                                PDF_STORE_NAME
                            )
                        ) {
                            const store =
                                db.createObjectStore(
                                    PDF_STORE_NAME,
                                    {
                                        keyPath:
                                            "id"
                                    }
                                );

                            store.createIndex(
                                "classNumber",
                                "classNumber",
                                {
                                    unique: false
                                }
                            );

                            store.createIndex(
                                "addedAt",
                                "addedAt",
                                {
                                    unique: false
                                }
                            );
                        }
                    };

                request.onsuccess = () => {
                    resolve(
                        request.result
                    );
                };

                request.onerror = () => {
                    reject(
                        request.error ||
                            new Error(
                                "Could not open PDF database."
                            )
                    );
                };
            }
        );

    return pdfDatabasePromise;
}

async function savePDFFile(
    file,
    metadata
) {
    const db =
        await openPDFDatabase();

    return new Promise(
        (resolve, reject) => {
            const transaction =
                db.transaction(
                    PDF_STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    PDF_STORE_NAME
                );

            const request =
                store.put({
                    id: metadata.id,
                    name: metadata.name,
                    type:
                        file.type ||
                        "application/pdf",
                    size: file.size,
                    classNumber:
                        metadata.classNumber,
                    addedAt:
                        metadata.addedAt,
                    blob: file
                });

            request.onsuccess = () => {
                resolve(
                    metadata.id
                );
            };

            request.onerror = () => {
                reject(
                    request.error ||
                        new Error(
                            "Could not save PDF."
                        )
                );
            };
        }
    );
}

async function getPDFFile(pdfID) {
    const db =
        await openPDFDatabase();

    return new Promise(
        (resolve, reject) => {
            const transaction =
                db.transaction(
                    PDF_STORE_NAME,
                    "readonly"
                );

            const store =
                transaction.objectStore(
                    PDF_STORE_NAME
                );

            const request =
                store.get(pdfID);

            request.onsuccess = () => {
                resolve(
                    request.result ||
                        null
                );
            };

            request.onerror = () => {
                reject(
                    request.error ||
                        new Error(
                            "Could not open PDF."
                        )
                );
            };
        }
    );
}

async function deletePDFFile(
    pdfID
) {
    const db =
        await openPDFDatabase();

    return new Promise(
        (resolve, reject) => {
            const transaction =
                db.transaction(
                    PDF_STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    PDF_STORE_NAME
                );

            const request =
                store.delete(pdfID);

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                reject(
                    request.error ||
                        new Error(
                            "Could not delete PDF."
                        )
                );
            };
        }
    );
}

/* =========================================================
   PDF OPEN / DOWNLOAD
========================================================= */

async function openRealPDF(
    pdfID
) {
    try {
        const record =
            await getPDFFile(pdfID);

        if (!record?.blob) {
            showToast(
                "PDF file could not be found.",
                "!"
            );

            return;
        }

        const pdfURL =
            URL.createObjectURL(
                record.blob
            );

        const newWindow =
            window.open(
                pdfURL,
                "_blank"
            );

        if (!newWindow) {
            URL.revokeObjectURL(
                pdfURL
            );

            showToast(
                "Please allow pop-ups to open the PDF.",
                "!"
            );

            return;
        }

        setTimeout(() => {
            URL.revokeObjectURL(
                pdfURL
            );
        }, 60000);
    } catch (error) {
        console.error(
            "PDF open error:",
            error
        );

        showToast(
            "Could not open this PDF.",
            "!"
        );
    }
}

async function downloadRealPDF(
    pdfID
) {
    try {
        const record =
            await getPDFFile(pdfID);

        if (!record?.blob) {
            showToast(
                "PDF file could not be found.",
                "!"
            );

            return;
        }

        const url =
            URL.createObjectURL(
                record.blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            record.name ||
            "Aventra-Study.pdf";

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

        setTimeout(() => {
            URL.revokeObjectURL(
                url
            );
        }, 1000);

        showToast(
            "PDF download started.",
            "⬇️"
        );
    } catch (error) {
        console.error(
            "PDF download error:",
            error
        );

        showToast(
            "Could not download this PDF.",
            "!"
        );
    }
}

/* =========================================================
   PDF UPLOAD
========================================================= */

function setupPDFUpload() {
    $("#pdfInput")?.addEventListener(
        "change",
        async event => {
            const file =
                event.target.files?.[0];

            if (!file) {
                return;
            }

            if (
                file.type !==
                    "application/pdf" &&
                !file.name
                    .toLowerCase()
                    .endsWith(".pdf")
            ) {
                showToast(
                    "Please select a PDF file.",
                    "!"
                );

                event.target.value =
                    "";

                return;
            }

            try {
                const id =
                    createID();

                const metadata = {
                    id,
                    name: file.name,
                    classNumber:
                        getCurrentClass(),
                    addedAt:
                        new Date().toISOString(),
                    source: "upload"
                };

                await savePDFFile(
                    file,
                    metadata
                );

                data.pdfs.push(
                    metadata
                );

                saveData();

                addActivity(
                    `Added PDF: ${file.name}`,
                    "📄"
                );

                await renderPDFLists();

                showToast(
                    "PDF added to your library!",
                    "📄"
                );
            } catch (error) {
                console.error(
                    "PDF upload error:",
                    error
                );

                showToast(
                    "Could not save this PDF.",
                    "!"
                );
            }

            event.target.value = "";
        }
    );
}

/* =========================================================
   PDF LIST
========================================================= */

async function renderPDFLists() {
    const allContainer =
        $("#pdfList");

    const generatedContainer =
        $("#generatedPdfList");

    const currentClass =
        getCurrentClass();

    const currentPDFs =
        data.pdfs.filter(
            pdf =>
                Number(
                    pdf.classNumber
                ) === currentClass
        );

    const generated =
        currentPDFs.filter(
            pdf =>
                pdf.source ===
                "generated"
        );

    const uploaded =
        currentPDFs.filter(
            pdf =>
                pdf.source !==
                "generated"
        );

    if (allContainer) {
        allContainer.innerHTML =
            uploaded.length
                ? createPDFCards(uploaded)
                : `
                    <div class="empty-state">
                        <span>📄</span>
                        <p>No personal PDFs added yet.</p>
                    </div>
                `;
    }

    if (generatedContainer) {
        generatedContainer.innerHTML =
            generated.length
                ? createPDFCards(generated)
                : `
                    <div class="empty-state">
                        <span>✨</span>
                        <p>No AI-generated PDFs yet.</p>
                    </div>
                `;
    }

    bindPDFButtons();
}

function createPDFCards(pdfs) {
    return pdfs
        .map(pdf => {
            return `
                <div class="glass-card pdf-card">

                    <div class="pdf-card-icon">
                        📄
                    </div>

                    <div class="pdf-card-content">

                        <span class="eyebrow">
                            CLASS ${Number(pdf.classNumber)}
                        </span>

                        <h3>
                            ${escapeHTML(pdf.name)}
                        </h3>

                        <p>
                            ${formatBytes(pdf.size || 0)}
                            •
                            ${formatDate(pdf.addedAt)}
                        </p>

                        <div class="pdf-actions">

                            <button
                                class="primary-btn pdf-open-button"
                                type="button"
                                data-pdf-id="${escapeHTML(pdf.id)}"
                            >
                                Open
                            </button>

                            <button
                                class="secondary-btn pdf-download-button"
                                type="button"
                                data-pdf-id="${escapeHTML(pdf.id)}"
                            >
                                Download
                            </button>

                            <button
                                class="text-button pdf-delete-button"
                                type="button"
                                data-pdf-id="${escapeHTML(pdf.id)}"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            `;
        })
        .join("");
}

function bindPDFButtons() {
    $$(".pdf-open-button").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    openRealPDF(
                        button.dataset.pdfId
                    );
                }
            );
        }
    );

    $$(".pdf-download-button").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    downloadRealPDF(
                        button.dataset.pdfId
                    );
                }
            );
        }
    );

    $$(".pdf-delete-button").forEach(
        button => {
            button.addEventListener(
                "click",
                async () => {
                    await removePDF(
                        button.dataset.pdfId
                    );
                }
            );
        }
    );
}

async function removePDF(pdfID) {
    try {
        await deletePDFFile(
            pdfID
        );

        data.pdfs =
            data.pdfs.filter(
                pdf =>
                    pdf.id !==
                    pdfID
            );

        saveData();

        await renderPDFLists();

        addActivity(
            "Removed a PDF from the library",
            "🗑️"
        );

        showToast(
            "PDF deleted.",
            "🗑️"
        );
    } catch (error) {
        console.error(
            "PDF delete error:",
            error
        );

        showToast(
            "Could not delete PDF.",
            "!"
        );
    }
}

/* =========================================================
   SIMPLE PDF GENERATOR
   Creates a real readable PDF blob
========================================================= */

function escapePDFText(text) {
    return String(text || "")
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)")
        .replace(/\r?\n/g, " ");
}

function createSimplePDF(
    title,
    lines
) {
    const safeTitle =
        escapePDFText(title);

    const safeLines =
        lines.map(escapePDFText);

    let content =
        "BT\n" +
        "/F1 20 Tf\n" +
        "50 750 Td\n" +
        `(${safeTitle}) Tj\n` +
        "/F1 11 Tf\n" +
        "0 -30 Td\n";

    safeLines.forEach(
        line => {
            content +=
                `(${line}) Tj\n` +
                "0 -18 Td\n";
        }
    );

    content +=
        "ET\n";

    const objects = [];

    objects.push(
        "1 0 obj\n" +
            "<< /Type /Catalog /Pages 2 0 R >>\n" +
            "endobj\n"
    );

    objects.push(
        "2 0 obj\n" +
            "<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n" +
            "endobj\n"
    );

    objects.push(
        "3 0 obj\n" +
            "<< /Type /Page /Parent 2 0 R " +
            "/MediaBox [0 0 612 792] " +
            "/Resources << /Font << /F1 4 0 R >> >> " +
            "/Contents 5 0 R >>\n" +
            "endobj\n"
    );

    objects.push(
        "4 0 obj\n" +
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n" +
            "endobj\n"
    );

    objects.push(
        `5 0 obj\n<< /Length ${content.length} >>\nstream\n` +
            content +
            "endstream\nendobj\n"
    );

    let pdf =
        "%PDF-1.4\n";

    const offsets = [0];

    objects.forEach(
        object => {
            offsets.push(
                pdf.length
            );

            pdf += object;
        }
    );

    const xrefOffset =
        pdf.length;

    pdf +=
        `xref\n0 ${objects.length + 1}\n`;

    pdf +=
        "0000000000 65535 f \n";

    for (
        let i = 1;
        i < offsets.length;
        i++
    ) {
        pdf +=
            String(
                offsets[i]
            ).padStart(10, "0") +
            " 00000 n \n";
    }

    pdf +=
        `trailer\n<< /Size ${
            objects.length + 1
        } /Root 1 0 R >>\n`;

    pdf +=
        `startxref\n${xrefOffset}\n%%EOF`;

    return new Blob(
        [pdf],
        {
            type: "application/pdf"
        }
    );
}

/* =========================================================
   AI PDF GENERATOR
========================================================= */

function setupGeneratePDF() {
    $("#generatePdfButton")?.addEventListener(
        "click",
        generateAIPDF
    );
}

async function generateAIPDF() {
    const subject =
        $("#aiPdfSubject")?.value;

    const topic =
        $("#aiPdfTopic")?.value.trim();

    const status =
        $("#generatedPdfStatus");

    if (!subject) {
        showToast(
            "Please select a subject.",
            "!"
        );

        return;
    }

    if (!topic) {
        showToast(
            "Please enter a topic.",
            "!"
        );

        return;
    }

    if (status) {
        status.textContent =
            "Mira is creating your study PDF...";
    }

    const lines = [
        `Class ${getCurrentClass()}`,
        `Subject: ${subject}`,
        `Topic: ${topic}`,
        "",
        "Study Notes",
        "",
        `1. ${topic} is an important topic in ${subject}.`,
        "2. Read the main definitions and concepts carefully.",
        "3. Make short notes using keywords.",
        "4. Practice examples after learning the concept.",
        "5. Revise the topic regularly.",
        "",
        "Quick Revision",
        `• Remember the key ideas of ${topic}.`,
        "• Try explaining the topic in your own words.",
        "• Solve practice questions.",
        "• Review mistakes before the next test."
    ];

    try {
        const blob =
            createSimplePDF(
                `${subject} - ${topic}`,
                lines
            );

        const id =
            createID();

        const metadata = {
            id,
            name:
                `Mira-${subject}-${topic}.pdf`,
            classNumber:
                getCurrentClass(),
            addedAt:
                new Date().toISOString(),
            source:
                "generated",
            size:
                blob.size,
            subject,
            topic
        };

        await savePDFFile(
            blob,
            metadata
        );

        data.pdfs.push(
            metadata
        );

        saveData();

        await renderPDFLists();

        addXP(
            10,
            "Created a study PDF"
        );

        if (status) {
            status.textContent =
                "Your real PDF is ready!";
        }

        showToast(
            "Mira created your PDF!",
            "✨"
        );
    } catch (error) {
        console.error(
            "AI PDF error:",
            error
        );

        if (status) {
            status.textContent =
                "Could not create the PDF.";
        }

        showToast(
            "PDF generation failed.",
            "!"
        );
    }
}

/* =========================================================
   HOMEWORK
========================================================= */

function setupHomework() {
    $("#homeworkForm")?.addEventListener(
        "submit",
        event => {
            event.preventDefault();

            const title =
                $("#homeworkTitle")?.value.trim();

            const subject =
                $("#homeworkSubject")?.value;

            const dueDate =
                $("#homeworkDate")?.value;

            if (!title || !subject) {
                showToast(
                    "Please fill the homework details.",
                    "!"
                );

                return;
            }

            const item = {
                id: createID(),
                title,
                subject,
                dueDate,
                classNumber:
                    getCurrentClass(),
                completed: false,
                createdAt:
                    new Date().toISOString(),
                source: "student"
            };

            data.homework.push(
                item
            );

            saveData();

            event.target.reset();

            renderHomework();

            addXP(
                5,
                "Added homework"
            );

            showToast(
                "Homework added!",
                "📝"
            );
        }
    );

    $("#generateHomeworkButton")?.addEventListener(
        "click",
        generateAIHomework
    );

    $("#homeworkSubject")?.addEventListener(
        "change",
        updateHomeworkAIPreview
    );
}

function updateHomeworkAIPreview() {
    if ($("#homeworkAIClass")) {
        $("#homeworkAIClass").textContent =
            `Class ${getCurrentClass()}`;
    }

    if ($("#homeworkAISubject")) {
        $("#homeworkAISubject").textContent =
            $("#homeworkSubject")?.value ||
            "Select";
    }
}

function generateAIHomework() {
    const subject =
        $("#homeworkSubject")?.value ||
        getCurrentSubjects()[0]?.[0] ||
        "Mathematics";

    const classNumber =
        getCurrentClass();

    const item = {
        id: createID(),
        title:
            `Mira Practice — ${subject}`,
        subject,
        dueDate: "",
        classNumber,
        completed: false,
        createdAt:
            new Date().toISOString(),
        source: "mira",
        questions: [
            `Explain one important concept from ${subject}.`,
            `Write three key points you learned in ${subject}.`,
            `Solve one practice problem from your current topic.`,
            `Write one question you still have about this subject.`
        ]
    };

    data.homework.push(
        item
    );

    saveData();

    renderHomework();

    addXP(
        10,
        "Mira generated homework"
    );

    showToast(
        "Mira generated your homework!",
        "✨"
    );
}

function renderHomework() {
    const container =
        $("#homeworkList");

    if (!container) {
        return;
    }

    const currentClass =
        getCurrentClass();

    const tasks =
        data.homework.filter(
            item =>
                Number(
                    item.classNumber
                ) === currentClass
        );

    if (!tasks.length) {
        container.innerHTML =
            `<div class="empty-state">
                <span>📝</span>
                <p>No homework yet.</p>
            </div>`;

        return;
    }

    container.innerHTML =
        tasks
            .map(item => {
                return `
                    <div class="glass-card homework-item ${
                        item.completed
                            ? "completed"
                            : ""
                    }">

                        <div class="homework-item-main">

                            <div class="homework-icon">
                                ${
                                    item.source ===
                                    "mira"
                                        ? "✨"
                                        : "📝"
                                }
                            </div>

                            <div>
                                <span class="eyebrow">
                                    ${escapeHTML(item.subject)}
                                </span>

                                <h3>
                                    ${escapeHTML(item.title)}
                                </h3>

                                ${
                                    item.dueDate
                                        ? `<p>Due: ${formatDate(item.dueDate)}</p>`
                                        : ""
                                }

                                ${
                                    item.questions
                                        ? `
                                            <div class="homework-questions">
                                                ${item.questions
                                                    .map(
                                                        q =>
                                                            `<div>• ${escapeHTML(q)}</div>`
                                                    )
                                                    .join("")}
                                            </div>
                                        `
                                        : ""
                                }
                            </div>

                        </div>

                        <div class="homework-actions">

                            <button
                                class="secondary-btn homework-complete-button"
                                type="button"
                                data-id="${escapeHTML(item.id)}"
                            >
                                ${
                                    item.completed
                                        ? "Completed ✓"
                                        : "Mark Complete"
                                }
                            </button>

                            <button
                                class="text-button homework-delete-button"
                                type="button"
                                data-id="${escapeHTML(item.id)}"
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                `;
            })
            .join("");

    $$(".homework-complete-button").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    completeHomework(
                        button.dataset.id
                    );
                }
            );
        }
    );

    $$(".homework-delete-button").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    deleteHomework(
                        button.dataset.id
                    );
                }
            );
        }
    );
}

function completeHomework(id) {
    const item =
        data.homework.find(
            task =>
                task.id === id
        );

    if (!item) {
        return;
    }

    if (!item.completed) {
        item.completed = true;

        addXP(
            15,
            "Completed homework"
        );

        addActivity(
            `Completed homework: ${item.title}`,
            "✅"
        );

        showToast(
            "Homework completed!",
            "✅"
        );
    }

    saveData();
    renderHomework();
}

function deleteHomework(id) {
    data.homework =
        data.homework.filter(
            item =>
                item.id !== id
        );

    saveData();
    renderHomework();

    showToast(
        "Homework deleted.",
        "🗑️"
    );
}

/* =========================================================
   QUIZZES
========================================================= */

function getQuizList() {
    const classNumber =
        getCurrentClass();

    const base =
        QUIZZES[classNumber] ||
        QUIZZES[6];

    return [...base];
}

function renderQuizLibrary() {
    const container =
        $("#quizGrid");

    if (!container) {
        return;
    }

    const quizzes =
        getQuizList();

    container.innerHTML =
        quizzes
            .map(
                quiz => {
                    const result =
                        data.quizResults[
                            quiz.id
                        ];

                    return `
                        <div class="glass-card quiz-card">

                            <div class="quiz-icon">
                                ${quiz.icon}
                            </div>

                            <span class="eyebrow">
                                ${escapeHTML(quiz.subject)}
                            </span>

                            <h3>
                                ${escapeHTML(quiz.title)}
                            </h3>

                            <p>
                                ${quiz.questions.length}
                                questions
                            </p>

                            ${
                                result
                                    ? `
                                        <div class="quiz-best">
                                            Best: ${result.score}/${result.total}
                                        </div>
                                    `
                                    : ""
                            }

                            <button
                                class="primary-btn start-quiz-button"
                                type="button"
                                data-quiz-id="${escapeHTML(quiz.id)}"
                            >
                                Start Quiz
                            </button>

                        </div>
                    `;
                }
            )
            .join("");

    $$(".start-quiz-button").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    startQuiz(
                        button.dataset.quizId
                    );
                }
            );
        }
    );

    bindAIQuizGenerator();
}

function startQuiz(quizID) {
    const quiz =
        getQuizList().find(
            item =>
                item.id === quizID
        );

    if (!quiz) {
        return;
    }

    currentQuiz = quiz;
    currentQuestion = 0;
    currentQuizScore = 0;

    renderQuizQuestion();

    $("#quizPlayer")?.classList.remove(
        "hidden"
    );

    $("#quizPlayer")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function renderQuizQuestion() {
    const player =
        $("#quizPlayer");

    if (!player || !currentQuiz) {
        return;
    }

    const question =
        currentQuiz.questions[
            currentQuestion
        ];

    const total =
        currentQuiz.questions.length;

    player.innerHTML =
        `
        <div class="glass-card quiz-player-card">

            <div class="quiz-player-header">

                <div>
                    <span class="eyebrow">
                        ${escapeHTML(currentQuiz.subject)}
                    </span>

                    <h2>
                        ${escapeHTML(currentQuiz.title)}
                    </h2>
                </div>

                <strong>
                    ${currentQuestion + 1}/${total}
                </strong>

            </div>

            <div class="quiz-question">

                <span class="quiz-question-number">
                    Question ${currentQuestion + 1}
                </span>

                <h3>
                    ${escapeHTML(question.q)}
                </h3>

            </div>

            <div class="quiz-options">

                ${question.options
                    .map(
                        (option, index) =>
                            `
                            <button
                                class="quiz-option"
                                type="button"
                                data-option="${index}"
                            >
                                <span>
                                    ${String.fromCharCode(
                                        65 + index
                                    )}
                                </span>

                                ${escapeHTML(option)}
                            </button>
                            `
                    )
                    .join("")}

            </div>

        </div>
        `;

    $$(".quiz-option").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    answerQuiz(
                        Number(
                            button.dataset.option
                        )
                    );
                }
            );
        }
    );
}

function answerQuiz(answer) {
    if (!currentQuiz) {
        return;
    }

    const question =
        currentQuiz.questions[
            currentQuestion
        ];

    if (
        answer === question.answer
    ) {
        currentQuizScore++;
        showToast(
            "Correct answer!",
            "✅"
        );
    } else {
        showToast(
            `Correct answer: ${question.options[question.answer]}`,
            "💡"
        );
    }

    setTimeout(
        () => {
            currentQuestion++;

            if (
                currentQuestion >=
                currentQuiz.questions.length
            ) {
                finishQuiz();
            } else {
                renderQuizQuestion();
            }
        },
        600
    );
}

function finishQuiz() {
    if (!currentQuiz) {
        return;
    }

    const total =
        currentQuiz.questions.length;

    const previous =
        data.quizResults[
            currentQuiz.id
        ];

    const best =
        Math.max(
            Number(
                previous?.score || 0
            ),
            currentQuizScore
        );

    data.quizResults[
        currentQuiz.id
    ] = {
        score: best,
        latestScore:
            currentQuizScore,
        total,
        classNumber:
            getCurrentClass(),
        completedAt:
            new Date().toISOString()
    };

    const subject =
        currentQuiz.subject;

    if (
        data.subjects[subject]
    ) {
        data.subjects[
            subject
        ].quizzes =
            Number(
                data.subjects[
                    subject
                ].quizzes || 0
            ) + 1;

        if (
            currentQuizScore >=
            Math.ceil(total / 2)
        ) {
            data.subjects[
                subject
            ].progress =
                Math.min(
                    100,
                    Number(
                        data.subjects[
                            subject
                        ].progress || 0
                    ) + 5
                );
        }
    }

    saveData();

    addXP(
        currentQuizScore * 10 + 10,
        "Completed a quiz"
    );

    addActivity(
        `${currentQuiz.title}: ${currentQuizScore}/${total}`,
        "🧠"
    );

    const player =
        $("#quizPlayer");

    if (player) {
        player.innerHTML =
            `
            <div class="glass-card quiz-result-card">

                <div class="quiz-result-icon">
                    ${
                        currentQuizScore >=
                        Math.ceil(total / 2)
                            ? "🎉"
                            : "📚"
                    }
                </div>

                <span class="eyebrow">
                    QUIZ COMPLETE
                </span>

                <h2>
                    ${escapeHTML(currentQuiz.title)}
                </h2>

                <div class="quiz-result-score">
                    ${currentQuizScore}
                    /
                    ${total}
                </div>

                <p>
                    ${
                        currentQuizScore ===
                        total
                            ? "Perfect score! Amazing work."
                            : currentQuizScore >=
                              Math.ceil(total / 2)
                            ? "Great job! Keep practicing."
                            : "Good try! Review the topic and try again."
                    }
                </p>

                <button
                    id="closeQuizButton"
                    class="primary-btn"
                    type="button"
                >
                    Back to Quiz Library
                </button>

            </div>
            `;

        $("#closeQuizButton")?.addEventListener(
            "click",
            () => {
                player.classList.add(
                    "hidden"
                );

                renderQuizLibrary();
            }
        );
    }

    currentQuiz = null;

    renderAll();

    showToast(
        `Quiz finished: ${currentQuizScore}/${total}`,
        "🏆"
    );
}

/* =========================================================
   AI QUIZ
========================================================= */

function bindAIQuizGenerator() {
    const button =
        $("#generateQuizButton");

    if (!button) {
        return;
    }

    if (
        button.dataset.ready ===
        "true"
    ) {
        return;
    }

    button.dataset.ready =
        "true";

    button.addEventListener(
        "click",
        generateAIQuiz
    );
}

function generateAIQuiz() {
    const subject =
        $("#aiQuizSubject")?.value ||
        getCurrentSubjects()[0]?.[0] ||
        "Mathematics";

    const topic =
        $("#aiQuizTopic")?.value.trim() ||
        "General Revision";

    const quiz = {
        id:
            "ai-" +
            createID(),

        title:
            `Mira Quiz — ${topic}`,

        subject,

        icon: "✨",

        questions: [
            {
                q:
                    `What is the most important thing to do while learning ${topic}?`,
                options: [
                    "Understand the concept",
                    "Skip the lesson",
                    "Avoid practice",
                    "Only memorize the title"
                ],
                answer: 0
            },

            {
                q:
                    `Which activity helps you revise ${topic}?`,
                options: [
                    "Practice questions",
                    "Ignoring mistakes",
                    "Skipping notes",
                    "Not reviewing"
                ],
                answer: 0
            },

            {
                q:
                    `What should you do when you do not understand ${topic}?`,
                options: [
                    "Ask for help",
                    "Stop learning",
                    "Guess everything",
                    "Ignore it"
                ],
                answer: 0
            }
        ],

        aiGenerated: true
    };

    data.aiQuizResults.push({
        ...quiz,
        createdAt:
            new Date().toISOString(),
        classNumber:
            getCurrentClass()
    });

    saveData();

    currentQuiz = quiz;
    currentQuestion = 0;
    currentQuizScore = 0;

    renderQuizQuestion();

    $("#quizPlayer")?.classList.remove(
        "hidden"
    );

    $("#quizPlayer")?.scrollIntoView({
        behavior: "smooth"
    });

    addXP(
        10,
        "Mira generated a quiz"
    );

    showToast(
        "Mira created your quiz!",
        "✨"
    );
}

/* =========================================================
   CHAT / MIRA
========================================================= */

function setupMira() {
    const form =
        $("#chatForm");

    if (!form) {
        return;
    }

    if (
        form.dataset.ready ===
        "true"
    ) {
        return;
    }

    form.dataset.ready =
        "true";

    form.addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            const input =
                $("#chatInput");

            const message =
                input?.value.trim();

            if (!message) {
                return;
            }

            input.value = "";

            addChatMessage(
                "user",
                message
            );

            data.chat.push({
                role: "user",
                message,
                time:
                    new Date().toISOString(),
                classNumber:
                    getCurrentClass()
            });

            saveData();

            const typing =
                addTypingMessage();

            let response;

            try {
                response =
                    await askMiraAPI(
                        message
                    );
            } catch (error) {
                console.warn(
                    "Mira API unavailable:",
                    error
                );

                response =
                    generateLocalMiraAnswer(
                        message
                    );
            }

            typing.remove();

            addChatMessage(
                "mira",
                response
            );

            data.chat.push({
                role: "mira",
                message: response,
                time:
                    new Date().toISOString(),
                classNumber:
                    getCurrentClass()
            });

            saveData();
        }
    );

    $$("[data-ai-prompt]").forEach(
        button => {
            if (
                button.dataset.miraReady ===
                "true"
            ) {
                return;
            }

            button.dataset.miraReady =
                "true";

            button.addEventListener(
                "click",
                () => {
                    const prompt =
                        button.dataset.aiPrompt;

                    navigateTo(
                        "ai-teacher"
                    );

                    const input =
                        $("#chatInput");

                    if (input) {
                        input.value =
                            prompt;

                        input.focus();

                        $("#chatForm")?.requestSubmit();
                    }
                }
            );
        }
    );

    restoreChat();
}

async function askMiraAPI(message) {
    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () =>
                controller.abort(),
            7000
        );

    try {
        const response =
            await fetch(
                `${API_URL}/api/ai/chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message,
                        class:
                            getCurrentClass(),
                        subjects:
                            getCurrentSubjects().map(
                                ([name]) =>
                                    name
                            )
                    }),

                    signal:
                        controller.signal
                }
            );

        if (!response.ok) {
            throw new Error(
                `Mira API error ${response.status}`
            );
        }

        const result =
            await response.json();

        return (
            result.answer ||
            result.message ||
            result.response ||
            generateLocalMiraAnswer(
                message
            )
        );
    } finally {
        clearTimeout(timeout);
    }
}

function generateLocalMiraAnswer(
    message
) {
    const text =
        String(message)
            .toLowerCase();

    const classNumber =
        getCurrentClass();

    const subjects =
        getCurrentSubjects()
            .map(([name]) => name)
            .join(", ");

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {
        return `Hi! 👋 I'm Mira. You're studying in Class ${classNumber}. Tell me which topic you want to learn.`;
    }

    if (
        text.includes("study tip") ||
        text.includes("tips")
    ) {
        return `Here are 5 smart study tips for Class ${classNumber}:\n\n1. Study in short focused sessions.\n2. Revise what you learned the same day.\n3. Practice questions instead of only reading.\n4. Keep difficult topics in a revision list.\n5. Take short breaks between study sessions.`;
    }

    if (
        text.includes("revision")
    ) {
        return `Quick revision plan:\n\n• 20 minutes: revise your notes.\n• 20 minutes: solve practice questions.\n• 10 minutes: review mistakes.\n• 10 minutes: recall the main points without looking at your notes.\n\nYour Class ${classNumber} subjects include ${subjects}.`;
    }

    if (
        text.includes("math") ||
        text.includes("fraction") ||
        text.includes("algebra")
    ) {
        return `Let's learn step by step 📐. First identify exactly what the question is asking. Then write the known values, choose the correct operation or formula, solve carefully, and finally check your answer. If you send me the exact Maths question, I can explain the steps.`;
    }

    if (
        text.includes("science") ||
        text.includes("plant") ||
        text.includes("light") ||
        text.includes("force")
    ) {
        return `Let's make Science simple 🔬. Start with the definition, understand the process, then learn one real-life example. After that, test yourself without looking at the notes. Send me the exact Science topic and I'll explain it step by step.`;
    }

    if (
        text.includes("english") ||
        text.includes("grammar")
    ) {
        return `For English 📖, first identify the grammar rule, then look at an example and create two of your own sentences. If you give me the sentence or grammar topic, I'll explain the rule simply.`;
    }

    if (
        text.includes("homework")
    ) {
        return `I can help with homework 📝. Send me the question, and I'll guide you through it step by step rather than simply giving you an unexplained answer.`;
    }

    if (
        text.includes("quiz") ||
        text.includes("question")
    ) {
        return `Sure! 🧠 I can help you practice. Go to Tests & Quizzes and choose one of the available quizzes, or tell me the subject and topic and I can create practice questions.`;
    }

    return `I'm Mira, your Class ${classNumber} learning assistant ✨. I can help with ${subjects}. Tell me the subject and topic, or paste your exact question, and I'll explain it step by step.`;
}

function addChatMessage(
    role,
    message
) {
    const container =
        $("#chatMessages");

    if (!container) {
        return null;
    }

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        `chat-message ${
            role === "user"
                ? "user-message"
                : "mira-message"
        }`;

    const avatar =
        role === "user"
            ? "👤"
            : "✨";

    wrapper.innerHTML =
        `
        <div class="message-avatar">
            ${avatar}
        </div>

        <div class="message-bubble">

            <strong>
                ${
                    role === "user"
                        ? "You"
                        : "Mira"
                }
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>
        `;

    container.appendChild(
        wrapper
    );

    container.scrollTop =
        container.scrollHeight;

    return wrapper;
}

function addTypingMessage() {
    const container =
        $("#chatMessages");

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "chat-message mira-message";

    wrapper.innerHTML =
        `
        <div class="message-avatar">
            ✨
        </div>

        <div class="message-bubble">
            <strong>Mira</strong>
            <p>Thinking...</p>
        </div>
        `;

    container?.appendChild(
        wrapper
    );

    if (container) {
        container.scrollTop =
            container.scrollHeight;
    }

    return wrapper;
}

function restoreChat() {
    const container =
        $("#chatMessages");

    if (!container) {
        return;
    }

    const saved =
        data.chat.filter(
            item =>
                Number(
                    item.classNumber
                ) === getCurrentClass()
        );

    if (!saved.length) {
        return;
    }

    const initial =
        container.querySelector(
            ".chat-message"
        );

    if (initial) {
        initial.remove();
    }

    saved.slice(-20).forEach(
        item => {
            addChatMessage(
                item.role === "user"
                    ? "user"
                    : "mira",
                item.message
            );
        }
    );
}

/* =========================================================
   PROGRESS PAGE
========================================================= */

function renderProgress() {
    const container =
        $("#progressContent");

    if (!container) {
        return;
    }

    const subjects =
        getCurrentSubjects();

    const overall =
        calculateOverallProgress();

    const totalMinutes =
        subjects.reduce(
            (sum, [name]) =>
                sum +
                Number(
                    data.subjects[name]
                        ?.studiedMinutes ||
                        0
                ),
            0
        );

    const totalQuizzes =
        subjects.reduce(
            (sum, [name]) =>
                sum +
                Number(
                    data.subjects[name]
                        ?.quizzes ||
                        0
                ),
            0
        );

    container.innerHTML =
        `
        <div class="progress-overview-grid">

            <div class="glass-card">
                <span class="eyebrow">
                    OVERALL
                </span>

                <strong class="progress-big-number">
                    ${overall}%
                </strong>

                <p>
                    Class ${getCurrentClass()} overall progress
                </p>
            </div>

            <div class="glass-card">
                <span class="eyebrow">
                    STUDY TIME
                </span>

                <strong class="progress-big-number">
                    ${totalMinutes}
                </strong>

                <p>
                    Subject study minutes
                </p>
            </div>

            <div class="glass-card">
                <span class="eyebrow">
                    QUIZZES
                </span>

                <strong class="progress-big-number">
                    ${totalQuizzes}
                </strong>

                <p>
                    Quizzes completed
                </p>
            </div>

            <div class="glass-card">
                <span class="eyebrow">
                    XP
                </span>

                <strong class="progress-big-number">
                    ${Number(data.xp || 0)}
                </strong>

                <p>
                    Aventra XP
                </p>
            </div>

        </div>

        <div class="glass-card progress-subject-card">

            <div class="card-heading">

                <div>
                    <span class="eyebrow">
                        CLASS ${getCurrentClass()}
                    </span>

                    <h3>
                        Subject Performance
                    </h3>
                </div>

            </div>

            <div class="progress-subject-list">

                ${subjects
                    .map(
                        ([name, icon]) => {
                            const value =
                                Number(
                                    data.subjects[name]
                                        ?.progress ||
                                        0
                                );

                            return `
                                <div class="progress-row">

                                    <div class="progress-row-title">
                                        <span>
                                            ${icon}
                                        </span>

                                        <strong>
                                            ${escapeHTML(name)}
                                        </strong>

                                        <span>
                                            ${value}%
                                        </span>
                                    </div>

                                    <div class="progress-track">
                                        <div
                                            class="progress-fill"
                                            style="width:${value}%"
                                        ></div>
                                    </div>

                                </div>
                            `;
                        }
                    )
                    .join("")}

            </div>

        </div>
        `;
}

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const ACHIEVEMENT_DEFINITIONS = [
    {
        id: "first-study",
        title: "First Step",
        description: "Complete your first study activity.",
        icon: "🚀"
    },

    {
        id: "xp-100",
        title: "XP Star",
        description: "Earn 100 XP.",
        icon: "⭐"
    },

    {
        id: "xp-500",
        title: "XP Master",
        description: "Earn 500 XP.",
        icon: "🌟"
    },

    {
        id: "quiz-first",
        title: "Quiz Starter",
        description: "Complete your first quiz.",
        icon: "🧠"
    },

    {
        id: "homework-first",
        title: "Homework Hero",
        description: "Complete your first homework task.",
        icon: "📝"
    },

    {
        id: "pdf-first",
        title: "PDF Collector",
        description: "Add your first PDF.",
        icon: "📄"
    },

    {
        id: "progress-50",
        title: "Halfway There",
        description: "Reach 50% overall progress.",
        icon: "🏆"
    }
];

function calculateAchievements() {
    const unlocked = {};

    const hasStudy =
        data.activity.length > 0 ||
        Number(data.studyMinutes || 0) > 0;

    if (hasStudy) {
        unlocked["first-study"] = true;
    }

    if (
        Number(data.xp || 0) >= 100
    ) {
        unlocked["xp-100"] = true;
    }

    if (
        Number(data.xp || 0) >= 500
    ) {
        unlocked["xp-500"] = true;
    }

    if (
        Object.keys(
            data.quizResults || {}
        ).length > 0
    ) {
        unlocked["quiz-first"] = true;
    }

    if (
        data.homework.some(
            item => item.completed
        )
    ) {
        unlocked["homework-first"] =
            true;
    }

    if (
        data.pdfs.length > 0
    ) {
        unlocked["pdf-first"] =
            true;
    }

    if (
        calculateOverallProgress() >= 50
    ) {
        unlocked["progress-50"] =
            true;
    }

    return unlocked;
}

function updateAchievements() {
    const unlocked =
        calculateAchievements();

    Object.keys(unlocked).forEach(
        id => {
            data.achievements[id] =
                true;
        }
    );

    saveData();
}

function renderAchievements() {
    const container =
        $("#achievementsGrid");

    if (!container) {
        return;
    }

    updateAchievements();

    container.innerHTML =
        ACHIEVEMENT_DEFINITIONS
            .map(item => {
                const isUnlocked =
                    Boolean(
                        data.achievements[
                            item.id
                        ]
                    );

                return `
                    <div class="glass-card achievement-card ${
                        isUnlocked
                            ? "unlocked"
                            : "locked"
                    }">

                        <div class="achievement-icon">
                            ${item.icon}
                        </div>

                        <div>
                            <span class="eyebrow">
                                ${
                                    isUnlocked
                                        ? "UNLOCKED"
                                        : "LOCKED"
                                }
                            </span>

                            <h3>
                                ${escapeHTML(item.title)}
                            </h3>

                            <p>
                                ${escapeHTML(item.description)}
                            </p>
                        </div>

                        <strong>
                            ${
                                isUnlocked
                                    ? "✓"
                                    : "🔒"
                            }
                        </strong>

                    </div>
                `;
            })
            .join("");
}

/* =========================================================
   TIMETABLE
========================================================= */

function setupTimetable() {
    $("#timetableForm")?.addEventListener(
        "submit",
        event => {
            event.preventDefault();

            const title =
                $("#classTitle")?.value.trim();

            const subject =
                $("#classSubject")?.value;

            const time =
                $("#classTime")?.value;

            if (
                !title ||
                !subject ||
                !time
            ) {
                showToast(
                    "Please complete the timetable form.",
                    "!"
                );

                return;
            }

            data.timetable.push({
                id: createID(),
                title,
                subject,
                time,
                classNumber:
                    getCurrentClass(),
                createdAt:
                    new Date().toISOString()
            });

            saveData();

            event.target.reset();

            renderTimetable();

            addActivity(
                `Added ${title} to timetable`,
                "🗓️"
            );

            addXP(
                5,
                "Added timetable class"
            );

            showToast(
                "Class added to timetable!",
                "🗓️"
            );
        }
    );
}

function renderTimetable() {
    const container =
        $("#timetableList");

    if (!container) {
        return;
    }

    const currentClass =
        getCurrentClass();

    const items =
        data.timetable.filter(
            item =>
                Number(
                    item.classNumber
                ) === currentClass
        );

    if (!items.length) {
        container.innerHTML =
            `<div class="empty-state">
                <span>🗓️</span>
                <p>No timetable entries yet.</p>
            </div>`;

        return;
    }

    const sorted =
        [...items].sort(
            (a, b) =>
                String(a.time)
                    .localeCompare(
                        String(b.time)
                    )
        );

    container.innerHTML =
        sorted
            .map(item => {
                return `
                    <div class="timetable-item">

                        <div class="timetable-time">
                            ${escapeHTML(
                                formatTime(item.time)
                            )}
                        </div>

                        <div class="timetable-info">

                            <strong>
                                ${escapeHTML(item.title)}
                            </strong>

                            <span>
                                ${escapeHTML(item.subject)}
                            </span>

                        </div>

                        <button
                            class="text-button timetable-delete-button"
                            type="button"
                            data-id="${escapeHTML(item.id)}"
                        >
                            Delete
                        </button>

                    </div>
                `;
            })
            .join("");

    $$(".timetable-delete-button").forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    data.timetable =
                        data.timetable.filter(
                            item =>
                                item.id !==
                                button.dataset.id
                        );

                    saveData();

                    renderTimetable();
                    updateDashboard();

                    showToast(
                        "Timetable item deleted.",
                        "🗑️"
                    );
                }
            );
        }
    );
}

/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {
    $("#classSelector")?.addEventListener(
        "change",
        event => {
            changeStudentClass(
                event.target.value
            );
        }
    );

    $("#themeSelector")?.addEventListener(
        "change",
        event => {
            data.profile.theme =
                event.target.value;

            applyTheme();
        }
    );

    $("#saveSettingsButton")?.addEventListener(
        "click",
        saveSettings
    );

    $("#dailyGoalInput")?.addEventListener(
        "change",
        () => {
            const value =
                Number(
                    $("#dailyGoalInput")
                        ?.value
                );

            if (
                Number.isFinite(value) &&
                value >= 10 &&
                value <= 300
            ) {
                data.dailyGoal =
                    value;

                saveData();
                updateDashboard();
            }
        }
    );
}

function saveSettings() {
    const name =
        $("#studentNameInput")
            ?.value.trim();

    const classNumber =
        Number(
            $("#classSelector")
                ?.value
        );

    const theme =
        $("#themeSelector")
            ?.value ||
        "light";

    const dailyGoal =
        Number(
            $("#dailyGoalInput")
                ?.value
        );

    if (name) {
        data.profile.name =
            name;
    }

    if (
        CLASS_SUBJECTS[classNumber]
    ) {
        changeStudentClass(
            classNumber
        );
    }

    data.profile.theme =
        theme;

    if (
        Number.isFinite(dailyGoal) &&
        dailyGoal >= 10 &&
        dailyGoal <= 300
    ) {
        data.dailyGoal =
            dailyGoal;
    }

    saveData();

    applyTheme();
    updateProfileUI();
    renderAll();

    showToast(
        "Settings saved successfully!",
        "✓"
    );
}

/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {
    const input =
        $("#globalSearch");

    if (!input) {
        return;
    }

    input.addEventListener(
        "keydown",
        event => {
            if (
                event.key !==
                "Enter"
            ) {
                return;
            }

            const query =
                input.value.trim();

            if (!query) {
                return;
            }

            const lower =
                query.toLowerCase();

            const matches =
                getCurrentSubjects().filter(
                    ([name]) =>
                        name
                            .toLowerCase()
                            .includes(lower)
                );

            if (matches.length) {
                openSubjectInMira(
                    matches[0][0]
                );

                input.value =
                    "";

                return;
            }

            navigateTo(
                "ai-teacher"
            );

            const chatInput =
                $("#chatInput");

            if (chatInput) {
                chatInput.value =
                    query;

                chatInput.focus();
            }

            input.value = "";
        }
    );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function setupNotifications() {
    $("#notificationButton")?.addEventListener(
        "click",
        () => {
            const count =
                data.activity.length;

            if (count) {
                showToast(
                    `You have ${count} recent learning activities.`,
                    "🔔"
                );
            } else {
                showToast(
                    "No new notifications.",
                    "🔔"
                );
            }
        }
    );
}

/* =========================================================
   MODAL
========================================================= */

function setupModal() {
    $("#modalClose")?.addEventListener(
        "click",
        closeModal
    );

    $("#modalOverlay")?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                $("#modalOverlay")
            ) {
                closeModal();
            }
        }
    );
}

function openModal(content) {
    const overlay =
        $("#modalOverlay");

    const modalContent =
        $("#modalContent");

    if (!overlay || !modalContent) {
        return;
    }

    modalContent.innerHTML =
        content;

    overlay.classList.remove(
        "hidden"
    );
}

function closeModal() {
    $("#modalOverlay")?.classList.add(
        "hidden"
    );
}

/* =========================================================
   PDF / CLASS / HOMEWORK UI
========================================================= */

function renderAll() {
    updateProfileUI();
    updateDashboard();
    renderSubjects();
    renderHomework();
    renderProgress();
    renderAchievements();
    renderTimetable();
    renderQuizLibrary();
    populateSubjectSelects();
}

/* =========================================================
   RESET / SAFETY
========================================================= */

function setupKeyboardShortcuts() {
    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key ===
                    "Escape" &&
                !$("#modalOverlay")?.classList.contains(
                    "hidden"
                )
            ) {
                closeModal();
            }
        }
    );
}

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);

async function init() {
    try {
        ensureSubjectsForClass();

        applyTheme();

        setupNavigation();

        setupMobileMenu();

        setupStudyButton();

        setupPDFUpload();

        setupGeneratePDF();

        setupHomework();

        setupMira();

        setupTimetable();

        setupSettings();

        setupSearch();

        setupNotifications();

        setupModal();

        setupKeyboardShortcuts();

        updateProfileUI();

        renderAll();

        await renderPDFLists();

        updateAchievements();

        miraInitialized = true;

        console.log(
            "Aventra repaired successfully."
        );
    } catch (error) {
        console.error(
            "Aventra initialization error:",
            error
        );

        showToast(
            "Aventra loaded with a minor issue. Check console.",
            "!"
        );
    }
}

/* =========================================================
   GLOBAL FUNCTIONS
   Required because the supplied HTML uses:
   onclick="generateAIHomework()"
========================================================= */

window.generateAIHomework =
    generateAIHomework;

window.openRealPDF =
    openRealPDF;

window.downloadRealPDF =
    downloadRealPDF;

window.closeModal =
    closeModal;

window.openPage =
    openPage;

window.navigateTo =
    navigateTo;

window.changeStudentClass =
    changeStudentClass;

// ============================================================
// AVENTRA - MY PROGRESS CHARTS
// ============================================================

let progressPieChart = null;
let progressBarChart = null;


// ============================================================
// CHART COLORS
// ============================================================

const PROGRESS_CHART_COLORS = [
    "#6c4df6",
    "#8c6cff",
    "#ff7eb6",
    "#35c6a6",
    "#ffb84d",
    "#4da3ff",
    "#ef6c8f",
    "#7ac943"
];


// ============================================================
// GET SUBJECT PROGRESS
// ============================================================

function getProgressChartData() {

    const subjects =
        getCurrentSubjects();

    return subjects.map(
        ([name, icon]) => {

            const progress =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(
                            data.subjects?.[name]?.progress || 0
                        )
                    )
                );

            return {
                name,
                icon,
                progress
            };
        }
    );
}


// ============================================================
// CREATE CANVAS CONTEXT
// ============================================================

function getChartContext(id) {

    const canvas =
        document.getElementById(id);

    if (!canvas) return null;

    return canvas.getContext("2d");
}


// ============================================================
// DRAW PIE CHART
// ============================================================

function drawProgressPieChart() {

    const canvas =
        document.getElementById(
            "progressPieChart"
        );

    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    const subjects =
        getProgressChartData();


    const total =
        subjects.reduce(
            (sum, item) =>
                sum + item.progress,
            0
        );


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const centerX =
        canvas.width / 2;

    const centerY =
        canvas.height / 2;

    const radius =
        Math.min(
            canvas.width,
            canvas.height
        ) * 0.32;


    // Empty state
    if (!subjects.length || total <= 0) {

        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(108,77,246,0.12)";

        ctx.fill();


        ctx.fillStyle =
            "#6c4df6";

        ctx.font =
            "700 18px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillText(
            "No progress yet",
            centerX,
            centerY
        );

        return;
    }


    let startAngle =
        -Math.PI / 2;


    subjects.forEach(
        (subject, index) => {

            const slice =
                (
                    subject.progress /
                    total
                ) *
                Math.PI *
                2;


            const endAngle =
                startAngle + slice;


            ctx.beginPath();

            ctx.moveTo(
                centerX,
                centerY
            );

            ctx.arc(
                centerX,
                centerY,
                radius,
                startAngle,
                endAngle
            );

            ctx.closePath();


            ctx.fillStyle =
                PROGRESS_CHART_COLORS[
                    index %
                    PROGRESS_CHART_COLORS.length
                ];


            ctx.fill();


            ctx.strokeStyle =
                "#ffffff";

            ctx.lineWidth =
                4;

            ctx.stroke();


            startAngle =
                endAngle;
        }
    );


    // Center hole
    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius * 0.58,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        getComputedStyle(
            document.body
        ).backgroundColor ||
        "#ffffff";

    ctx.fill();


    // Overall percentage
    const overall =
        calculateOverallProgress();


    ctx.fillStyle =
        getComputedStyle(
            document.body
        ).color || "#222";


    ctx.font =
        "800 28px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillText(
        `${overall}%`,
        centerX,
        centerY - 5
    );


    ctx.font =
        "500 12px Arial";


    ctx.globalAlpha =
        0.6;


    ctx.fillText(
        "Overall",
        centerX,
        centerY + 20
    );


    ctx.globalAlpha =
        1;


    // Legend
    drawPieLegend(
        ctx,
        subjects,
        canvas
    );
}


// ============================================================
// PIE LEGEND
// ============================================================

function drawPieLegend(
    ctx,
    subjects,
    canvas
) {

    const startX = 25;

    const startY =
        canvas.height - 82;

    const columnWidth =
        (canvas.width - 50) / 2;


    ctx.font =
        "600 12px Arial";


    subjects.forEach(
        (subject, index) => {

            const column =
                index % 2;

            const row =
                Math.floor(index / 2);


            const x =
                startX +
                column *
                columnWidth;


            const y =
                startY +
                row * 24;


            ctx.fillStyle =
                PROGRESS_CHART_COLORS[
                    index %
                    PROGRESS_CHART_COLORS.length
                ];


            ctx.beginPath();

            ctx.arc(
                x + 5,
                y - 4,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.fillStyle =
                getComputedStyle(
                    document.body
                ).color || "#222";


            ctx.globalAlpha =
                0.8;


            ctx.fillText(
                `${subject.icon} ${subject.name}`,
                x + 15,
                y
            );


            ctx.globalAlpha =
                1;
        }
    );
}


// ============================================================
// DRAW BAR CHART
// ============================================================

function drawProgressBarChart() {

    const canvas =
        document.getElementById(
            "progressBarChart"
        );

    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    const subjects =
        getProgressChartData();


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    if (!subjects.length) return;


    const paddingLeft = 55;
    const paddingRight = 20;
    const paddingTop = 25;
    const paddingBottom = 75;


    const chartWidth =
        canvas.width -
        paddingLeft -
        paddingRight;


    const chartHeight =
        canvas.height -
        paddingTop -
        paddingBottom;


    // Grid
    ctx.strokeStyle =
        "rgba(108,77,246,0.12)";

    ctx.lineWidth = 1;


    for (
        let value = 0;
        value <= 100;
        value += 20
    ) {

        const y =
            paddingTop +
            chartHeight -
            (value / 100) *
            chartHeight;


        ctx.beginPath();

        ctx.moveTo(
            paddingLeft,
            y
        );

        ctx.lineTo(
            canvas.width -
            paddingRight,
            y
        );

        ctx.stroke();


        ctx.fillStyle =
            "rgba(50,50,70,0.55)";

        ctx.font =
            "11px Arial";

        ctx.textAlign =
            "right";

        ctx.fillText(
            `${value}%`,
            paddingLeft - 9,
            y + 4
        );
    }


    const slotWidth =
        chartWidth /
        subjects.length;


    const barWidth =
        Math.min(
            48,
            slotWidth * 0.55
        );


    subjects.forEach(
        (subject, index) => {

            const barHeight =
                (
                    subject.progress /
                    100
                ) *
                chartHeight;


            const x =
                paddingLeft +
                index *
                slotWidth +
                (
                    slotWidth -
                    barWidth
                ) / 2;


            const y =
                paddingTop +
                chartHeight -
                barHeight;


            // Bar
            ctx.fillStyle =
                PROGRESS_CHART_COLORS[
                    index %
                    PROGRESS_CHART_COLORS.length
                ];


            ctx.beginPath();

            ctx.roundRect(
                x,
                y,
                barWidth,
                barHeight,
                8
            );

            ctx.fill();


            // Percentage
            ctx.fillStyle =
                getComputedStyle(
                    document.body
                ).color || "#222";


            ctx.font =
                "700 11px Arial";

            ctx.textAlign =
                "center";


            ctx.fillText(
                `${subject.progress}%`,
                x +
                    barWidth / 2,
                y - 8
            );


            // Subject label
            ctx.font =
                "11px Arial";


            ctx.globalAlpha =
                0.7;


            ctx.fillText(
                subject.name.length > 10
                    ? subject.name.substring(
                        0,
                        9
                    ) + "…"
                    : subject.name,
                x +
                    barWidth / 2,
                paddingTop +
                    chartHeight +
                    25
            );


            ctx.globalAlpha =
                1;
        }
    );
}


// ============================================================
// SUBJECT PROGRESS LIST
// ============================================================

function renderProgressSubjectList() {

    const container =
        document.getElementById(
            "progressSubjectList"
        );

    if (!container) return;


    const subjects =
        getProgressChartData();


    container.innerHTML = "";


    subjects.forEach(
        subject => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "progress-subject-item";


            item.innerHTML = `
                <div class="progress-subject-top">

                    <div class="progress-subject-name">
                        <span>
                            ${escapeHTML(subject.icon)}
                        </span>

                        <span>
                            ${escapeHTML(subject.name)}
                        </span>
                    </div>

                    <strong class="progress-subject-percent">
                        ${subject.progress}%
                    </strong>

                </div>


                <div class="progress-progress-track">

                    <div
                        class="progress-progress-fill"
                        style="width:${subject.progress}%"
                    ></div>

                </div>


                <div class="progress-subject-meta">

                    <span>
                        ${data.subjects?.[subject.name]?.studiedMinutes || 0}
                        min studied
                    </span>

                    <span>
                        ${data.subjects?.[subject.name]?.quizzes || 0}
                        quizzes
                    </span>

                </div>
            `;


            container.appendChild(item);
        }
    );
}


// ============================================================
// PROGRESS STATS
// ============================================================

function updateProgressStats() {

    const overall =
        calculateOverallProgress();


    const overallElement =
        document.getElementById(
            "progressOverallValue"
        );


    if (overallElement) {
        overallElement.textContent =
            `${overall}%`;
    }


    const studyTime =
        Number(
            data.studyMinutes || 0
        );


    const studyTimeElement =
        document.getElementById(
            "progressStudyTime"
        );


    if (studyTimeElement) {

        if (studyTime >= 60) {

            const hours =
                Math.floor(
                    studyTime / 60
                );

            const minutes =
                studyTime % 60;


            studyTimeElement.textContent =
                `${hours}h ${minutes}m`;

        } else {

            studyTimeElement.textContent =
                `${studyTime} min`;
        }
    }


    const streakElement =
        document.getElementById(
            "progressStreak"
        );


    if (streakElement) {

        streakElement.textContent =
            `${Number(data.streak || 0)} days`;
    }


    const xpElement =
        document.getElementById(
            "progressXP"
        );


    if (xpElement) {

        xpElement.textContent =
            `${Number(data.xp || 0)} XP`;
    }
}


// ============================================================
// COMPLETE PROGRESS RENDER
// ============================================================

function renderProgressPage() {

    updateProgressStats();

    renderProgressSubjectList();

    drawProgressPieChart();

    drawProgressBarChart();
}

/* =========================================================
   END
========================================================= */
