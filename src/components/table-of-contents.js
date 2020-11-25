import React, {useEffect, useRef, useState} from "react"

import {View} from "./view"
import {useScrollDirection} from "../hooks/use-scroll-direction"

const getPath = (toc) => {
  const links = toc.querySelectorAll("a")
  const activeLinks = toc.querySelectorAll("a.active")
  let dArray = []
  let totalLength = 0
  let prevX = 0
  let prevProgressX = 0

  const fistActiveLink = activeLinks.length > 0 ? activeLinks[0] : null
  const lastActiveLink =
    activeLinks.length > 0 ? activeLinks[activeLinks.length - 1] : null
  let start = undefined
  let end = undefined
  let activeLength = 0

  ;[...links].forEach((link, i) => {
    const isActive = link.classList.contains("active")
    const x = link.parentNode.offsetLeft - toc.offsetLeft
    const y = link.parentNode.offsetTop - toc.offsetTop
    const height = link.parentNode.offsetHeight
    const length =
      prevX !== x ? (prevX > x ? prevX - x : x - prevX) + height : height

    if (i === 0) {
      dArray.push("M", x, y, "L", x, y + height)
    } else {
      if (prevX !== x) {
        dArray.push("L", x, y, "L", x, y + height)
        prevX = x
      } else {
        dArray.push("L", x, y + height)
      }
    }
    totalLength += length

    if (link === fistActiveLink && isActive) {
      start = totalLength - height
      prevProgressX = x
    }
    if (start !== undefined && !end) {
      const progressLength = Math.abs(x - prevProgressX) + height
      activeLength += progressLength
      prevProgressX = x
    }
    if (link === lastActiveLink && isActive) {
      end = y + height
    }
  })

  const d = dArray.join(" ")

  return {start, activeLength, totalLength, d}
}

export const Toc = ({tableOfContents}) => {
  const tocRef = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const [path, setPath] = useState()
  const scrollDirectionRef = useScrollDirection()

  useEffect(() => {
    const titlesLinks = document.querySelectorAll("h1 a.anchor, h2 a.anchor")
    const titlesLinksHashes = [...titlesLinks].map((node) => node.hash)

    const deactivateTocLinks = () => {
      const activeLinks = tocRef.current.querySelectorAll(`a.active`)
      activeLinks.forEach((activeLink) => activeLink.classList.remove("active"))
    }

    const activateTocLink = (link) => {
      link.classList.add("active")

      // Select the parent title
      const hasParent =
        link.parentNode.offsetLeft - tocRef.current.offsetLeft > 0
      if (hasParent) {
        const parentLink = link.parentNode.parentNode.parentNode.querySelector(
          "a:first-child"
        )

        activateTocLink(parentLink)
      }
    }
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const hash = entry.target.getAttribute("href")
        const index = titlesLinksHashes.indexOf(hash)

        if (entry.intersectionRatio > 0) {
          deactivateTocLinks()
          activateTocLink(tocRef.current.querySelector(`li a[href$="${hash}"]`))
        } else {
          // Select the previous title when scrolling up
          if (scrollDirectionRef.current === "up" && index > 0) {
            deactivateTocLinks()

            const previousTitleLink = tocRef.current.querySelector(
              `li a[href$="${titlesLinksHashes[index - 1]}"]`
            )

            activateTocLink(previousTitleLink)
          }
        }
      })
    })

    // Track all sections that have an `id` applied
    titlesLinks.forEach((titleLink) => {
      observer.observe(titleLink)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const tocLinks = tocRef.current.querySelectorAll(`a`)
    const observer = new window.MutationObserver(() => {
      setPath(getPath(tocRef.current))
    })

    tocLinks.forEach((activeLink) => {
      observer.observe(activeLink, {attributes: true})
    })

    return () => {
      observer.disconnect()
    }
  }, [tocRef.current])

  // Hide Toc when image are too large
  // useEffect(() => {
  //   let largesImagesInViewport = new Set()
  //   const observer = new window.IntersectionObserver(
  //     entries => {
  //       entries.forEach(entry => {
  //         if (entry.target.getBoundingClientRect().x < 300) {
  //           if (entry.intersectionRatio > 0) {
  //             largesImagesInViewport.add(entry.target.src)
  //           } else {
  //             largesImagesInViewport.delete(entry.target.src)
  //           }
  //         }

  //         if (largesImagesInViewport.size > 0) {
  //           setIsVisible(false)
  //         } else {
  //           setIsVisible(true)
  //         }
  //       })
  //     }
  //     // {rootMargin: "30%"}
  //   )

  //   document.querySelectorAll("img").forEach(img => {
  //     observer.observe(img)
  //   })

  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [])

  // Hide Toc when there is header or footer
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setIsVisible(false)
          } else {
            setIsVisible(true)
          }
        })
      },
      {rootMargin: "30%"}
    )

    // Header should be the last one for the first init
    // observer.observe(document.querySelector("footer"))
    observer.observe(document.querySelector("header"))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <View
      css={{
        position: "fixed",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        mx: 2,
        transition: "opacity .5s",
        zIndex: 0,
        display: {_: "none", m: "block"},
      }}
      style={{opacity: isVisible ? 1 : 0}}
    >
      <View
        ref={tocRef}
        css={{
          width: 300,
          // "& > ul > li > a.active, & > ul > li > p > a.active": {
          //   backgroundColor: "primary",
          //   color: "#fff",
          //   boxShadow: "-3px 0 0 3px #05386B, 0 0 0 3px #05386B",
          // },
          "& a.active": {
            fontWeight: "bold",
            // color: "primary",
          },
          "& > ul": {
            p: 0,
            m: 0,
          },
          "& li": {
            listStyle: "none",
          },
          "& li > p": {
            m: 0,
          },
          "& a": {
            textDecoration: "none",
            color: "inherit",
            // px: 1,
            // py: 1,
          },
        }}
        dangerouslySetInnerHTML={{__html: tableOfContents}}
      />
      {path && (
        <View
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          css={{
            position: "absolute",
            top: 0,
            left: -1,
            height: "100%",
            zIndex: -1,
            overflow: "visible",
          }}
        >
          <View
            as="path"
            strokeWidth="3"
            fill="transparent"
            stroke="url(#svg-gradient)"
            strokeDasharray={`1, ${path.start}, ${path.activeLength}, ${path.totalLength}`}
            strokeDashoffset={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            d={path.d}
            css={{
              // stroke: "secondary",
              transition: "stroke-dasharray 0.5s",
            }}
          />
        </View>
      )}
    </View>
  )
}
