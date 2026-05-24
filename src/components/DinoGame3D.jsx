import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Trophy, Play, RotateCcw } from 'lucide-react'

// Stylized Voxel Dino Model Component (WebGL boxes)
function VoxelDino({ yPos, isJumping }) {
  const dinoRef = useRef();

  useFrame((state) => {
    if (dinoRef.current) {
      // Dynamic breathing or leg-swinging simulation when playing
      const time = state.clock.getElapsedTime();
      dinoRef.current.position.y = yPos;
      
      if (!isJumping) {
        // Subtle voxel wobble on floor
        dinoRef.current.rotation.z = Math.sin(time * 15) * 0.05;
      } else {
        dinoRef.current.rotation.z = -0.1;
      }
    }
  });

  return (
    <group ref={dinoRef} position={[-2, 0.5, 0]}>
      {/* Voxel Torso (Cream) */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.9, 0.6, 0.5]} />
        <meshStandardMaterial color="#DEDBC8" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Head Voxel (Cream) */}
      <mesh position={[0.3, 0.85, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.45]} />
        <meshStandardMaterial color="#DEDBC8" roughness={0.1} />
      </mesh>

      {/* Mouth snout box */}
      <mesh position={[0.55, 0.75, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.4]} />
        <meshStandardMaterial color="#E1E0CC" />
      </mesh>

      {/* Glowing Neon Eyes (Red/Primary Vibe) */}
      <mesh position={[0.45, 0.95, 0.23]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#e92932" toneMapped={false} />
      </mesh>
      <mesh position={[0.45, 0.95, -0.23]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#e92932" toneMapped={false} />
      </mesh>

      {/* Voxel Tail (Cream) */}
      <mesh position={[-0.55, 0.45, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.4, 0.25, 0.35]} />
        <meshStandardMaterial color="#DEDBC8" />
      </mesh>

      {/* Little spikes on back (Red/Primary Vibe) */}
      <mesh position={[-0.2, 0.75, 0]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#e92932" />
      </mesh>
      <mesh position={[-0.4, 0.65, 0]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#e92932" />
      </mesh>

      {/* Voxel Legs */}
      <mesh position={[-0.2, 0.1, 0.12]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      <mesh position={[0.2, 0.1, -0.12]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
    </group>
  );
}

// Stylized Voxel Cactus Obstacle Component
function VoxelCactus({ xPos }) {
  const cactusRef = useRef();

  useFrame(() => {
    if (cactusRef.current) {
      cactusRef.current.position.x = xPos;
    }
  });

  return (
    <group ref={cactusRef} position={[8, 0, 0]}>
      {/* Main vertical stem (Green glow) */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.3, 1.4, 0.3]} />
        <meshStandardMaterial color="#42c4ef" emissive="#42c4ef" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>

      {/* Right side branch */}
      <mesh position={[0.3, 0.9, 0]}>
        <boxGeometry args={[0.3, 0.25, 0.25]} />
        <meshStandardMaterial color="#42c4ef" />
      </mesh>
      <mesh position={[0.45, 1.15, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial color="#42c4ef" />
      </mesh>

      {/* Left side branch */}
      <mesh position={[-0.3, 0.6, 0]}>
        <boxGeometry args={[0.3, 0.25, 0.25]} />
        <meshStandardMaterial color="#42c4ef" />
      </mesh>
      <mesh position={[-0.45, 0.85, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        <meshStandardMaterial color="#42c4ef" />
      </mesh>
    </group>
  );
}

// Scrolling Terrain/Grid wireframe representation
function ScrollingTerrain({ isPlaying }) {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current && isPlaying) {
      // Moves floor backwards to simulate speed
      gridRef.current.position.x -= delta * 6;
      if (gridRef.current.position.x <= -10) {
        gridRef.current.position.x = 0;
      }
    }
  });

  return (
    <group ref={gridRef}>
      {/* Infinite loop lines */}
      <gridHelper args={[60, 30, "#DEDBC8", "#222222"]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      {/* Visual neon floor strip borders */}
      <mesh position={[0, -0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 0.1]} />
        <meshBasicMaterial color="#e92932" />
      </mesh>
      <mesh position={[0, -0.01, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 0.1]} />
        <meshBasicMaterial color="#e92932" />
      </mesh>
    </group>
  );
}

// Fixed Side-view Camera configurations helper
function GameScene({ isPlaying, dinoY, isJumping, cactusX }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 0.8, 0);
  }, [camera]);

  return (
    <>
      {/* Lights settings */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-3, 2, 2]} color="#DEDBC8" intensity={1.2} />

      {/* Main Game Elements */}
      <VoxelDino yPos={dinoY} isJumping={isJumping} />
      <VoxelCactus xPos={cactusX} />
      <ScrollingTerrain isPlaying={isPlaying} />
    </>
  );
}

export function DinoGame3D({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Simulated physics refs & state
  const [dinoY, setDinoY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const yVelocity = useRef(0);
  const cactusX = useRef(8);

  // Reset order
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setDinoY(0);
    setIsJumping(false);
    yVelocity.current = 0;
    cactusX.current = 8;
    setIsPlaying(true);
  };

  // Click / Space bar jump trigger
  const triggerJump = () => {
    if (!isPlaying) {
      if (gameOver) {
        resetGame();
      } else {
        setIsPlaying(true);
      }
      return;
    }
    
    if (!isJumping) {
      setIsJumping(true);
      yVelocity.current = 15; // Initial jump force in units
    }
  };

  // Keyboard spacebar listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isJumping, gameOver]);

  // Main simulation tick loop run inside standard interval when playing
  useEffect(() => {
    if (!isPlaying) return;

    const gameTick = setInterval(() => {
      // 1. Update Dino Gravity
      setDinoY((prevY) => {
        let nextY = prevY + yVelocity.current * 0.03;
        yVelocity.current -= 45 * 0.03; // simulated gravity pull
        
        if (nextY <= 0) {
          nextY = 0;
          setIsJumping(false);
          yVelocity.current = 0;
        }
        return nextY;
      });

      // 2. Update Cactus Position (Scrolling left)
      cactusX.current -= 0.15 + (score * 0.002); // speed scales with score

      if (cactusX.current <= -6) {
        cactusX.current = 8; // reset right
        setScore((prev) => {
          const next = prev + 10;
          if (next > highScore) setHighScore(next);
          return next;
        });
      }

      // 3. Collision checks (Dino at x = -2, Cactus width ~0.6, height ~1.2)
      const isDinoNearby = Math.abs(cactusX.current - (-2)) < 0.65;
      
      // Dino height threshold
      setDinoY((currentDinoY) => {
        if (isDinoNearby && currentDinoY < 1.1) {
          // Collision!
          setIsPlaying(false);
          setGameOver(true);
        }
        return currentDinoY;
      });

    }, 20); // 50 ticks per second

    return () => clearInterval(gameTick);
  }, [isPlaying, isJumping, score, highScore]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Black Blur Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Voxel Box Container */}
          <motion.div 
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative bg-[#101010] border-2 border-primary/20 rounded-[2.5rem] p-6 sm:p-8 w-full max-w-2xl h-[520px] flex flex-col justify-between shadow-2xl overflow-hidden select-none z-10"
          >
            
            {/* Corner peel decoration */}
            <PeelCorner />

            {/* Header info */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 z-20 relative">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary w-5 h-5 animate-pulse" />
                <h3 className="text-white font-bold uppercase tracking-widest text-xs sm:text-sm">Stix Voxel Dino 3D</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-[#161616] rounded-full text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Canvas Area */}
            <div 
              onClick={triggerJump}
              className="relative w-full flex-grow bg-black border border-white/5 rounded-2xl overflow-hidden cursor-pointer mt-4"
            >
              
              {/* Score displays overlays */}
              <div className="absolute top-4 left-4 z-20 flex gap-6 text-xs sm:text-sm font-mono text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#DEDBC8]" />
                  <span>HIGH: <strong className="text-white">{highScore}</strong></span>
                </div>
                <div>
                  <span>SCORE: <strong className="text-[#DEDBC8]">{score}</strong></span>
                </div>
              </div>

              {/* R3F WebGL Scene */}
              <Canvas shadows orthographic={false}>
                <GameScene 
                  isPlaying={isPlaying} 
                  dinoY={dinoY} 
                  isJumping={isJumping} 
                  cactusX={cactusX.current} 
                />
              </Canvas>

              {/* Game Start/GameOver overlays */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-30"
                  >
                    {gameOver ? (
                      <>
                        <h4 className="text-red-500 font-bold uppercase tracking-widest text-lg sm:text-xl mb-2 animate-bounce">
                          CRASH DETECTED 💥
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm max-w-xs mb-6">
                          You hit a neon cyber-cactus! Your final coordinate score: <strong className="text-white">{score}</strong>.
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resetGame();
                          }}
                          className="bg-[#DEDBC8] text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white active:scale-95 transition-all duration-300 shadow-lg shadow-[#DEDBC8]/10"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Retry Vibe</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <h4 className="text-white font-bold uppercase tracking-widest text-lg sm:text-xl mb-2">
                          Interactive Vibe Dino 3D
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm max-w-xs mb-6">
                          Help our pixel mascot jump over cyber-obstacles! Tap screen or press <strong className="text-[#DEDBC8]">Spacebar</strong> to jump.
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resetGame();
                          }}
                          className="bg-[#DEDBC8] text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white active:scale-95 transition-all duration-300 shadow-lg shadow-[#DEDBC8]/10"
                        >
                          <Play className="w-4 h-4 fill-black" />
                          <span>Start Play</span>
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Instruction Footer */}
            <div className="text-[10px] text-center text-gray-600 font-mono mt-4 tracking-wider">
              TAP CANVAS OR PRESS SPACEBAR TO HOP
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default DinoGame3D;
