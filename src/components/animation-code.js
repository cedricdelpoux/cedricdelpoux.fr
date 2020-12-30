import {ThemeContext, useKeyframes} from "css-system"
import React, {useContext} from "react"

import {getColorWithOpacity} from "../utils/colors"
import {Text} from "./text"
import {View} from "./view"

const TextLine = ({css, children, ...props}) => {
  return (
    <View
      css={{
        flexDirection: "row",
        overflow: "hidden",
        borderRight: "4px solid transparent",
        width: "0",
        gap: 1,
        ...css,
      }}
      {...props}
    >
      {children}
    </View>
  )
}

const Line = ({css, children, ...props}) => {
  const typing1 = useKeyframes({
    "0%": {
      width: "0%",
      borderColor: "secondary",
    },
    "20%": {
      width: "100%",
      borderColor: "secondary",
    },
    "21%": {
      borderColor: "transparent",
    },
    "100%": {
      width: "100%",
      borderColor: "transparent",
    },
  })
  const typing2 = useKeyframes({
    "0%": {
      width: "0%",
      borderColor: "transparent",
    },
    "20%": {
      borderColor: "transparent",
    },
    "21%": {
      width: "0%",
      borderColor: "secondary",
    },
    "42%": {
      width: "100%",
      borderColor: "secondary",
    },
    "43%": {
      borderColor: "transparent",
    },
    "100%": {
      width: "100%",
      borderColor: "transparent",
    },
  })
  const typing3 = useKeyframes({
    "0%": {
      width: "0%",
      borderColor: "transparent",
    },
    "42%": {
      borderColor: "transparent",
    },
    "43%": {
      width: "0%",
      borderColor: "secondary",
    },
    "63%": {
      width: "100%",
      borderColor: "secondary",
    },
    "64%": {
      borderColor: "transparent",
    },
    "100%": {
      width: "100%",
      borderColor: "transparent",
    },
  })
  const typing4 = useKeyframes({
    "0%": {
      width: "0%",
      borderColor: "transparent",
    },
    "63%": {
      borderColor: "transparent",
    },
    "64%": {
      width: "0%",
      borderColor: "secondary",
    },
    "85%": {
      width: "100%",
      borderColor: "secondary",
    },
    "86%": {
      borderColor: "transparent",
    },
    "100%": {
      width: "100%",
      borderColor: "transparent",
    },
  })
  const typing5 = useKeyframes({
    "0%": {
      width: "0%",
      borderColor: "transparent",
    },
    "85%": {
      borderColor: "transparent",
    },
    "86%": {
      width: "0%",
      borderColor: "secondary",
    },
    "92%": {
      width: "100%",
      borderColor: "secondary",
    },
    "93%": {
      borderColor: "transparent",
    },
    "100%": {
      width: "100%",
      borderColor: "transparent",
    },
  })
  const typing6 = useKeyframes({
    "0%": {
      width: "0%",
      borderColor: "transparent",
    },
    "92%": {
      borderColor: "transparent",
    },
    "93%": {
      width: "0%",
      borderColor: "secondary",
    },
    "100%": {
      width: "100%",
      borderColor: "secondary",
    },
  })

  return (
    <Text
      css={{
        "& > *": {
          animationIterationCount: "infinite",
          animationDuration: "10s",
        },
        "&:nth-of-type(1) > *": {
          animationName: typing1,
        },
        "&:nth-of-type(2) > *": {
          animationName: typing2,
        },
        "&:nth-of-type(3) > *": {
          animationName: typing3,
        },
        "&:nth-of-type(4) > *": {
          animationName: typing4,
        },
        "&:nth-of-type(5) > *": {
          animationName: typing5,
        },
        "&:nth-of-type(6) > *": {
          animationName: typing6,
        },
        ...css,
      }}
      {...props}
    >
      {children}
    </Text>
  )
}

const Word = ({width = 20}) => {
  return (
    <Text
      css={{
        bg: "text",
        borderRadius: 2,
        height: "8px",
        width,
      }}
    />
  )
}

