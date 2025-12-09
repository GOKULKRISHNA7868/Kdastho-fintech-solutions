import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Pointer from "./Pointer.jsx";
import ResultModal from "./ResultModal.jsx";
import {
  TAU,
  getSegmentIndexForAngle,
  computeDeterministicDelta,
} from "../utils/angle-utils.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const FRICTION = 0.99; // moderate decay: a few strong rotations then stop

const MIN_VELOCITY = 0.0025;

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = window.localStorage.getItem(key);
      return stored != null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue];
}

export default function SpinWheel({
  segments,
  size = "responsive",
  deterministicTarget,
  onSpinStart,
  onSpinComplete,
  showHighlightDuringSpin = true,
  showConfetti = true,
  disabledByAuth = false, // ⬅️ NEW
}) {
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [winner, setWinner] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const [user, setUser] = useState(null);
  const [canSpin, setCanSpin] = useState(true);
  const [lastSpinTime, setLastSpinTime] = useLocalStorage(
    "spinwheel-lastSpinTime",
    null
  );

  useEffect(() => {
    const fetchUserSpin = async () => {
      if (!auth.currentUser) {
        setUser(null);
        return;
      }

      setUser(auth.currentUser);

      try {
        const spinDocRef = doc(db, "spinRecords", auth.currentUser.uid);
        const spinSnap = await getDoc(spinDocRef);

        if (spinSnap.exists()) {
          const data = spinSnap.data();
          if (data.createdAt) {
            setLastSpinTime(data.createdAt.toMillis()); // convert Firestore timestamp to ms
          }
        } else {
          // No record exists → allow first spin
          setLastSpinTime(null);
        }
      } catch (err) {
        console.error("Error fetching spin record:", err);
        setLastSpinTime(null);
      }
    };

    fetchUserSpin();
  }, []);
  useEffect(() => {
    if (!user) {
      setCanSpin(false);
      setWaitTime("0h 0m 0s");
      return;
    }

    if (!lastSpinTime) {
      setCanSpin(true); // first-time spin allowed
      setWaitTime("0h 0m 0s");
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diffMs = now - lastSpinTime;
      if (diffMs >= 48 * 60 * 60 * 1000) {
        setCanSpin(true);
        setWaitTime("0h 0m 0s");
        clearInterval(interval);
        return;
      }

      const remainingMs = 48 * 60 * 60 * 1000 - diffMs;
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor(
        (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

      setCanSpin(false);
      setWaitTime(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [user, lastSpinTime]);

  const [stats, setStats] = useLocalStorage("spinwheel-stats-v1", {
    spinsCount: 0,
    lastWinnerName: null,
  });

  const frameRef = useRef(null);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(null);
  const angleRef = useRef(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!segments || !segments.length) {
      setError("No segments provided.");
      return;
    }
    const nameMap = new Map();
    for (let i = 0; i < segments.length; i++) {
      const name = segments[i].name;
      if (!nameMap.has(name)) {
        nameMap.set(name, [i]);
      } else {
        nameMap.get(name).push(i);
      }
    }
    const dup = [...nameMap.entries()].find(([, idx]) => idx.length > 1);
    if (dup) {
      const [name, idxs] = dup;
      console.error(
        `Segment names must be unique — duplicate name: '${name}'. Offending indices: ${idxs.join(
          ", "
        )}`
      );
      setError(`Segment names must be unique — duplicate name: '${name}'.`);
    } else {
      setError(null);
    }
  }, [segments]);

  useEffect(() => {
    if (!segments?.length) {
      setCurrentIndex(-1);
      return;
    }
    const idx = getSegmentIndexForAngle(angle, segments.length);
    setCurrentIndex(idx);
  }, [angle, segments]);

  const wheelSizeClass = useMemo(() => {
    if (size === "responsive") {
      return "w-[80vw] max-w-sm sm:w-[60vw] sm:max-w-md lg:w-[36vw] lg:max-w-xl";
    }
    if (typeof size === "number") {
      return `w-[${size}px] h-[${size}px]`;
    }
    return size;
  }, [size]);

  const handleSpinEnd = useCallback(async () => {
    if (!segments?.length) return;
    const index = getSegmentIndexForAngle(angleRef.current, segments.length);
    const result = segments[index] || null;

    setIsSpinning(false);
    setWinner(result);
    setShowResult(!!result);
    setStats((prev) => ({
      spinsCount: prev.spinsCount + 1,
      lastWinnerName: result ? result.name : prev.lastWinnerName,
    }));
    setAnnouncement(result ? `Result: ${result.name}` : "Spin finished");

    const now = Date.now();
    setLastSpinTime(now);

    // save to Firebase
    if (user) {
      const spinDocRef = doc(db, "spinRecords", user.uid);
      await setDoc(spinDocRef, { createdAt: serverTimestamp() });
    }

    if (onSpinComplete && result) {
      onSpinComplete(result);
    }
  }, [segments, onSpinComplete, setStats, user]);

  const step = useCallback(
    (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      let velocity = velocityRef.current;
      if (Math.abs(velocity) <= MIN_VELOCITY) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        velocityRef.current = 0;
        handleSpinEnd();
        return;
      }

      velocity *= FRICTION;
      velocityRef.current = velocity;
      const deltaAngle = velocity * (delta / 16.67); // normalize to ~60fps
      angleRef.current += deltaAngle;
      setAngle(angleRef.current);
      frameRef.current = requestAnimationFrame(step);
    },
    [handleSpinEnd]
  );
  const handleSpinClick = () => {
    if (!user) {
      console.log("Cannot spin: User not logged in");
      return;
    }
    if (!canSpin) {
      console.log("Cannot spin: Wait time not finished");
      return;
    }
    if (isSpinning) return;

    startSpin();
  };

  const startSpin = useCallback(
    (overrideTargetId) => {
      if (!segments?.length || isSpinning || error) return;

      const targetId = overrideTargetId ?? deterministicTarget;
      const baseVelocity = prefersReducedMotion
        ? 0.35
        : 0.5 + Math.random() * 0.6; // moderate initial push for some rotations

      if (targetId != null) {
        const idx = segments.findIndex((s) => s.id === targetId);
        if (idx !== -1) {
          const delta = computeDeterministicDelta({
            currentAngle: angleRef.current,
            targetIndex: idx,
            segmentCount: segments.length,
            extraRotations: prefersReducedMotion ? 1 : 4, // a few full turns
          });
          const durationMs = prefersReducedMotion ? 900 : 3500;
          const frames = durationMs / 16.67;
          velocityRef.current = delta / frames;
        } else {
          velocityRef.current = baseVelocity;
        }
      } else {
        velocityRef.current = baseVelocity;
      }

      if (onSpinStart) onSpinStart();
      setAnnouncement("Spinning");
      setIsSpinning(true);
      setWinner(null);
      setShowResult(false);
      lastTimeRef.current = null;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(step);
    },
    [
      deterministicTarget,
      error,
      isSpinning,
      onSpinStart,
      prefersReducedMotion,
      segments,
      step,
    ]
  );

  useEffect(
    () => () => frameRef.current && cancelAnimationFrame(frameRef.current),
    []
  );

  const handleKeyDown = (e) => {
    if (disabledByAuth) return; // ⛔ login required
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      startSpin();
    }
    if (!isSpinning && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      e.preventDefault();
      const delta =
        e.key === "ArrowLeft"
          ? -TAU / segments.length / 8
          : TAU / segments.length / 8;
      const next = angleRef.current + delta;
      angleRef.current = next;
      setAngle(next);
    }
  };

  const renderSegments = () => {
    if (!segments?.length) return null;
    const slice = TAU / segments.length;
    const radius = 50;
    let start = 0;

    return segments.map((segment, index) => {
      const end = start + slice;
      const largeArc = end - start <= Math.PI ? 0 : 1;
      const x1 = 50 + radius * Math.cos(start);
      const y1 = 50 + radius * Math.sin(start);
      const x2 = 50 + radius * Math.cos(end);
      const y2 = 50 + radius * Math.sin(end);
      const pathData = `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const mid = start + slice / 2;
      const tx = 50 + radius * 0.4 * Math.cos(mid);
      const ty = 50 + radius * 0.4 * Math.sin(mid);

      const isActive = showHighlightDuringSpin && index === currentIndex;
      const fill = segment.color || "hsl(220,60%,30%)";

      const el = (
        <g key={segment.id}>
          <path
            d={pathData}
            fill={fill}
            className={
              "transition-colors duration-150 " +
              (isActive ? "opacity-100" : "opacity-85")
            }
          />
          <text
            x={tx}
            y={ty}
            textAnchor="start"
            dominantBaseline="middle"
            fill="#f9fafb"
            fontSize={segments.length > 1 ? 4 : 5}
            transform={`rotate(${(mid * 180) / Math.PI} ${tx} ${ty})`}
          >
            {segment.name}
          </text>
        </g>
      );

      start = end;
      return el;
    });
  };

  const disabled = isSpinning || !!error || !segments?.length;

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {error && (
        <div className="mb-2 w-full max-w-md rounded-xl border border-rose-400/70 bg-rose-900/40 px-3 py-2 text-xs text-rose-100">
          {error}
        </div>
      )}

      <div className="relative flex items-center justify-center">
        <div
          className={
            "relative mx-auto aspect-square " +
            wheelSizeClass +
            " rounded-full bg-gradient-to-br from-slate-900 to-slate-800 shadow-[0_26px_70px_rgba(0,0,0,0.7)]"
          }
        >
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full"
              style={{
                transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                transition: isSpinning ? "none" : "transform 80ms linear",
              }}
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="wheelInner" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e5f0ff" />
                  <stop offset="55%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>
              </defs>

              <circle cx="50" cy="50" r="49" fill="#e5e7eb" />
              <circle cx="50" cy="50" r="44" fill="url(#wheelInner)" />

              {renderSegments()}

              <circle
                cx="50"
                cy="50"
                r="9"
                fill="#f9fafb"
                stroke="#e5e7eb"
                strokeWidth="1.2"
              />
              <circle cx="50" cy="50" r="4" fill="#0f172a" />
            </svg>
          </div>

          <Pointer decorative={false} />

          <div className="pointer-events-none absolute inset-x-8 bottom-2 h-5 rounded-full bg-black/70 blur-lg" />
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={handleSpinClick}
          onKeyDown={handleKeyDown}
          disabled={isSpinning || !user || !canSpin}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-900
    shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400
    disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
        >
          {!user
            ? "Login to Spin"
            : !canSpin
            ? `Wait ${waitTime}`
            : isSpinning
            ? "Spinning…"
            : "Spin"}
        </button>

        <p className="text-xs text-slate-400">
          Use Enter/Space to spin. When idle, use Left/Right arrow keys to nudge
          the wheel.
        </p>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </div>

      <div className="mt-1 flex w-full max-w-md flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
        <span>
          Total spins:{" "}
          <span className="font-semibold text-emerald-400">
            {stats.spinsCount}
          </span>
        </span>
        <span>
          Last winner:{" "}
          <span className="font-medium text-slate-100">
            {stats.lastWinnerName || "—"}
          </span>
        </span>
      </div>

      {showHighlightDuringSpin && currentIndex >= 0 && (
        <p className="mt-1 text-xs text-slate-400">
          Pointer over:{" "}
          <span className="font-medium text-slate-100">
            {segments[currentIndex]?.name || "—"}
          </span>
        </p>
      )}

      <ResultModal
        open={showResult}
        winner={winner}
        onClose={() => setShowResult(false)}
        onSpinAgain={() => {
          setShowResult(false);
          startSpin();
        }}
      />
    </div>
  );
}
