import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for cursor position
  const cursorXInfo = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorYInfo = useSpring(0, { stiffness: 400, damping: 28 });

  const cursorX = useSpring(0, { stiffness: 800, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 800, damping: 28 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      cursorXInfo.set(e.clientX - 16);
      cursorYInfo.set(e.clientY - 16);
      
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    window.addEventListener('mousemove', mouseMove);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('magnetic-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hidden on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] mix-blend-exclusion"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/50 pointer-events-none z-[99] mix-blend-exclusion flex items-center justify-center"
        style={{
          x: cursorXInfo,
          y: cursorYInfo,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(6, 182, 212, 1)' : 'rgba(6, 182, 212, 0.5)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isHovering && (
           <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1, rotate: 90 }}
             className="w-full h-full absolute border-[1px] border-dashed border-cyan-400 rounded-full"
           />
        )}
      </motion.div>
    </>
  );
};
