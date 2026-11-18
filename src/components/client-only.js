import React, {lazy, Suspense, useEffect, useState} from "react"

export const createClientOnly = (load) => {
  const Lazy = lazy(load)

  return (props) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => setIsMounted(true), [])

    return isMounted ? (
      <Suspense fallback={null}>
        <Lazy {...props} />
      </Suspense>
    ) : null
  }
}
