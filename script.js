// --- Database of Syllabus main topics, inner sub-topics, and curated resources ---
const masterSyllabus = [
  {
    id: "m1",
    title: "Deepen JavaScript Core Concepts",
    category: "JS Core Concepts",
    mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
    subQuests: [
      { id: "s1_1", title: "Reference vs Value (Stack vs Heap, Primitive Copies vs Array/Object pointers)", importance: "critical", xp: 50 },
      { id: "s1_2", title: "Execution Context & Call Stack (Creation vs Execution phase)", importance: "important", xp: 50 },
      { id: "s1_3", title: "Scope Chain & Lexical Scope (Global, Function, and Block)", importance: "important", xp: 40 },
      { id: "s1_4", title: "Hoisting Mechanics (var vs let/const & Temporal Dead Zone)", importance: "important", xp: 40 },
      { id: "s1_5", title: "Closures (Definition, returning inner functions, and private state applications)", importance: "critical", xp: 60 }
    ]
  },
  {
    id: "m2",
    title: "Work with Modern JavaScript Features",
    category: "ES6+ Features",
    mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
    subQuests: [
      { id: "s2_1", title: "Destructuring (Object and Array properties)", importance: "important", xp: 30 },
      { id: "s2_2", title: "Spread vs Rest Operators (... syntax in arrays, objects, and function parameters)", importance: "critical", xp: 40 },
      { id: "s2_3", title: "Optional Chaining (?.) for safe object tree exploration", importance: "important", xp: 30 },
      { id: "s2_4", title: "Logical Operators & Short-circuiting (||, &&, and Nullish Coalescing ??)", importance: "critical", xp: 40 },
      { id: "s2_5", title: "Enhanced Object Literals & Modules (import/export)", importance: "standard", xp: 30 }
    ]
  },
  {
    id: "m3",
    title: "Understand Advanced Array & Data Handling",
    category: "Data Handling",
    mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    subQuests: [
      { id: "s3_1", title: "Transformative Array methods (map, filter, reduce in depth)", importance: "critical", xp: 60 },
      { id: "s3_2", title: "Search Array methods (find, forEach, some, every)", importance: "important", xp: 30 },
      { id: "s3_3", title: "Sets (Creating collections of unique values, array de-duplication)", importance: "important", xp: 35 },
      { id: "s3_4", title: "Maps (Key-value structures with non-string keys)", importance: "standard", xp: 35 }
    ]
  },
  {
    id: "m4",
    title: "Understand Error Handling & Debugging",
    category: "Error & Debugging",
    mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    subQuests: [
      { id: "s4_1", title: "Structured Error Flow (try, catch, finally block logic)", importance: "critical", xp: 40 },
      { id: "s4_2", title: "Creating Custom Errors (throw new Error())", importance: "important", xp: 30 },
      { id: "s4_3", title: "Using Browser DevTools (Breakpoints, stepping, Scope, and Watch windows)", importance: "important", xp: 40 }
    ]
  },
  {
    id: "m5",
    title: "Understand DOM & Browser Programming",
    category: "DOM / BOM",
    mdnLink: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
    subQuests: [
      { id: "s5_1", title: "Dynamic DOM manipulation & node creation", importance: "important", xp: 40 },
      { id: "s5_2", title: "Event Propagation (Event Capturing vs Bubbling phases)", importance: "critical", xp: 50 },
      { id: "s5_3", title: "Event Delegation (Optimized handlers for dynamic structures)", importance: "critical", xp: 50 },
      { id: "s5_4", title: "BOM Basics (localStorage, location, history API)", importance: "important", xp: 40 }
    ]
  },
  {
    id: "m6",
    title: "Understand Asynchronous JavaScript",
    category: "Async Flows",
    mdnLink: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
    subQuests: [
      { id: "s6_1", title: "Under-the-hood Event Loop & Microtasks/Macrotasks queue", importance: "critical", xp: 60 },
      { id: "s6_2", title: "Native Promises (states: pending, fulfilled, rejected)", importance: "critical", xp: 50 },
      { id: "s6_3", title: "Async/Await syntax with error handling constructs", importance: "critical", xp: 60 }
    ]
  },
  {
    id: "m7",
    title: "Understand Object-Oriented Programming (OOP)",
    category: "OOP JS",
    mdnLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
    subQuests: [
      { id: "s7_1", title: "ES6 Classes, constructors, and instantiating instances", importance: "important", xp: 40 },
      { id: "s7_2", title: "Prototypal Inheritance vs OOP Class Inheritance (extends and super)", importance: "critical", xp: 50 },
      { id: "s7_3", title: "Encapsulation (using modern private class fields #)", importance: "important", xp: 40 }
    ]
  }
];

// --- Audio Effects Synthesizer ---
const playSound = (type) => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'success') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } else if (type === 'levelup') {
    osc.type = 'sawtooth';
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      osc.frequency.setValueAtTime(freq, ctx.currentTime + (idx * 0.08));
    });
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  }
};

