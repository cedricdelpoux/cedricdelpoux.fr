import {useEffect, useRef} from "react"

export const SCROLL_UP = "up"
export const SCROLL_DOWN = "down"

export const useScrollDirection = ({
  initialDirection = SCROLL_DOWN,
  thresholdPixels = 64,
} = {}) => {
  const scrollDirectionRef = useRef(initialDirection)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const threshold = thresholdPixels || 0
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false
        return
      }

      scrollDirectionRef.current =
        scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [initialDirection, thresholdPixels])

  return scrollDirectionRef
}
