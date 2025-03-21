'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useId } from 'react';

export function TextMorph({
  children,
  as: Component = 'p',
  className = '',
  style = {},
}) {
  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts = {};

    return children.split('').map((char, index) => {
      const lowerChar = char.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: index === 0 ? char.toUpperCase() : lowerChar,
      };
    });
  }, [children, uniqueId]);

  return (
    <Component className={className} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className="inline-block"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 18,
              mass: 0.3,
            }}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}