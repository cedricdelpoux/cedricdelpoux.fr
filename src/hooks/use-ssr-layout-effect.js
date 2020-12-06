import {useEffect, useLayoutEffect} from "react"

export const useSsrLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect
