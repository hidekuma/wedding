import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../styles/main.css";

const LoadingScreen = ({ onComplete }) => {
  const [currentChar, setCurrentChar] = useState(0);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const line1 = "We're getting";
  const line2 = "Married!";

  useEffect(() => {
    if (currentChar < line1.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    } else if (!showSecondLine) {
      const timer = setTimeout(() => {
        setShowSecondLine(true);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(timer);
    } else if (currentChar < line2.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentChar, showSecondLine, isComplete, onComplete, line1.length, line2.length]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >


          {/* 텍스트 컨텐츠 */}
          <div className="loading-content">
            <motion.div
              className="loading-line1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {line1.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="loading-char"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    !showSecondLine && index < currentChar
                      ? { opacity: 1, y: 0 }
                      : showSecondLine
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: !showSecondLine ? 0 : 0
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>

            {showSecondLine && (
              <motion.div
                className="loading-line2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {line2.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="loading-char"
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      index < currentChar
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 30 }
                    }
                    transition={{
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}


          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 