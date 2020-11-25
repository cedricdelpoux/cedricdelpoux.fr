import debounce from "lodash/debounce"
import {useEffect, useRef} from "react"

export const useDebounce = (handler, ms) => {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  const handlerDebounced = debounce(() => handlerRef.current(), ms, {
    maxWait: ms,
  })

  return handlerDebounced
}
