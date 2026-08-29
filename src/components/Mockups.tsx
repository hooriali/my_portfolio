import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

/* ---------- tiny building blocks ---------- */

const bar = (w: string, extra = "", color = "bg-current") => (
  <div className={`rounded-full ${color} ${extra}`} style={{ width: w, height: 4 }} />
);

function Phone({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative w-[78px] shrink-0 rounded-[16px] bg-ink p-[4px] shadow-[0_18px_30px_-12px_rgba(23,21,15,0.45)] ${className}`}
      style={style}
    >
      <div className="absolute left-1/2 top-[7px] z-10 h-[7px] w-7 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[12px] bg-white">{children}</div>
    </div>
  );
}

function Tablet({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-[128px] shrink-0 rounded-[14px] bg-ink p-[5px] shadow-[0_18px_30px_-12px_rgba(23,21,15,0.45)] ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[9px] bg-white">{children}</div>
    </div>
  );
}

function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[210px] shrink-0">
      <div className="rounded-t-[10px] bg-ink p-[5px] pb-[7px] shadow-[0_24px_40px_-16px_rgba(23,21,15,0.5)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[5px] bg-white">{children}</div>
      </div>
      <div
        className="mx-auto h-[7px] w-[118%] -translate-x-[7.5%] rounded-b-[8px] bg-gradient-to-b from-neutral-300 to-neutral-400"
        style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)" }}
      />
    </div>
  );
}

/* ---------- screens per project ---------- */

// OpenAiNavigator - Scholarship Platform
function OpenNavA({ c }: { c: string }) {
  return (
    <div className="flex h-full flex-col text-neutral-300">
      <div className="flex items-center gap-1 p-2">
        <div className="h-3 w-3 rounded-full" style={{ background: c }} />
        <div className="h-3 flex-1 rounded-full bg-neutral-100" />
      </div>
      <div className="relative mx-2 flex-1 overflow-hidden rounded-md" style={{ background: `${c}22` }}>
        <svg viewBox="0 0 60 80" className="absolute inset-0 h-full w-full">
          <path d="M8 66 C 20 50, 18 34, 34 30 S 50 16, 52 10" fill="none" stroke={c} strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
          <circle cx="8" cy="66" r="3.4" fill={c} />
          <circle cx="52" cy="10" r="3.4" fill="#17150f" />
        </svg>
      </div>
      <div className="m-2 rounded-md bg-white p-1.5 shadow-sm ring-1 ring-neutral-100">
        {bar("70%")}
        <div className="mt-1">{bar("45%")}</div>
        <div className="mt-1.5 h-3 rounded-full" style={{ background: c, width: "55%" }} />
      </div>
    </div>
  );
}

function OpenNavB({ c }: { c: string }) {
  return (
    <div className="flex h-full flex-col gap-1.5 p-2 text-neutral-300">
      <div className="mb-0.5 h-3 w-1/2 rounded-full bg-neutral-200" />
      {[85, 62, 94, 47].map((w, i) => (
        <div key={i} className="flex items-center gap-1.5 rounded-md bg-neutral-50 p-1.5">
          <div className="h-6 w-6 rounded" style={{ background: i === 2 ? c : `${c}55` }} />
          <div className="flex-1 space-y-1">
            {bar(`${w}%`)}
            {bar("40%")}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[7px] font-bold" style={{ color: c }}>{w}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// RAG Chatbot
function RAGPhone({ c, dark }: { c: string; dark: string }) {
  return (
    <div className="flex h-full flex-col bg-[#faf7f0] p-1.5 text-neutral-400">
      <div className="rounded-t-lg p-2 text-white" style={{ background: `linear-gradient(135deg, ${dark}, ${c})` }}>
        <p className="text-[8px] font-bold">🤖 RAG Chatbot</p>
        <div className="mt-1 h-1.5 w-12 rounded-full bg-white/30" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`self-${i % 2 === 0 ? "start" : "end"} max-w-[75%] rounded-xl p-1.5 shadow-sm ${i % 2 === 0 ? "bg-neutral-100" : ""}`} style={i % 2 !== 0 ? { background: `${c}22`, borderLeft: `2px solid ${c}` } : {}}>
            <div className={`h-1.5 w-${12 + i * 4} rounded-full ${i % 2 === 0 ? "bg-neutral-200" : ""}`} style={i % 2 !== 0 ? { background: c, width: `${60 + i * 10}%` } : { width: "70%" }} />
          </div>
        ))}
      </div>
      <div className="m-1.5 rounded-lg bg-white p-1.5 shadow-inner">
        <div className="flex gap-1">
          <div className="flex-1 h-2 rounded-full bg-neutral-100" />
          <span className="h-5 w-5 rounded-full flex items-center justify-center" style={{ background: c, color: "white" }}>➤</span>
        </div>
      </div>
    </div>
  );
}

function RAGTablet({ c, dark }: { c: string; dark: string }) {
  return (
    <div className="flex h-full gap-2 bg-[#faf7f0] p-2.5 text-neutral-400">
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="flex items-center gap-1">
          {[c, dark, `${c}88`].map((bg, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded text-[7px] font-bold text-white" style={{ background: bg }}>{i === 0 ? "BM25" : i === 1 ? "Vector" : "Hybrid"}</span>
          ))}
        </div>
        <div className="space-y-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-[8px] font-bold w-5" style={{ color: dark }}>Q{i+1}</span>
              <div className="flex-1 h-2 rounded-full bg-white shadow-sm">
                <div className="h-full rounded-full" style={{ background: i === 2 ? c : `${c}77`, width: `${65 + Math.random() * 30}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-1.5">
        <div className="flex-1 rounded-md p-1.5 bg-white shadow-sm overflow-hidden">
          <div className="text-[7px] font-bold mb-1" style={{ color: dark }}>Retrieval Config</div>
          {["Chunk Size:", "Overlap:", "K Results:"].map((label, i) => (
            <div key={i} className="flex justify-between text-[7px] mb-0.5">
              <span>{label}</span>
              <span className="font-bold" style={{ color: c }}>{[512, 64, 5][i]}</span>
            </div>
          ))}
          <div className="mt-1 h-12 rounded" style={{ background: `${c}15` }} />
        </div>
      </div>
    </div>
  );
}

