import {useEffect, useCallback} from "react"

import {useDebounce} from "./use-debounce"

export const useLoadMore = (handleLoadMore) => {
  const handleScroll = useCallback(
    useDebounce(() => {
      if (typeof window === "undefined") {
        return
      }

      const distanceToBottom =
        document.documentElement.offsetHeight -
        (window.scrollY + window.innerHeight)

      if (distanceToBottom < 100) {
        handleLoadMore()
      }
    }, Math.floor(1000 / 60)),
    []
  )

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
}