// --- Application State ---
let state = JSON.parse(localStorage.getItem('innerJsQuestState')) || {
  completedSubQuests: [],
  activeAccordions: [], 
  totalXp: 0,
  level: 1
};

const xpPerLevel = 500;

// --- DOM References ---
const questListContainer = document.getElementById('quest-list');
const levelDisplay = document.getElementById('level-display');
const rankDisplay = document.getElementById('rank-display');
const currentXpText = document.getElementById('current-xp');
const maxXpText = document.getElementById('max-xp');
const xpBarFill = document.getElementById('xp-bar');
const radialProgress = document.getElementById('radial-progress');
const percentText = document.getElementById('percent-text');
const motivateBanner = document.getElementById('motivate-banner');

// --- Helper Functions ---
const saveState = () => {
  localStorage.setItem('innerJsQuestState', JSON.stringify(state));
};

const getRank = (lvl) => {
  if (lvl >= 8) return "Legendary JS Architect 🌟";
  if (lvl >= 6) return "Asynchronous Wizard 🔮";
  if (lvl >= 4) return "Closure Connoisseur 🎒";
  if (lvl >= 2) return "Scope Voyager 🧭";
  return "Console Explorer 🍼";
};

const triggerDopamineConfetti = (isLevelUp) => {
  if (isLevelUp) {
    confetti({ particleCount: 150, spread: 85, origin: { y: 0.6 } });
  } else {
    confetti({ particleCount: 40, spread: 50, colors: ['#f59e0b', '#10b981'] });
  }
};

const triggerScreenShake = () => {
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 300);
};

// --- UI Rendering & Calculation Engine ---
const updateEngine = () => {
  const allSubQuests = masterSyllabus.flatMap(m => m.subQuests);
  const totalSubCount = allSubQuests.length;
  const completedSubCount = state.completedSubQuests.length;

  let calculatedXp = state.completedSubQuests.reduce((sum, subId) => {
    const subQuest = allSubQuests.find(s => s.id === subId);
    return sum + (subQuest ? subQuest.xp : 0);
  }, 0);

  const progressPercentage = totalSubCount > 0 ? Math.round((completedSubCount / totalSubCount) * 100) : 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius; 
  const offset = circumference - (progressPercentage / 100) * circumference;
  radialProgress.style.strokeDashoffset = offset;
  percentText.innerText = `${progressPercentage}%`;

  let newLevel = Math.floor(calculatedXp / xpPerLevel) + 1;
  let xpThisLevel = calculatedXp % xpPerLevel;

  if (newLevel > state.level) {
    playSound('levelup');
    triggerDopamineConfetti(true);
    triggerScreenShake();
    motivateBanner.innerText = `🌟 LEVEL UP! Welcome to level ${newLevel}! 🌟`;
  } else if (calculatedXp > state.totalXp) {
    playSound('success');
    triggerDopamineConfetti(false);
  }

  state.level = newLevel;
  state.totalXp = calculatedXp;

  levelDisplay.innerText = `LVL ${state.level}`;
  rankDisplay.innerText = getRank(state.level);
  currentXpText.innerText = xpThisLevel;
  maxXpText.innerText = xpPerLevel;
  xpBarFill.style.width = `${(xpThisLevel / xpPerLevel) * 100}%`;

  if (progressPercentage === 100) {
    motivateBanner.innerText = "🏆 DOMINATION ACHIEVED! Master of advanced JavaScript!";
  } else if (progressPercentage > 0) {
    motivateBanner.innerText = `Keep hunting sub-quests! ${progressPercentage}% conquered!`;
  }

  saveState();
};

const toggleAccordion = (mainId) => {
  const index = state.activeAccordions.indexOf(mainId);
  if (index === -1) {
    state.activeAccordions.push(mainId);
  } else {
    state.activeAccordions.splice(index, 1);
  }
  saveState();
  renderQuestBoard();
};

const toggleSubQuest = (subId, event) => {
  event.stopPropagation(); 
  const idx = state.completedSubQuests.indexOf(subId);
  if (idx === -1) {
    state.completedSubQuests.push(subId);
  } else {
    state.completedSubQuests.splice(idx, 1);
  }
  updateEngine();
  renderQuestBoard();
};

