'use client'

import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // カーソルの形状を検出
      const target = e.target as HTMLElement
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer')
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            style={{
              position: 'fixed',
              zIndex: 9999,
              pointerEvents: 'none',
              mixBlendMode: 'difference',
              left: position.x - (isPointer ? 16 : 4),
              top: position.y - (isPointer ? 16 : 4),
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: isPointer ? 2.5 : 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Box
              width={isPointer ? '32px' : '8px'}
              height={isPointer ? '32px' : '8px'}
              bg="white"
              borderRadius="full"
              opacity={0.8}
              transition="width 0.2s, height 0.2s"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
    </>
  )
} 