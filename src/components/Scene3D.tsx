import { motion } from "framer-motion";

export function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      {/* 3D floating cube */}
      <motion.div
        className="absolute top-20 right-[10%] perspective"
        animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-24 w-24 transform-3d animate-spin-slow" style={{ transform: "rotateX(45deg) rotateY(45deg)" }}>
          <div className="absolute inset-0 rounded-2xl gradient-primary shadow-glow opacity-80" style={{ transform: "translateZ(40px)" }} />
          <div className="absolute inset-0 rounded-2xl bg-primary/40" style={{ transform: "translateZ(-40px)" }} />
        </div>
      </motion.div>

      {/* Sphere */}
      <motion.div
        className="absolute top-[40%] left-[8%]"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-20 w-20 rounded-full gradient-primary shadow-glow opacity-90"
          style={{ background: "radial-gradient(circle at 30% 30%, white, var(--primary))" }} />
      </motion.div>

      {/* Hex */}
      <motion.div
        className="absolute bottom-[20%] right-[20%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-16 w-16 gradient-primary opacity-70"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
      </motion.div>

      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/60"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function GridBackground() {
  return <div className="absolute inset-0 grid-bg pointer-events-none" />;
}