// AI Study Pattern Analyzer
function StudyA({ c, dark }: { c: string; dark: string }) {
  return (
    <div className="flex h-full flex-col gap-1.5 bg-[#f6f8f1] p-2 text-neutral-400">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-14 rounded-full" style={{ background: dark }} />
        <div className="text-[8px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: c }}>RF Model</div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: "Study hrs", val: 82 },
          { label: "Focus", val: 71 },
          { label: "Tests", val: 95 },
          { label: "Trend", val: 68 }
        ].map((item, i) => (
          <div key={i} className="rounded-md p-1.5 text-white" style={{ background: i % 2 ? dark : c }}>
            <div className="text-[7px] opacity-80">{item.label}</div>
            <div className="text-base font-extrabold mt-0.5">{item.val}%</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-1 rounded-md bg-white p-1.5 shadow-sm">
        {[55, 72, 48, 88, 63, 79, 91, 57].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm transition-colors group-hover:bg-sand-deep/20" 
               style={{ height: `${h}%`, background: i === 3 || i === 6 ? dark : `${c}77` }} 
          />
        ))}
      </div>
    </div>
  );
}

function StudyB({ c, dark }: { c: string; dark: string }) {
  const subjects = [
    { name: "Math", score: 88, trend: "up" },
    { name: "CS", score: 92, trend: "up" },
    { name: "Physics", score: 76, trend: "down" },
    { name: "English", score: 84, trend: "up" },
  ];
  return (
    <div className="flex h-full flex-col gap-1.5 bg-[#f6f8f1] p-2">
      <div className="h-2.5 w-16 rounded-full" style={{ background: dark }} />
      <div className="text-[8px] font-bold" style={{ color: c }}>Study Insights</div>
      {subjects.map((sub, i) => (
        <div key={i} className="flex items-center gap-1.5 rounded-md bg-white p-1.5 shadow-sm">
          <span className="h-2 w-2 rounded-full" style={{ background: sub.trend === "up" ? c : "#e15a50" }} />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-semibold truncate">{sub.name}</div>
            {bar(`${sub.score}%`, "", `bg-gradient-to-r ${sub.trend === "up" ? "from-blue-500 to-green-400" : "from-yellow-400 to-orange-400"}`)}
          </div>
          <span className="text-[10px] font-bold" style={{ color: dark }}>{sub.score}</span>
        </div>
      ))}
      <div className="mt-auto rounded-md p-1.5 text-center" style={{ background: `${c}22` }}>
        <span className="text-[8px] font-bold" style={{ color: dark }}>📈 Predicted: A</span>
      </div>
    </div>
  );
}

