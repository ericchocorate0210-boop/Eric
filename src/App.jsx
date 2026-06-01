import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  HeartPulse,
  Info,
  Target,
  ShieldCheck,
  Activity,
} from "lucide-react";

function Card({ className = "", children }) {
  return (
    <div className={`rounded-3xl border border-slate-100 bg-white ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-700",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
  };
  const sizes = {
    default: "min-h-10 px-4 py-2 text-sm",
    sm: "min-h-8 px-3 py-1 text-sm",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

const muscleData = {
  chest: {
    name: "Chest",
    subtitle: "Pectoralis major and minor",
    function:
      "Helps push objects away from the body and supports upper-body strength.",
    exercises: ["Push-ups", "Bench press", "Chest press machine"],
    beginnerTip:
      "Start with incline push-ups or knee push-ups before trying full push-ups.",
    safety: "Keep your shoulders stable and avoid flaring your elbows too wide.",
  },
  shoulders: {
    name: "Shoulders",
    subtitle: "Deltoids and shoulder stabilizers",
    function:
      "Helps lift and rotate the arms and supports many upper-body exercises.",
    exercises: ["Shoulder press", "Lateral raises", "Wall angels"],
    beginnerTip: "Train with light weights first because shoulders are easy to overwork.",
    safety: "Move slowly and stop if you feel sharp pain.",
  },
  biceps: {
    name: "Biceps",
    subtitle: "Front upper arm muscles",
    function: "Helps bend the elbow and supports pulling movements.",
    exercises: ["Biceps curls", "Hammer curls", "Resistance band curls"],
    beginnerTip: "Keep your elbows close to your body and lift slowly.",
    safety: "Do not swing your body to lift heavier weights.",
  },
  triceps: {
    name: "Triceps",
    subtitle: "Back upper arm muscles",
    function: "Helps straighten the elbow and supports pushing movements.",
    exercises: ["Triceps dips", "Cable pushdowns", "Close-grip push-ups"],
    beginnerTip: "Start with light resistance and focus on full control.",
    safety: "Avoid locking your elbows too hard at the top.",
  },
  forearms: {
    name: "Forearms",
    subtitle: "Grip and wrist muscles",
    function: "Improves grip strength for lifting, carrying, and sports.",
    exercises: ["Wrist curls", "Farmer’s carry", "Dead hang"],
    beginnerTip: "Train grip gradually because forearms can fatigue quickly.",
    safety: "Avoid bending the wrist into painful positions.",
  },
  abs: {
    name: "Abs",
    subtitle: "Rectus abdominis and obliques",
    function: "Supports trunk movement, posture, and core stability.",
    exercises: ["Crunches", "Plank", "Mountain climbers"],
    beginnerTip: "Start with short sets and focus on controlled breathing.",
    safety: "Do not pull your neck during crunches.",
  },
  core: {
    name: "Core Stability",
    subtitle: "Deep core and stabilizing muscles",
    function:
      "Stabilizes the body, improves balance, and supports almost every exercise.",
    exercises: ["Dead bug", "Side plank", "Bird dog"],
    beginnerTip: "Begin with slow bodyweight movements before adding difficulty.",
    safety: "Avoid holding your breath. Keep your lower back protected.",
  },
  upperBack: {
    name: "Upper Back",
    subtitle: "Trapezius, rhomboids, and rear delts",
    function: "Helps posture, shoulder stability, and pulling movements.",
    exercises: ["Seated row", "Face pulls", "Reverse fly"],
    beginnerTip: "Focus on squeezing your shoulder blades together during each rep.",
    safety: "Do not shrug too hard or pull with sudden jerking movements.",
  },
  lats: {
    name: "Lats",
    subtitle: "Latissimus dorsi",
    function: "Helps pull the arms downward and gives the back a stronger shape.",
    exercises: ["Lat pulldown", "Assisted pull-up", "Single-arm row"],
    beginnerTip: "Imagine pulling your elbows down instead of only pulling with your hands.",
    safety: "Avoid leaning back too much during pulldowns.",
  },
  lowerBack: {
    name: "Lower Back",
    subtitle: "Erector spinae",
    function: "Supports the spine and helps maintain a stable posture.",
    exercises: ["Superman exercise", "Bird dog", "Back extension"],
    beginnerTip:
      "Use slow and controlled movements. Training the lower back is about stability, not speed.",
    safety: "Keep your spine neutral and stop if you feel sharp pain.",
  },
  glutes: {
    name: "Glutes",
    subtitle: "Gluteus maximus, medius, and minimus",
    function:
      "Supports hip movement, posture, running, jumping, and lower-body power.",
    exercises: ["Glute bridges", "Hip thrusts", "Step-ups"],
    beginnerTip: "Focus on squeezing the glutes at the top of each movement.",
    safety: "Do not overarch your lower back during hip thrusts.",
  },
  quads: {
    name: "Quads",
    subtitle: "Front thigh muscles",
    function: "Helps straighten the knee and supports squats, stairs, and jumping.",
    exercises: ["Bodyweight squats", "Leg press", "Step-ups"],
    beginnerTip: "Practice bodyweight squats before adding weights.",
    safety: "Keep your knees aligned with your toes.",
  },
  hamstrings: {
    name: "Hamstrings",
    subtitle: "Back thigh muscles",
    function: "Helps bend the knee and extend the hip during running and lifting.",
    exercises: ["Romanian deadlift", "Hamstring curl", "Glute bridge"],
    beginnerTip: "Move slowly and feel the stretch in the back of your thighs.",
    safety: "Keep your back straight and avoid rounding your spine.",
  },
  calves: {
    name: "Calves",
    subtitle: "Gastrocnemius and soleus",
    function: "Helps walking, running, jumping, and ankle stability.",
    exercises: ["Standing calf raises", "Seated calf raises", "Jump rope"],
    beginnerTip: "Pause briefly at the top of each calf raise.",
    safety: "Do not bounce too quickly; use controlled movement.",
  },
};

const frontMuscles = [
  "shoulders",
  "chest",
  "biceps",
  "forearms",
  "abs",
  "core",
  "quads",
  "calves",
];

const backMuscles = [
  "upperBack",
  "lats",
  "triceps",
  "lowerBack",
  "glutes",
  "hamstrings",
  "calves",
];

const muscleView = {
  shoulders: "front",
  chest: "front",
  biceps: "front",
  forearms: "front",
  abs: "front",
  core: "front",
  quads: "front",
  calves: "front",
  upperBack: "back",
  lats: "back",
  triceps: "back",
  lowerBack: "back",
  glutes: "back",
  hamstrings: "back",
};

const sportComparison = [
  { sport: "Basketball", chest: 3, back: 3, arms: 4, core: 4, legs: 5 },
  { sport: "Swimming", chest: 4, back: 5, arms: 5, core: 4, legs: 3 },
  { sport: "Running", chest: 1, back: 2, arms: 2, core: 3, legs: 5 },
  { sport: "Weight Training", chest: 5, back: 5, arms: 5, core: 4, legs: 5 },
];

function RatingBar({ value }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-2 w-6 rounded-full ${
            n <= value ? "bg-slate-800" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function estimateSportUsage(input) {
  const sport = input.trim();
  const text = sport.toLowerCase();

  let result = { sport, chest: 2, back: 2, arms: 2, core: 3, legs: 3 };

  if (/run|jog|marathon|sprint|track|cycling|bike|soccer|football|hiking|skating/.test(text)) {
    result = { sport, chest: 1, back: 2, arms: 2, core: 3, legs: 5 };
  }

  if (/swim|surf|rowing|kayak|dragon boat|paddle/.test(text)) {
    result = { sport, chest: 4, back: 5, arms: 5, core: 4, legs: 3 };
  }

  if (/basket|volley|tennis|badminton|baseball|softball|golf|boxing|martial|karate|taekwondo/.test(text)) {
    result = { sport, chest: 3, back: 3, arms: 4, core: 4, legs: 4 };
  }

  if (/weight|gym|lifting|bodybuilding|powerlifting|crossfit|calisthenics/.test(text)) {
    result = { sport, chest: 5, back: 5, arms: 5, core: 4, legs: 5 };
  }

  if (/yoga|pilates|dance|ballet|gymnastics/.test(text)) {
    result = { sport, chest: 2, back: 3, arms: 3, core: 5, legs: 4 };
  }

  return result;
}

function MuscleTag({ id, label, className, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`absolute rounded-full border px-3 py-1 text-xs font-semibold shadow-sm transition-all duration-200 ${
        active
          ? "scale-105 bg-slate-900 text-white"
          : "bg-white text-slate-700 hover:scale-105 hover:bg-slate-100"
      } ${className}`}
    >
      {label}
    </button>
  );
}

function HumanFigure({ selectedMuscle, setSelectedMuscle }) {
  const [view, setView] = useState("front");
  const visibleMuscles = view === "front" ? frontMuscles : backMuscles;

  function switchView(nextView) {
    setView(nextView);
    if (nextView === "front" && muscleView[selectedMuscle] === "back") {
      setSelectedMuscle("chest");
    }
    if (nextView === "back" && muscleView[selectedMuscle] === "front") {
      setSelectedMuscle("upperBack");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[390px]">
      <div className="mb-4 flex justify-center gap-3">
        <Button
          variant={view === "front" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => switchView("front")}
        >
          Front View
        </Button>
        <Button
          variant={view === "back" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => switchView("back")}
        >
          Back View
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {visibleMuscles.map((key) => (
          <Button
            key={key}
            variant={selectedMuscle === key ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedMuscle(key)}
          >
            {muscleData[key].name}
          </Button>
        ))}
      </div>

      <div className="relative mx-auto h-[560px] w-[340px] rounded-[2rem] bg-gradient-to-b from-slate-50 to-white p-6 shadow-inner">
        <div className="absolute left-1/2 top-7 h-16 w-16 -translate-x-1/2 rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute left-1/2 top-[86px] h-8 w-7 -translate-x-1/2 rounded-b-xl rounded-t-sm border-x-2 border-b-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute left-1/2 top-[110px] h-[174px] w-[120px] -translate-x-1/2 rounded-[3rem] border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute left-[76px] top-[125px] h-[168px] w-[31px] rotate-[10deg] rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute right-[76px] top-[125px] h-[168px] w-[31px] -rotate-[10deg] rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute left-1/2 top-[258px] h-[54px] w-[92px] -translate-x-1/2 rounded-[2rem] border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute left-[128px] top-[298px] h-[180px] w-[29px] rotate-[2deg] rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute right-[128px] top-[298px] h-[180px] w-[29px] -rotate-[2deg] rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute left-[128px] top-[402px] h-[112px] w-[27px] rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute right-[128px] top-[402px] h-[112px] w-[27px] rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute left-[116px] bottom-[18px] h-5 w-12 rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />
        <div className="absolute right-[116px] bottom-[18px] h-5 w-12 rounded-full border-2 border-slate-400 bg-[#f2c9a5]" />

        {view === "front" && (
          <>
            <div className="absolute left-1/2 top-[150px] h-[96px] w-[2px] -translate-x-1/2 bg-slate-300" />
            <div className="absolute left-1/2 top-[212px] h-[2px] w-[44px] -translate-x-1/2 bg-slate-300" />
            <div className="absolute left-1/2 top-[238px] h-[2px] w-[44px] -translate-x-1/2 bg-slate-300" />
          </>
        )}

        {view === "front" ? (
          <>
            <MuscleTag id="shoulders" label="Shoulders" className="left-2 top-[112px]" active={selectedMuscle === "shoulders"} onClick={setSelectedMuscle} />
            <MuscleTag id="chest" label="Chest" className="left-1/2 top-[152px] -translate-x-1/2" active={selectedMuscle === "chest"} onClick={setSelectedMuscle} />
            <MuscleTag id="biceps" label="Biceps" className="left-1 top-[202px]" active={selectedMuscle === "biceps"} onClick={setSelectedMuscle} />
            <MuscleTag id="forearms" label="Forearms" className="left-0 top-[272px]" active={selectedMuscle === "forearms"} onClick={setSelectedMuscle} />
            <MuscleTag id="abs" label="Abs" className="left-1/2 top-[222px] -translate-x-1/2" active={selectedMuscle === "abs"} onClick={setSelectedMuscle} />
            <MuscleTag id="core" label="Core" className="left-1/2 top-[258px] -translate-x-1/2" active={selectedMuscle === "core"} onClick={setSelectedMuscle} />
            <MuscleTag id="quads" label="Quads" className="left-[42px] bottom-[100px]" active={selectedMuscle === "quads"} onClick={setSelectedMuscle} />
            <MuscleTag id="calves" label="Calves" className="left-1/2 bottom-[38px] -translate-x-1/2" active={selectedMuscle === "calves"} onClick={setSelectedMuscle} />
          </>
        ) : (
          <>
            <MuscleTag id="upperBack" label="Upper Back" className="right-1 top-[140px]" active={selectedMuscle === "upperBack"} onClick={setSelectedMuscle} />
            <MuscleTag id="lats" label="Lats" className="right-8 top-[200px]" active={selectedMuscle === "lats"} onClick={setSelectedMuscle} />
            <MuscleTag id="triceps" label="Triceps" className="left-0 top-[205px]" active={selectedMuscle === "triceps"} onClick={setSelectedMuscle} />
            <MuscleTag id="lowerBack" label="Lower Back" className="right-1 top-[255px]" active={selectedMuscle === "lowerBack"} onClick={setSelectedMuscle} />
            <MuscleTag id="glutes" label="Glutes" className="left-1/2 top-[302px] -translate-x-1/2" active={selectedMuscle === "glutes"} onClick={setSelectedMuscle} />
            <MuscleTag id="hamstrings" label="Hamstrings" className="right-1 bottom-[100px]" active={selectedMuscle === "hamstrings"} onClick={setSelectedMuscle} />
            <MuscleTag id="calves" label="Calves" className="left-1/2 bottom-[38px] -translate-x-1/2" active={selectedMuscle === "calves"} onClick={setSelectedMuscle} />
          </>
        )}
      </div>

      <p className="mt-3 text-center text-sm text-slate-500">
        Switch between front and back views, then click a muscle label.
      </p>
    </div>
  );
}

export default function BeginnerFitnessGuide() {
  const [selectedMuscle, setSelectedMuscle] = useState("chest");
  const [sportInput, setSportInput] = useState("");
  const [customSport, setCustomSport] = useState(null);
  const selected = muscleData[selectedMuscle];
  const displayedSports = customSport ? [...sportComparison, customSport] : sportComparison;

  function handleGenerateSport() {
    if (!sportInput.trim()) return;
    setCustomSport(estimateSportUsage(sportInput));
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm">
            <Dumbbell className="h-4 w-4" /> Beginner Fitness Guide
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Training Methods for Different Muscle Groups
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This website is designed for fitness beginners, especially college students
            and young adults who want to start building a workout habit. It helps users
            understand major muscle groups, their functions, and safe beginner-friendly
            training methods.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              onClick={() =>
                document.getElementById("interactive")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-2xl px-6 py-6 text-base"
            >
              Explore Muscles
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("rationale")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-2xl px-6 py-6 text-base"
            >
              Project Rationale
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("sports")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-2xl px-6 py-6 text-base"
            >
              Sports Usage
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="rationale" className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <Target className="mb-4 h-8 w-8" />
              <h2 className="text-xl font-bold">Audience</h2>
              <p className="mt-3 text-slate-600">
                Fitness beginners, especially college students or young adults with
                little to no exercise experience.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <Info className="mb-4 h-8 w-8" />
              <h2 className="text-xl font-bold">Purpose</h2>
              <p className="mt-3 text-slate-600">
                To help beginners understand how to start training effectively and reduce
                confusion about which muscle groups to train.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <ShieldCheck className="mb-4 h-8 w-8" />
              <h2 className="text-xl font-bold">Safety Goal</h2>
              <p className="mt-3 text-slate-600">
                To introduce basic training knowledge so beginners can avoid ineffective
                routines and lower the risk of injuries.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="interactive" className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-slate-500">
              Interactive Learning
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Click a muscle area to learn how to train it
            </h2>
          </div>
          <p className="max-w-md text-slate-600">
            Switch between front and back views, then click the muscle labels or buttons
            to view training information.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <HumanFigure
                selectedMuscle={selectedMuscle}
                setSelectedMuscle={setSelectedMuscle}
              />
            </CardContent>
          </Card>

          <motion.div
            key={selectedMuscle}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-slate-900 p-3 text-white">
                    <Activity className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{selected.name}</h3>
                    <p className="text-slate-500">{selected.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold">Function</h4>
                    <p className="mt-2 text-slate-600">{selected.function}</p>
                  </div>

                  <div>
                    <h4 className="font-bold">Beginner Exercises</h4>
                    <p className="mt-1 text-sm text-slate-500">
                      Suggested amount: 2–3 sets, 8–12 reps each. For planks or holds,
                      try 15–30 seconds per set.
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {selected.exercises.map((exercise) => (
                        <div
                          key={exercise}
                          className="rounded-2xl bg-slate-100 px-4 py-3 text-center"
                        >
                          <div className="font-medium">{exercise}</div>
                          <div className="mt-2 text-xs text-slate-500">2–3 sets</div>
                          <div className="text-xs text-slate-500">8–12 reps</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                      <h4 className="font-bold">Beginner Tip</h4>
                      <p className="mt-2 text-slate-600">{selected.beginnerTip}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                      <h4 className="font-bold">Safety Reminder</h4>
                      <p className="mt-2 text-slate-600">{selected.safety}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="sports" className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8">
          <p className="font-semibold uppercase tracking-[0.25em] text-slate-500">
            Infographic
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Muscle Usage Across Different Sports
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            This simple comparison helps beginners understand that different activities
            emphasize different muscle groups.
          </p>
        </div>

        <Card className="mb-6 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold">Try Your Own Sport</h3>
            <p className="mt-2 text-slate-600">
              Type a sport name, then generate a simple estimated muscle usage result.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                value={sportInput}
                onChange={(event) => setSportInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleGenerateSport();
                }}
                placeholder="Example: tennis, yoga, soccer, boxing"
                className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              <Button
                onClick={handleGenerateSport}
                className="rounded-2xl px-6 py-6 text-base"
              >
                Generate Result
              </Button>
            </div>

            {customSport && (
              <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-slate-700">
                Added result for <span className="font-bold">{customSport.sport}</span>.
                The score is an estimated guide for beginners.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="overflow-x-auto p-6">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-sm uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-2">Sport</th>
                  <th className="px-4 py-2">Chest</th>
                  <th className="px-4 py-2">Back</th>
                  <th className="px-4 py-2">Arms</th>
                  <th className="px-4 py-2">Core</th>
                  <th className="px-4 py-2">Legs</th>
                </tr>
              </thead>
              <tbody>
                {displayedSports.map((row) => (
                  <tr
                    key={row.sport}
                    className={`rounded-2xl bg-white shadow-sm ${
                      customSport?.sport === row.sport ? "ring-2 ring-slate-300" : ""
                    }`}
                  >
                    <td className="rounded-l-2xl px-4 py-4 font-bold">{row.sport}</td>
                    <td className="px-4 py-4"><RatingBar value={row.chest} /></td>
                    <td className="px-4 py-4"><RatingBar value={row.back} /></td>
                    <td className="px-4 py-4"><RatingBar value={row.arms} /></td>
                    <td className="px-4 py-4"><RatingBar value={row.core} /></td>
                    <td className="rounded-r-2xl px-4 py-4"><RatingBar value={row.legs} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-8">
        <Card className="bg-slate-900 text-white shadow-xl">
          <CardContent className="grid gap-8 p-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <HeartPulse className="mb-4 h-10 w-10" />
              <h2 className="text-3xl font-bold">
                Start small. Train safely. Stay consistent.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-200">
              This project uses multimodal elements such as a front/back body diagram,
              clickable muscle labels, images, charts, and infographics. These elements
              help beginners learn fitness knowledge more clearly and confidently.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}