// --- Core Render Loop ---
const renderQuestBoard = () => {
  questListContainer.innerHTML = '';

  masterSyllabus.forEach(mainQuest => {
    const isExpanded = state.activeAccordions.includes(mainQuest.id);
    
    const subQuestsCount = mainQuest.subQuests.length;
    const completedSubsThisTopic = mainQuest.subQuests.filter(s => state.completedSubQuests.includes(s.id)).length;
    const topicPercent = subQuestsCount > 0 ? Math.round((completedSubsThisTopic / subQuestsCount) * 100) : 0;

    const wrapper = document.createElement('div');
    wrapper.className = `quest-wrapper ${isExpanded ? 'active' : ''}`;

    const header = document.createElement('div');
    header.className = 'quest-header';
    header.onclick = () => toggleAccordion(mainQuest.id);

    header.innerHTML = `
      <div class="quest-header-left">
        <span class="arrow-icon">▼</span>
        <div class="quest-title-box">
          <h4>${mainQuest.title}</h4>
          <div class="quest-sub-summary">${mainQuest.category} • ${completedSubsThisTopic}/${subQuestsCount} Subtasks</div>
        </div>
      </div>
      <div class="quest-header-right">
        <div class="header-progress-pill">${topicPercent}% Done</div>
      </div>
    `;

    const dropdown = document.createElement('div');
    dropdown.className = 'quest-details-dropdown';
    
    const subList = document.createElement('div');
    subList.className = 'sub-quest-list';

    // Renders ONLY the MDN documentation Link Button inside the Accordion
    const resourceBanner = document.createElement('div');
    resourceBanner.style.padding = '0.75rem 1rem';
    resourceBanner.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    
    resourceBanner.innerHTML = `
      <div style="display:flex; gap:10px;">
        <a href="${mainQuest.mdnLink}" target="_blank" style="text-decoration:none; color:#38bdf8; font-weight:bold; font-size:0.8rem; background:rgba(56,189,248,0.1); padding:8px 14px; border-radius:6px; border:1px solid rgba(56,189,248,0.2); display:inline-flex; align-items:center; gap:5px; transition: background 0.2s;">
          📚 Read Official MDN Docs →
        </a>
      </div>
    `;
    subList.appendChild(resourceBanner);

    mainQuest.subQuests.forEach(sub => {
      const isSubDone = state.completedSubQuests.includes(sub.id);
      const subElement = document.createElement('div');
      subElement.className = `sub-quest-item ${isSubDone ? 'completed' : ''}`;
      subElement.onclick = (e) => toggleSubQuest(sub.id, e);

      let tagClass = 'standard';
      let cleanTagText = sub.importance;
      if (sub.importance === 'critical') {
        tagClass = 'critical';
        cleanTagText = '🔥 Critical';
      } else if (sub.importance === 'important') {
        tagClass = 'important';
        cleanTagText = '⭐ Important';
      }

      subElement.innerHTML = `
        <div class="sub-left">
          <div class="sub-checkbox"></div>
          <span class="sub-title">${sub.title}</span>
        </div>
        <div class="sub-right">
          <span class="importance-tag ${tagClass}">${cleanTagText}</span>
          <span class="sub-xp">+${sub.xp} XP</span>
        </div>
      `;
      subList.appendChild(subElement);
    });

    dropdown.appendChild(subList);
    wrapper.appendChild(header);
    wrapper.appendChild(dropdown);
    questListContainer.appendChild(wrapper);
  });
};

// --- Pomodoro Focus Timer Logic ---
let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isTimerRunning = false;
let isWorkMode = true;

const timeDisplay = document.getElementById('time-display');
const timerMode = document.getElementById('timer-mode');
const startBtn = document.getElementById('start-timer');
const resetBtn = document.getElementById('reset-timer');

const updateTimerVisuals = () => {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timeDisplay.innerText = `${minutes}:${seconds}`;
};

const toggleTimer = () => {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    startBtn.innerText = "▶ Start";
    isTimerRunning = false;
  } else {
    isTimerRunning = true;
    startBtn.innerText = "⏸ Pause";
    
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerVisuals();
      } else {
        // Timer Finished!
        clearInterval(timerInterval);
        isTimerRunning = false;
        playSound('levelup'); // Epic level-up chime
        triggerDopamineConfetti(true); // Big firework splash
        
        // Switch Modes
        isWorkMode = !isWorkMode;
        timeLeft = isWorkMode ? 25 * 60 : 5 * 60; // 25 min work, 5 min break
        timerMode.innerText = isWorkMode ? "Work Session 🔥" : "Break Time ☕";
        
        // Change color variables depending on mode
        timeDisplay.style.color = isWorkMode ? "var(--critical)" : "var(--accent)";
        timeDisplay.style.textShadow = isWorkMode ? "0 0 15px rgba(239, 68, 68, 0.4)" : "0 0 15px rgba(16, 185, 129, 0.4)";
        
        updateTimerVisuals();
        startBtn.innerText = "▶ Start";
      }
    }, 1000);
  }
};

const resetTimerAction = () => {
  clearInterval(timerInterval);
  isTimerRunning = false;
  startBtn.innerText = "▶ Start";
  timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
  updateTimerVisuals();
};

startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimerAction);
updateTimerVisuals(); // Initialize the display on load

// --- Initialize App ---
renderQuestBoard();
updateEngine();