// WhatsApp Chatbot Suite
function WhatsAppScreen({ c }: { c: string; deep: string }) {
  const messages = [
    { me: false, msg: "Hi! How can I help?" },
    { me: true, msg: "What courses are available?" },
    { me: false, msg: "Found 12 matches for you!" },
  ];
  return (
    <div className="flex h-full flex-col text-neutral-300" style={{ background: "#075e54" }}>
      <div className="flex items-center gap-2 bg-[#128c7e] px-3 py-1.5">
        <div className="h-5 w-5 rounded-full bg-white" />
        <span className="flex-1 text-[10px] font-bold text-white">Chatbot Assistant</span>
        <span className="text-[8px] text-white/70">online</span>
      </div>
      <div className="flex-1 space-y-1.5 p-2">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[70%] rounded-lg p-1.5 text-[8px] text-black ${m.me ? "ml-auto bg-[#dcf8c6]" : "mr-auto bg-white"}`}>
            {m.msg}
          </div>
        ))}
      </div>
      <div className="mx-2 mb-2 flex items-center gap-1 rounded-full bg-white/90 p-1">
        <input readOnly placeholder="Type a message..." className="flex-1 text-[8px] bg-transparent outline-none text-neutral-600" />
        <span className="h-5 w-5 rounded-full flex items-center justify-center text-white text-[10px]" style={{ background: c }}>➤</span>
      </div>
    </div>
  );
}

// Responsive Web Portfolio
function PortfolioA({ c, deep }: { c: string; deep: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-2 bg-[#fff]" style={{ background: `linear-gradient(180deg, #fdfcf8 40%, ${c}18)` }}>
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-display font-extrabold text-lg" style={{ background: c }}>
        HA
      </div>
      <div className="w-full space-y-1.5 text-center">
        <div className="h-1.5 mx-auto rounded-full" style={{ background: deep, width: "35%" }} />
        <div className="h-1 mx-auto rounded-full bg-neutral-200" style={{ width: "55%" }} />
        <div className="h-1 mx-auto rounded-full bg-neutral-150" style={{ width: "28%" }} />
      </div>
      <div className="grid grid-cols-2 gap-1 w-full mt-1">
        {[c, deep, `${c}aa`, `${deep}99`].map((bg, i) => (
          <div key={i} className="aspect-square rounded-lg" style={{ background: bg }} />
        ))}
      </div>
    </div>
  );
}

function PortfolioB({ c, deep }: { c: string; deep: string }) {
  return (
    <div className="flex h-full flex-col gap-1.5 p-2 bg-white">
      <div className="h-2 w-12 rounded-full" style={{ background: deep }} />
      <div className="flex flex-1 flex-col gap-1">
        {["About", "Projects", "Skills", "Contact"].map((sec, i) => (
          <div key={sec} className="flex items-center gap-1.5 rounded-md p-1" style={{ background: i === 1 ? `${c}22` : `${c}10` }}>
            <div className="h-1 w-3 rounded-full" style={{ background: i === 1 ? c : `${c}66` }} />
            <div className="flex-1 space-y-0.5 text-neutral-400">
              {bar("65%", "", "bg-neutral-200")}
              {bar("30%", "", "bg-neutral-150")}
            </div>
            <i className={`fa-solid fa-chevron-right text-[7px]`} style={{ color: i === 1 ? deep : `${c}44` }} />
          </div>
        ))}
      </div>
      <div className="rounded-md p-1.5 text-white text-center" style={{ background: deep }}>
        <span className="text-[9px] font-bold">Let's Connect ✉️</span>
      </div>
    </div>
  );
}


/* ---------- collages ---------- */

export default function ProjectDevices({ project }: { project: Project }) {
  const c = project.color;
  const d = project.deep;

  switch (project.id) {
    case 4: // WhatsApp Chatbot - laptop
      return (
        <div className="flex items-end justify-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
          <Laptop>
            <WhatsAppScreen c={c} deep={d} />
          </Laptop>
        </div>
      );

    case 2: // RAG - phone + tablet
      return (
        <div className="flex items-end justify-center transition-transform duration-500 group-hover:-translate-y-2">
          <Tablet className="rotate-3">
            <RAGTablet c={c} dark={d} />
          </Tablet>
          <Phone className="-ml-7 mb-1 -rotate-6">
            <RAGPhone c={c} dark={d} />
          </Phone>
        </div>
      );

    case 3: // Study Pattern - phones
      return (
        <div className="relative flex items-end justify-center transition-transform duration-500 group-hover:-translate-y-2">
          <Phone className="rotate-6 translate-y-2">
            <StudyB c={c} dark={d} />
          </Phone>
          <Phone className="-ml-5 -rotate-6">
            <StudyA c={c} dark={d} />
          </Phone>
          <div className="absolute -right-2 top-1 rotate-6 rounded-md bg-white px-2 py-1 shadow-lg">
            <div className="flex items-center gap-1">
              <span className="text-xs">📊</span>
              <span className="h-1.5 w-7 rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
      );

    case 5: // Portfolio - phones
      return (
        <div className="flex items-end justify-center transition-transform duration-500 group-hover:-translate-y-2">
          <Phone className="-rotate-6">
            <PortfolioA c={c} deep={d} />
          </Phone>
          <Phone className="-ml-4 translate-y-3 rotate-6">
            <PortfolioB c={c} deep={d} />
          </Phone>
        </div>
      );

    default: // OpenAiNavigator - phones (id 1)
      return (
        <div className="flex items-end justify-center transition-transform duration-500 group-hover:-translate-y-2">
          <Phone className="-rotate-6">
            <OpenNavA c={c} />
          </Phone>
          <Phone className="-ml-4 translate-y-3 rotate-6">
            <OpenNavB c={c} />
          </Phone>
        </div>
      );
  }
}