export const AnimationCode = ({css, ...props}) => {
  const theme = useContext(ThemeContext)
  return (
    <View css={{position: "relative", flex: 1, ...css}} {...props}>
      <View
        css={{
          flex: 1,
          alignItems: "flex-start",
          zIndex: 1,
          background: getColorWithOpacity(theme.colors.background, 0.4),
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          px: 3,
          py: 2,
          gap: 1,
          borderLeft: `4px solid ${theme.colors.secondary}`,
          borderRight: `4px solid ${theme.colors.primary}`,
        }}
      >
        <Line>
          <TextLine>
            <Word width={10} />
            <Word width={30} />
            <Word width={10} />
          </TextLine>
        </Line>
        <Line css={{pl: 2, mb: 1}}>
          <TextLine>
            <Word width={20} />
            <Word width={10} />
            <Word width={40} />
            <Word width={20} />
          </TextLine>
        </Line>
        <Line css={{pl: 2}}>
          <TextLine>
            <Word width={10} />
            <Word width={40} />
            <Word width={10} />
          </TextLine>
        </Line>
        <Line css={{pl: 3}}>
          <TextLine>
            <Word width={10} />
            <Word width={30} />
            <Word width={20} />
            <Word width={10} />
            <Word width={20} />
          </TextLine>
        </Line>
        <Line css={{pl: 2}}>
          <TextLine>
            <Word width={10} />
          </TextLine>
        </Line>
        <Line>
          <TextLine>
            <Word width={10} />
          </TextLine>
        </Line>
      </View>
      <View
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="60 100 500 300"
        css={{filter: "url(#svg-shadow)", flex: 1, width: "100%"}}
      >
        <g>
          <use
            fill="url(#svg-gradient)"
            xlinkHref="#d"
            transform="translate(124 185)"
          />
          <g>
            <use
              fill="#EFAF86"
              xlinkHref="#a"
              transform="translate(123.174 388)"
            />
            <use
              fill="#CF9672"
              xlinkHref="#b"
              transform="translate(148.5 446.86)"
            />
          </g>
          <g>
            <use
              fill="#EFAF86"
              xlinkHref="#c"
              transform="matrix(-1 0 0 1 504 376.5)"
            />
            <use
              fill="#CF9672"
              xlinkHref="#b"
              transform="matrix(-1 0 0 1 478.674 446.907)"
            />
          </g>
          <use fill="#C4C4C4" xlinkHref="#e" transform="translate(0 481)" />
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              dur=".5s"
              repeatCount="indefinite"
              fill="freeze"
              values="0 0;0 5;0 0;0 0;0 5;0 0"
            />
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="2s"
                repeatCount="indefinite"
                fill="freeze"
                values="0 0;20 0;10 0;40 0;0 0"
              />
              <use
                fill="#EFAF86"
                xlinkHref="#f"
                transform="translate(176.393 456.703)"
              />
              <use
                fill="#F8C09D"
                xlinkHref="#g"
                transform="translate(172 434)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#h"
                transform="translate(181.833 470.252)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#i"
                transform="translate(202.99 469.852)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#j"
                transform="translate(216.29 469.123)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#k"
                transform="translate(228.38 468.48)"
              />
              <use
                fill="#EFAF86"
                xlinkHref="#l"
                transform="translate(189.03 443.885)"
              />
              <use
                fill="#EFAF86"
                xlinkHref="#m"
                transform="translate(201.782 436.737)"
              />
            </g>
          </g>
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              dur=".5s"
              repeatCount="indefinite"
              fill="freeze"
              values="0 0;0 0;0 5;0 0;0 5;0 0"
            />
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                dur="2.5s"
                repeatCount="indefinite"
                fill="freeze"
                values="0 0;-30 0;-20 0;-40 0;0 0;-10 0;-40 0;0 0"
              />
              <use
                fill="#EFAF86"
                xlinkHref="#f"
                transform="matrix(-1 0 0 1 446.607 456.703)"
              />
              <use
                fill="#F8C09D"
                xlinkHref="#g"
                transform="matrix(-1 0 0 1 451 434)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#h"
                transform="matrix(-1 0 0 1 441.167 470.252)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#i"
                transform="matrix(-1 0 0 1 420.01 469.852)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#j"
                transform="matrix(-1 0 0 1 406.71 469.123)"
              />
              <use
                fill="#FFE3D2"
                xlinkHref="#k"
                transform="matrix(-1 0 0 1 394.62 468.48)"
              />
              <use
                fill="#EFAF86"
                xlinkHref="#l"
                transform="matrix(-1 0 0 1 433.97 443.885)"
              />
              <use
                fill="#EFAF86"
                xlinkHref="#m"
                transform="matrix(-1 0 0 1 421.218 436.737)"
              />
            </g>
          </g>
          <g fill="#EFAF86">
            <use xlinkHref="#n" transform="translate(250.5 148.5)" />
            <use xlinkHref="#o" transform="translate(248 181.5)" />
          </g>
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="4s"
              repeatCount="indefinite"
              fill="freeze"
              values="0 0;0 5;0 0"
            />
            <g>
              <g>
                <use
                  fill="#F8C09D"
                  xlinkHref="#p"
                  transform="translate(338.79 86)"
                />
                <use
                  fill="#EE947C"
                  xlinkHref="#q"
                  transform="rotate(10.77 -351.176 1869.357)"
                />
              </g>
              <g>
                <use
                  fill="#F8C09D"
                  xlinkHref="#r"
                  transform="matrix(-1 0 0 1 247.945 87.5)"
                />
                <use
                  fill="#EE947C"
                  xlinkHref="#q"
                  transform="matrix(-1 0 0 1 245 102.5)"
                />
              </g>
            </g>
            <use fill="#F8C09D" xlinkHref="#s" transform="translate(242 10)" />
            <g fill="#EE947C">
              <use xlinkHref="#t" transform="rotate(25.8 -130.87 685.796)" />
              <use xlinkHref="#u" transform="rotate(-28.12 407.414 -537.215)" />
              <use xlinkHref="#v" transform="translate(301.5 91)" />
              <use xlinkHref="#w" transform="translate(280.993 118)" />
            </g>
            <g transform="translate(238 363)">
              <mask id="y">
                <use
                  fill="#fff"
                  xlinkHref="#x"
                  transform="translate(32 -223.5)"
                />
              </mask>
              <g mask="url(#y)">
                <use
                  fill="#C42754"
                  xlinkHref="#z"
                  transform="translate(32 -223.5)"
                />
                <use
                  fill="#FFF"
                  xlinkHref="#A"
                  transform="translate(32 -223.5)"
                />
                <use
                  fill="#EE3466"
                  xlinkHref="#B"
                  transform="translate(33 -208)"
                />
              </g>
            </g>
            <g fill="#452E1A">
              <use xlinkHref="#C" transform="translate(252.455 75.406)" />
              <use xlinkHref="#C" transform="matrix(-1 0 0 1 344.304 76)" />
            </g>
            <g>
              <g transform="translate(238 363)">
                <mask id="E">
                  <use
                    fill="#FFF"
                    xlinkHref="#D"
                    transform="translate(25 -275)"
                  />
                </mask>
                <g mask="url(#E)">
                  <use
                    fill="#FFF"
                    xlinkHref="#D"
                    transform="translate(25 -275)"
                  />
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      dur="2s"
                      repeatCount="indefinite"
                      fill="freeze"
                      values="0 0;-3 .5;0 0;2 2; 0 0"
                    />
                    <use
                      fill="#66371A"
                      xlinkHref="#F"
                      transform="translate(28 -276)"
                    />
                    <use xlinkHref="#G" transform="translate(33 -274)" />
                    <use
                      fill="#FFF"
                      xlinkHref="#H"
                      transform="translate(27 -271)"
                    />
                  </g>
                </g>
              </g>
              <g transform="translate(238 363)">
                <mask id="I">
                  <use
                    fill="#FFF"
                    xlinkHref="#D"
                    transform="matrix(-1 0 0 1 93.5 -275)"
                  />
                </mask>
                <g mask="url(#I)">
                  <use
                    fill="#FFF"
                    xlinkHref="#J"
                    transform="matrix(-1 0 0 1 93.5 -275)"
                  />
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      dur="2s"
                      repeatCount="indefinite"
                      fill="freeze"
                      values="0 0;-2 .5;0 0;3 2; 0 0"
                    />
                    <use
                      fill="#66371A"
                      xlinkHref="#F"
                      transform="matrix(-1 0 0 1 90.5 -276)"
                    />
                    <use
                      xlinkHref="#G"
                      transform="matrix(-1 0 0 1 85.5 -274)"
                    />
                    <use
                      fill="#FFF"
                      xlinkHref="#H"
                      transform="matrix(-1 0 0 1 91.5 -271)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <use fill="#452E1A" xlinkHref="#K" transform="translate(234.156)" />
          </g>
          <use fill="#FFF" xlinkHref="#L" transform="translate(176.393 484)" />
        </g>
        <defs>
          <path
            id="a"
            d="M9.8 24.5C11.6 16 14.3 0 14.3 0S27 7.5 35.8 9.5c13.5 3 34.5 2.5 34.5 2.5s-1 12.7-3 20c-3 12.6-8 26-8 26l45.5-1.5 8 25.5s-91 13.2-105.5 9.5c-14.5-3.7-3-29-3-29S7 39 9.8 24.5z"
          />
          <path
            id="b"
            d="M17 0v.4V0zm16.5 0H33c-.2 0-.7 0-1.2-.2H17v.6c3-.2 7.2-.2 10.6 0h5.8V0zM17 0c-2.7 0-7 .8-10.5 1.5L2 2.5c-.7 0-1.2.2-1.5.3H0v.7h.7C1 3 1.4 3 2 3l4.6-1C10.2 1.3 14.4.5 17 .4V0z"
          />
          <path
            id="c"
            d="M9.7 36c1.7-8.5 9.7-36 9.7-36s11.5 7.5 21 10.5C52 14.2 71 16 71 16s-2 20.2-4 27.4c-3.2 12.6-8 26-8 26h50.2L117 94s-95 12.7-109.6 9C-7 99.3 4.2 74 4.2 74s2.5-23.4 5.5-38z"
          />
          <path
            id="d"
            d="M32 69.5c8.5-14 92.5-61 92.5-61l101-8.5s98 26.5 108.5 38 46 139.5 46 139.5-20.27 17.84-36 24c-13.7 5.36-37 7-37 7l-10.5-22v114H77V195l-6 21s-26.1 1.3-41.5-4C16.93 207.68 0 195 0 195S23.5 83.5 32 69.5z"
          />
          <path id="e" d="M0 0h601v19H0V0z" />
          <path
            id="f"
            d="M81.6 13.15c0-5-3.92-7.6-8.46-8.77L52.6 0H0s1.67 7.67 7.86 13.15c3.02 2.68 12.54 8.8 21.76 8.76 8.5 0 12.75.4 19.95-4.3 3.8-2.5 9.67-5.6 9.67-5.6s10.28 5 12.7 5.68c2.4.63 9.67.63 9.67-4.4z"
          />
          <path
            id="g"
            d="M.16 23.96c0-2.5-.63-4.13.6-6.27 2.3-4 7.26-1.4 10.8-4.2 3.3-2.7 6.83-6.1 10.36-8.4C28.85.6 38.75-.5 43.6.1c4.82.66 7.95 3.16 10.87 7.5C57.4 12 65.95 40.4 65.95 40.4s-2.44 5.5-5.44 5.66c-3.1.14-6-5.67-6-5.67S53.4 45 51.6 46c-1.8 1.02-5.1 1.37-7.24 0-2.16-1.4-4.23-5.64-4.23-5.64s-.43 4.4-2.43 5.64c-1.8 1.14-3.47.55-6.04 0-4.23-4-13.4-20.67-13.4-20.67H11.6s9.76 16.67 4.92 19.2c-4.84 2.5-8.84-2.75-12.1-8.16-2.8-4.6-4.2-10-4.2-12.5z"
            style={{filter: "url(#svg-shadow)"}}
          />
          <path
            id="h"
            d="M1.2.23C.1.87 0 3.36 0 3.36S1.2 6.9 3.02 7.1c1.7.2 3.42-.74 3.63-2.5.17-1.4-1.8-3.75-1.8-3.75S2.5-.53 1.2.23z"
          />
          <path
            id="i"
            d="M2.42 0C.76.4.12 2 0 3.76c0 0 1.2 3.75 2.42 4.38 1.2.63 4.63-.83 4.83-3.13.12-1.3-.38-2.1-1.2-3.1C5 .7 2.4 0 2.4 0z"
          />
          <path
            id="j"
            d="M3.02.1C1.4.5.6 1.62 0 3.23c0 1.26.6 5 1.8 6.26 2.28 1.1 6.06-3.2 6.06-3.2s-.08-1.8-.6-3.2C6.4 1.1 5.18-.4 3 .1z"
          />
          <path
            id="k"
            d="M2.42.12C.58.64 0 3.25 0 4.5c0 1.26 1.2 3.13 2.42 4.4 1.2 1.24 5.7-1.62 5.44-4.4-.13-1.42-.75-2.22-1.82-3.13C4.9.4 3.86-.3 2.42.12z"
          />
          <path
            id="l"
            d="M3.08.92l.05.1-.05-.1zm18.14 24.42l.1-.04v-.05c0-.03-.03-.07-.05-.13l-.18-.53-.7-2-2.3-6.2c-1.8-4.7-4.1-10-5.9-12.5l-.2.13c1.8 2.5 4 7.8 5.82 12.5.9 2.36 1.7 4.55 2.26 6.15l.66 1.9.17.55.07.1v.04H21l.12-.04zM12.25 3.98c-1.82-2.52-3.4-3.66-4.9-4-1.5-.33-2.88.16-4.32.83l.1.3C4.57.4 5.9-.1 7.3.3c1.4.3 2.94 1.4 4.75 3.9l.2-.2zM3.03.8c-1.94.92-2.7 3.17-3 5.15-.14 1-.16 1.93-.15 2.62 0 .34.02.62.03.82l.1.2v.1h.1l.1-.1V8.5c0-.7 0-1.6.2-2.6.3-1.97 1-4.1 2.8-4.94L3 .8z"
          />
          <path
            id="m"
            d="M4.84.56l.02.12-.02-.12zm18.74 33.18l.1-.04v-.07l-.08-.2-.25-.76-.94-2.78c-.7-2.4-1.8-5.5-3.1-8.8-2.4-6.7-5.2-14.1-7.1-16.9l-.2.1c1.8 2.8 4.7 10.1 7.1 16.8 1.2 3.3 2.3 6.5 3.1 8.8l1 2.72.3.75.07.2v.07l.15-.05zM12.2 4.24c-.9-1.4-1.63-2.4-2.24-3.06C9.34.5 8.82.15 8.3-.02c-.5-.16-1-.12-1.55 0S5.58.28 4.8.43l.06.25C5.66.53 6.26.34 6.8.22c.54-.1.97-.15 1.43 0 .46.14.94.48 1.54 1.13.6.66 1.3 1.62 2.2 3.03l.23-.14zM4.8.44C3.6.64 2.4 1.6 1.47 2.5 1 2.96.6 3.4.33 3.7L0 4.1l-.07.1-.02.03.1.08.1.1h.1l.1-.1c.1-.1.2-.2.3-.4l1.1-1.2C2.6 1.8 3.8.9 5 .7L4.8.5z"
          />
          <path id="n" d="M3.5 63.5L0 0l84 3 2 64-82.5-3.5z" />
          <path
            id="o"
            d="M105 12.5c0 8.28-8.5 35.5-54 35.5C8.5 52.5 0 28.28 0 20 0 11.72 26.4 0 54 0s51 4.22 51 12.5z"
          />
          <path
            id="p"
            d="M14.1 18c-2 8-6.97 23.5-11.4 23.5-4.4 0-2.1-10.82-2.1-18S3.6 0 14.1 0c4.42 0 2 10 0 18z"
          />
          <path
            id="q"
            d="M6 6c0 3.3-1.34 6-3 6S0 9.3 0 6s1.34-6 3-6 3 2.7 3 6z"
          />
          <path
            id="r"
            d="M15.95 18.5c-2 8-9.1 25-13.5 25-4.42 0-1.5-12.82-1.5-20S3.95 0 14.45 0c4.4 0 3.5 10.5 1.5 18.5z"
          />
          <path
            id="s"
            d="M51.5.04C1 1.54 0 38.66 0 87.54c0 4.92 1.04 10.77 1.5 15.5 0 0 1.5 72.46 50 75.5 42 0 51.24-75.5 51.24-75.5.46-4.73 1.26-10.58 1.26-15.5 0-48.88-2-89-52.5-87.5z"
          />
          <path
            id="t"
            d="M5.86.83c0 .45-1.3.82-2.93.82C1.3 1.65 0 1.28 0 .83 0 .37 1.3 0 2.93 0c1.62 0 2.93.37 2.93.83z"
          />
          <path
            id="u"
            d="M5.6.6c0 .45-1.1.8-2.72.8S0 .9 0 .45C0 0 1.23 0 2.85 0S5.6.14 5.6.6z"
          />
          <path
            id="v"
            d="M0 0l-.25.03v.1c.02.06.03.15.04.27l.1.96c.1.84.2 1.98.3 3.27.2 2.57.5 5.67.5 7.87h.5c0-2.2-.3-5.34-.5-7.92C.6 3.28.5 2.14.4 1.3L.3.34.25.06v-.08L0 0zm.75 12.5v6h.5v-6h-.5z"
          />
          <path
            id="w"
            d="M0 5l.26-.02L0 5zm7.5 4l-.12.2.13-.2zm6.5 4.5l.05-.25-.04.25zM23.5 9l-.1-.22.1.22zm8-4l-.24-.02.25.02zM3 0l-.16-.2v.02s-.02 0-.03.02l-.1.1c-.1.08-.2.2-.3.34-.3.3-.7.72-1.1 1.2-.8.98-1.6 2.3-1.5 3.54l.5-.04C.2 3.95.9 2.78 1.7 1.8c.4-.47.76-.87 1.06-1.16L3.08.3h.12L3 0zM-.23 5.02c.07.9.42 1.5.97 1.95.54.43 1.25.68 2 .86.76.2 1.58.33 2.4.52.8.2 1.57.44 2.25.86l.2-.4c-.8-.4-1.6-.7-2.4-.9-.9-.2-1.7-.3-2.4-.5S1.4 7 1 6.7C.6 6.28.3 5.78.2 5l-.5.03zm7.62 4.2c1.2.78 2.1 1.76 3 2.63.9.87 1.9 1.63 3.5 1.9l.1-.5c-1.5-.23-2.4-.9-3.3-1.77-.9-.85-1.8-1.86-3.17-2.7l-.26.43zm6.6 4.53c2.1.35 3.6-.37 5-1.37s2.7-2.27 4.6-3.16l-.2-.44c-1.9.9-3.3 2.22-4.7 3.2-1.4.95-2.8 1.6-4.7 1.27l-.1.5zm9.6-4.53c.7-.37 1.6-.58 2.4-.76.82-.17 1.7-.3 2.5-.5.8-.18 1.52-.43 2.1-.9.56-.45.94-1.1 1.03-2.04l-.5-.04c-.08.8-.4 1.33-.86 1.7-.48.38-1.14.62-1.9.8-.78.2-1.65.32-2.5.5-.9.17-1.8.4-2.6.8l.2.44zm8.1-4.2c.2-2.26-.7-4.05-2.6-5.22l-.3.4c1.75 1.1 2.55 2.7 2.35 4.7l.5.04z"
          />
          <ellipse cx="26" cy="15" rx="8" ry="4" id="x">
            <animate
              dur="4s"
              repeatCount="indefinite"
              attributeName="rx"
              values="11;5;11;"
            />
            <animate
              dur="4s"
              repeatCount="indefinite"
              attributeName="ry"
              values="6;5;6;"
            />
          </ellipse>
          <path
            id="z"
            d="M24.5 20.5c10.5 0 24-8.35 24-20.5H0c0 12.15 14 20.5 24.5 20.5z"
          />
          <path
            id="A"
            d="M0 0h48.5c0 1.57-.22 3.07-.64 4.5H.66C.23 3.07 0 1.57 0 0z"
          />
          <path
            id="B"
            d="M46 21.5C46 33.37 35.7 43 23 43S0 33.37 0 21.5 10.3 0 23 0s23 9.63 23 21.5z"
          />
          <path
            id="C"
            d="M21.6 6.62c5.64.24 14 3 14 3s2-1 2-3 .07-.97-2-3C33.56 1.6 26.06-.48 17.06.1c-9 .55-16 12.5-17 14.5s14.8-8.27 21.54-8z"
          />
          <path
            id="D"
            d="M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z"
          >
            <animate
              attributeName="d"
              attributeType="XML"
              repeatCount="indefinite"
              fill="freeze"
              dur="4s"
              values="
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 4.55c0 .5-5.53 0-10.5 0s-9 .57-9 0c0-.23 4.03-.5 9-.5s10.5-.28 10.5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 4.55c0 .5-5.53 0-10.5 0s-9 .57-9 0c0-.23 4.03-.5 9-.5s10.5-.28 10.5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z;
            M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z
          "
            />
          </path>
          <path
            id="F"
            d="M14 5.5c0 3.04-3.13 5.5-7 5.5S0 8.54 0 5.5 3.13 0 7 0s7 2.46 7 5.5z"
          />
          <path
            id="G"
            d="M5 2.5C5 3.88 3.88 5 2.5 5S0 3.88 0 2.5 1.12 0 2.5 0 5 1.12 5 2.5z"
          />
          <path id="H" d="M4 2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
          <path
            id="J"
            d="M19.5 5.5c0 3.6-5.53 4-10.5 4s-9-.4-9-4S4.03 0 9 0s10.5 1.9 10.5 5.5z"
          />
          <path
            id="K"
            d="M10.84 103.5L.84 86s-2.48-20.88 1.08-37.44c.6-2.86-2.6-.6-1.58-3.06 1.35-3.26 2.38-7.7 5-12 1.18-1.92 4.46-4.6 5.16-5.78C15.36 19.42 21.48 13.08 31.34 8c10.12-5.2 15.13-5.94 26.5-6 3.3-.02 6.3.03 9.15.22L71.3 0l2.1 2.96c2.7.46 5.3 1.12 7.9 2.04 1.73.62 3.16-2.9 4.93-2.04-1.9 3.04 4.6 5.27 6.6 6.54 2.78 1.75 4.45 4.5 6.27 6.38 1.54 1.56 6.04 3.18 7.74 5.12.14.16-.1.2-.45.23l-1.6.77c2.5 2.98 5.5 6.98 7.5 10.5.5.92-2-.02-1.5 1 5.4 11.9 7.5 30.5 7.5 30.5l-2 22-4.5 13s-2.5-23.5-2.5-35-1.7-14.15-7-21.5c-3.6-4.9-5.6-8.17-11-11s-18 4.63-29.5 3.5c-11.5-1.12-22-7-28-9S21.4 36.96 16.3 46c-9.1 16.14-3.4 39.5-4 47.5-.6 8-1.5 10-1.5 10z"
          />
          <path id="L" d="M0 0h266v6H0V0z" />
        </defs>
      </View>
    </View>
  )
}
