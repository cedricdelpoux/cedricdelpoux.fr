import {ThemeContext} from "css-system"
import {graphql, useStaticQuery} from "gatsby"
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react"

import {View} from "./view"

const World = ({css, selectedCountries = []}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="496 234 688 440"
      fill={theme.colors.backgroundLight}
      css={{
        filter: "url(#svg-shadow)",
        flex: 1,
        width: "100%",
        transitionProperty: "fill",
        fill: "url(#svg-gradient)",
        ...selectedCountries.reduce((acc, country) => {
          acc[`& > path[data-country="${country}"]`] = {
            fill: theme.colors.text,
          }
          return acc
        }, {}),
        ...css,
      }}
      deps={[selectedCountries]}
    >
      <path
        d="M746 234h8v-8h-8zM756 234h8v-8h-8zM766 234h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M656 244h8v-8h-8zM666 244h8v-8h-8zM676 244h8v-8h-8zM686 244h8v-8h-8zM696 244h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M726 244h8v-8h-8zM736 244h8v-8h-8zM746 244h8v-8h-8zM756 244h8v-8h-8zM766 244h8v-8h-8zM776 244h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M646 254h8v-8h-8zM656 254h8v-8h-8zM666 254h8v-8h-8zM676 254h8v-8h-8zM686 254h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M706 254h8v-8h-8zM716 254h8v-8h-8zM726 254h8v-8h-8zM736 254h8v-8h-8zM746 254h8v-8h-8zM756 254h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M636 264h8v-8h-8zM646 264h8v-8h-8zM656 264h8v-8h-8zM666 264h8v-8h-8zM676 264h8v-8h-8zM686 264h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M696 264h8v-8h-8zM706 264h8v-8h-8zM716 264h8v-8h-8zM726 264h8v-8h-8zM736 264h8v-8h-8zM746 264h8v-8h-8zM756 264h8v-8h-8zM766 264h8v-8h-8zM776 264h8v-8h-8zM786 264h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M636 274h8v-8h-8zM666 274h8v-8h-8zM676 274h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M686 274h8v-8h-8zM696 274h8v-8h-8zM706 274h8v-8h-8zM716 274h8v-8h-8zM726 274h8v-8h-8zM736 274h8v-8h-8zM746 274h8v-8h-8zM756 274h8v-8h-8zM766 274h8v-8h-8zM776 274h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M856 274h8v-8h-8z"
        aria-label="Svalbard and Jan Mayen"
        data-tip="Svalbard and Jan Mayen"
        data-country="svalbard-and-jan-mayen"
      />
      <path
        d="M996 274h8v-8h-8zM1006 274h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M636 284h8v-8h-8zM646 284h8v-8h-8zM656 284h8v-8h-8zM666 284h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M696 284h8v-8h-8zM706 284h8v-8h-8zM716 284h8v-8h-8zM726 284h8v-8h-8zM736 284h8v-8h-8zM746 284h8v-8h-8zM756 284h8v-8h-8zM766 284h8v-8h-8zM776 284h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M836 284h8v-8h-8zM846 284h8v-8h-8zM856 284h8v-8h-8zM866 284h8v-8h-8z"
        aria-label="Svalbard and Jan Mayen"
        data-tip="Svalbard and Jan Mayen"
        data-country="svalbard-and-jan-mayen"
      />
      <path
        d="M996 284h8v-8h-8zM1006 284h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M616 294h8v-8h-8zM626 294h8v-8h-8zM636 294h8v-8h-8zM656 294h8v-8h-8zM666 294h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M676 294h8v-8h-8zM686 294h8v-8h-8zM696 294h8v-8h-8zM706 294h8v-8h-8zM716 294h8v-8h-8zM726 294h8v-8h-8zM736 294h8v-8h-8zM746 294h8v-8h-8zM756 294h8v-8h-8zM766 294h8v-8h-8zM776 294h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M846 294h8v-8h-8z"
        aria-label="Svalbard and Jan Mayen"
        data-tip="Svalbard and Jan Mayen"
        data-country="svalbard-and-jan-mayen"
      />
      <path
        d="M1016 294h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M586 304h8v-8h-8zM646 304h8v-8h-8zM656 304h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M686 304h8v-8h-8zM696 304h8v-8h-8zM706 304h8v-8h-8zM716 304h8v-8h-8zM726 304h8v-8h-8zM736 304h8v-8h-8zM746 304h8v-8h-8zM756 304h8v-8h-8zM766 304h8v-8h-8zM776 304h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M846 304h8v-8h-8z"
        aria-label="Svalbard and Jan Mayen"
        data-tip="Svalbard and Jan Mayen"
        data-country="svalbard-and-jan-mayen"
      />
      <path
        d="M1016 304h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M586 314h8v-8h-8zM596 314h8v-8h-8zM606 314h8v-8h-8zM626 314h8v-8h-8zM636 314h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M686 314h8v-8h-8zM696 314h8v-8h-8zM706 314h8v-8h-8zM716 314h8v-8h-8zM726 314h8v-8h-8zM736 314h8v-8h-8zM746 314h8v-8h-8zM756 314h8v-8h-8zM766 314h8v-8h-8zM776 314h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M936 314h8v-8h-8zM946 314h8v-8h-8zM1006 314h8v-8h-8zM1016 314h8v-8h-8zM1026 314h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M596 324h8v-8h-8zM606 324h8v-8h-8zM626 324h8v-8h-8zM646 324h8v-8h-8zM656 324h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M706 324h8v-8h-8zM716 324h8v-8h-8zM726 324h8v-8h-8zM736 324h8v-8h-8zM746 324h8v-8h-8zM756 324h8v-8h-8zM766 324h8v-8h-8zM776 324h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M926 324h8v-8h-8zM986 324h8v-8h-8zM996 324h8v-8h-8zM1006 324h8v-8h-8zM1016 324h8v-8h-8zM1026 324h8v-8h-8zM1086 324h8v-8h-8zM1096 324h8v-8h-8zM1106 324h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M576 334h8v-8h-8zM586 334h8v-8h-8zM626 334h8v-8h-8zM636 334h8v-8h-8zM646 334h8v-8h-8zM656 334h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M716 334h8v-8h-8zM726 334h8v-8h-8zM736 334h8v-8h-8zM746 334h8v-8h-8zM756 334h8v-8h-8zM766 334h8v-8h-8zM776 334h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M926 334h8v-8h-8zM976 334h8v-8h-8zM986 334h8v-8h-8zM996 334h8v-8h-8zM1006 334h8v-8h-8zM1016 334h8v-8h-8zM1026 334h8v-8h-8zM1046 334h8v-8h-8zM1056 334h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M576 344h8v-8h-8zM586 344h8v-8h-8zM596 344h8v-8h-8zM606 344h8v-8h-8zM626 344h8v-8h-8zM646 344h8v-8h-8zM656 344h8v-8h-8zM666 344h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M716 344h8v-8h-8zM726 344h8v-8h-8zM736 344h8v-8h-8zM746 344h8v-8h-8zM756 344h8v-8h-8zM766 344h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M916 344h8v-8h-8zM956 344h8v-8h-8zM966 344h8v-8h-8zM976 344h8v-8h-8zM986 344h8v-8h-8zM996 344h8v-8h-8zM1006 344h8v-8h-8zM1016 344h8v-8h-8zM1026 344h8v-8h-8zM1036 344h8v-8h-8zM1046 344h8v-8h-8zM1056 344h8v-8h-8zM1086 344h8v-8h-8zM1096 344h8v-8h-8zM1106 344h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M506 354h8v-8h-8zM516 354h8v-8h-8zM526 354h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M596 354h8v-8h-8zM606 354h8v-8h-8zM616 354h8v-8h-8zM636 354h8v-8h-8zM646 354h8v-8h-8zM656 354h8v-8h-8zM666 354h8v-8h-8zM676 354h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M716 354h8v-8h-8zM726 354h8v-8h-8zM736 354h8v-8h-8zM746 354h8v-8h-8zM756 354h8v-8h-8zM766 354h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M866 354h8v-8h-8zM876 354h8v-8h-8z"
        aria-label="Norway"
        data-tip="Norway"
        data-country="norway"
      />
      <path
        d="M946 354h8v-8h-8zM956 354h8v-8h-8zM966 354h8v-8h-8zM976 354h8v-8h-8zM986 354h8v-8h-8zM996 354h8v-8h-8zM1006 354h8v-8h-8zM1016 354h8v-8h-8zM1026 354h8v-8h-8zM1036 354h8v-8h-8zM1046 354h8v-8h-8zM1056 354h8v-8h-8zM1066 354h8v-8h-8zM1076 354h8v-8h-8zM1086 354h8v-8h-8zM1096 354h8v-8h-8zM1106 354h8v-8h-8zM1116 354h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M496 364h8v-8h-8zM506 364h8v-8h-8zM516 364h8v-8h-8zM526 364h8v-8h-8zM536 364h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M546 364h8v-8h-8zM556 364h8v-8h-8zM566 364h8v-8h-8zM576 364h8v-8h-8zM586 364h8v-8h-8zM596 364h8v-8h-8zM636 364h8v-8h-8zM656 364h8v-8h-8zM676 364h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M716 364h8v-8h-8zM726 364h8v-8h-8zM736 364h8v-8h-8zM746 364h8v-8h-8zM756 364h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M856 364h8v-8h-8z"
        aria-label="Sweden"
        data-tip="Sweden"
        data-country="sweden"
      />
      <path
        d="M866 364h8v-8h-8z"
        aria-label="Finland"
        data-tip="Finland"
        data-country="finland"
      />
      <path
        d="M876 364h8v-8h-8zM886 364h8v-8h-8zM936 364h8v-8h-8zM956 364h8v-8h-8zM966 364h8v-8h-8zM976 364h8v-8h-8zM986 364h8v-8h-8zM996 364h8v-8h-8zM1006 364h8v-8h-8zM1016 364h8v-8h-8zM1026 364h8v-8h-8zM1036 364h8v-8h-8zM1046 364h8v-8h-8zM1056 364h8v-8h-8zM1066 364h8v-8h-8zM1076 364h8v-8h-8zM1086 364h8v-8h-8zM1096 364h8v-8h-8zM1106 364h8v-8h-8zM1116 364h8v-8h-8zM1126 364h8v-8h-8zM1136 364h8v-8h-8zM1146 364h8v-8h-8zM1156 364h8v-8h-8zM1166 364h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M506 374h8v-8h-8zM516 374h8v-8h-8zM526 374h8v-8h-8zM536 374h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M546 374h8v-8h-8zM556 374h8v-8h-8zM566 374h8v-8h-8zM576 374h8v-8h-8zM586 374h8v-8h-8zM596 374h8v-8h-8zM606 374h8v-8h-8zM616 374h8v-8h-8zM626 374h8v-8h-8zM636 374h8v-8h-8zM646 374h8v-8h-8zM656 374h8v-8h-8zM676 374h8v-8h-8zM686 374h8v-8h-8zM696 374h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M716 374h8v-8h-8zM726 374h8v-8h-8zM736 374h8v-8h-8zM746 374h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M846 374h8v-8h-8zM856 374h8v-8h-8z"
        aria-label="Sweden"
        data-tip="Sweden"
        data-country="sweden"
      />
      <path
        d="M866 374h8v-8h-8z"
        aria-label="Finland"
        data-tip="Finland"
        data-country="finland"
      />
      <path
        d="M876 374h8v-8h-8zM886 374h8v-8h-8zM896 374h8v-8h-8zM906 374h8v-8h-8zM916 374h8v-8h-8zM926 374h8v-8h-8zM936 374h8v-8h-8zM946 374h8v-8h-8zM966 374h8v-8h-8zM976 374h8v-8h-8zM986 374h8v-8h-8zM996 374h8v-8h-8zM1006 374h8v-8h-8zM1016 374h8v-8h-8zM1026 374h8v-8h-8zM1036 374h8v-8h-8zM1046 374h8v-8h-8zM1056 374h8v-8h-8zM1066 374h8v-8h-8zM1076 374h8v-8h-8zM1086 374h8v-8h-8zM1096 374h8v-8h-8zM1106 374h8v-8h-8zM1116 374h8v-8h-8zM1126 374h8v-8h-8zM1136 374h8v-8h-8zM1146 374h8v-8h-8zM1156 374h8v-8h-8zM1166 374h8v-8h-8zM1176 374h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M496 384h8v-8h-8zM506 384h8v-8h-8zM516 384h8v-8h-8zM526 384h8v-8h-8zM536 384h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M546 384h8v-8h-8zM556 384h8v-8h-8zM566 384h8v-8h-8zM576 384h8v-8h-8zM586 384h8v-8h-8zM596 384h8v-8h-8zM606 384h8v-8h-8zM616 384h8v-8h-8zM626 384h8v-8h-8zM636 384h8v-8h-8zM646 384h8v-8h-8zM656 384h8v-8h-8zM666 384h8v-8h-8zM676 384h8v-8h-8zM686 384h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M716 384h8v-8h-8zM726 384h8v-8h-8zM736 384h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M776 384h8v-8h-8zM786 384h8v-8h-8z"
        aria-label="Iceland"
        data-tip="Iceland"
        data-country="iceland"
      />
      <path
        d="M846 384h8v-8h-8zM856 384h8v-8h-8z"
        aria-label="Sweden"
        data-tip="Sweden"
        data-country="sweden"
      />
      <path
        d="M866 384h8v-8h-8z"
        aria-label="Finland"
        data-tip="Finland"
        data-country="finland"
      />
      <path
        d="M876 384h8v-8h-8zM896 384h8v-8h-8zM906 384h8v-8h-8zM916 384h8v-8h-8zM926 384h8v-8h-8zM936 384h8v-8h-8zM946 384h8v-8h-8zM956 384h8v-8h-8zM966 384h8v-8h-8zM976 384h8v-8h-8zM986 384h8v-8h-8zM996 384h8v-8h-8zM1006 384h8v-8h-8zM1016 384h8v-8h-8zM1026 384h8v-8h-8zM1036 384h8v-8h-8zM1046 384h8v-8h-8zM1056 384h8v-8h-8zM1066 384h8v-8h-8zM1076 384h8v-8h-8zM1086 384h8v-8h-8zM1096 384h8v-8h-8zM1106 384h8v-8h-8zM1116 384h8v-8h-8zM1126 384h8v-8h-8zM1136 384h8v-8h-8zM1146 384h8v-8h-8zM1156 384h8v-8h-8zM1176 384h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M496 394h8v-8h-8zM506 394h8v-8h-8zM516 394h8v-8h-8zM526 394h8v-8h-8zM536 394h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M546 394h8v-8h-8zM556 394h8v-8h-8zM566 394h8v-8h-8zM576 394h8v-8h-8zM586 394h8v-8h-8zM596 394h8v-8h-8zM606 394h8v-8h-8zM616 394h8v-8h-8zM626 394h8v-8h-8zM636 394h8v-8h-8zM656 394h8v-8h-8zM666 394h8v-8h-8zM686 394h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M726 394h8v-8h-8z"
        aria-label="Greenland"
        data-tip="Greenland"
        data-country="greenland"
      />
      <path
        d="M826 394h8v-8h-8zM836 394h8v-8h-8z"
        aria-label="Norway"
        data-tip="Norway"
        data-country="norway"
      />
      <path
        d="M846 394h8v-8h-8z"
        aria-label="Sweden"
        data-tip="Sweden"
        data-country="sweden"
      />
      <path
        d="M866 394h8v-8h-8z"
        aria-label="Finland"
        data-tip="Finland"
        data-country="finland"
      />
      <path
        d="M876 394h8v-8h-8zM886 394h8v-8h-8zM896 394h8v-8h-8zM906 394h8v-8h-8zM916 394h8v-8h-8zM926 394h8v-8h-8zM936 394h8v-8h-8zM946 394h8v-8h-8zM956 394h8v-8h-8zM966 394h8v-8h-8zM976 394h8v-8h-8zM986 394h8v-8h-8zM996 394h8v-8h-8zM1006 394h8v-8h-8zM1016 394h8v-8h-8zM1026 394h8v-8h-8zM1036 394h8v-8h-8zM1046 394h8v-8h-8zM1056 394h8v-8h-8zM1066 394h8v-8h-8zM1076 394h8v-8h-8zM1086 394h8v-8h-8zM1096 394h8v-8h-8zM1106 394h8v-8h-8zM1116 394h8v-8h-8zM1126 394h8v-8h-8zM1136 394h8v-8h-8zM1146 394h8v-8h-8zM1156 394h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M506 404h8v-8h-8zM516 404h8v-8h-8zM526 404h8v-8h-8zM546 404h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M556 404h8v-8h-8zM566 404h8v-8h-8zM576 404h8v-8h-8zM586 404h8v-8h-8zM596 404h8v-8h-8zM606 404h8v-8h-8zM616 404h8v-8h-8zM626 404h8v-8h-8zM666 404h8v-8h-8zM676 404h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M826 404h8v-8h-8zM836 404h8v-8h-8z"
        aria-label="Norway"
        data-tip="Norway"
        data-country="norway"
      />
      <path
        d="M846 404h8v-8h-8z"
        aria-label="Sweden"
        data-tip="Sweden"
        data-country="sweden"
      />
      <path
        d="M876 404h8v-8h-8zM886 404h8v-8h-8zM896 404h8v-8h-8zM906 404h8v-8h-8zM916 404h8v-8h-8zM926 404h8v-8h-8zM936 404h8v-8h-8zM946 404h8v-8h-8zM956 404h8v-8h-8zM966 404h8v-8h-8zM976 404h8v-8h-8zM986 404h8v-8h-8zM996 404h8v-8h-8zM1006 404h8v-8h-8zM1016 404h8v-8h-8zM1026 404h8v-8h-8zM1036 404h8v-8h-8zM1046 404h8v-8h-8zM1056 404h8v-8h-8zM1066 404h8v-8h-8zM1076 404h8v-8h-8zM1086 404h8v-8h-8zM1096 404h8v-8h-8zM1106 404h8v-8h-8zM1136 404h8v-8h-8zM1146 404h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M566 414h8v-8h-8zM576 414h8v-8h-8zM586 414h8v-8h-8zM596 414h8v-8h-8zM606 414h8v-8h-8zM616 414h8v-8h-8zM626 414h8v-8h-8zM636 414h8v-8h-8zM676 414h8v-8h-8zM686 414h8v-8h-8zM696 414h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M806 414h8v-8h-8z"
        aria-label="United Kingdom"
        data-tip="United Kingdom"
        data-country="united-kingdom"
      />
      <path
        d="M836 414h8v-8h-8z"
        aria-label="Denmark"
        data-tip="Denmark"
        data-country="denmark"
      />
      <path
        d="M846 414h8v-8h-8z"
        aria-label="Sweden"
        data-tip="Sweden"
        data-country="sweden"
      />
      <path
        d="M866 414h8v-8h-8z"
        aria-label="Latvia"
        data-tip="Latvia"
        data-country="latvia"
      />
      <path
        d="M876 414h8v-8h-8zM886 414h8v-8h-8zM896 414h8v-8h-8zM906 414h8v-8h-8zM916 414h8v-8h-8zM926 414h8v-8h-8zM936 414h8v-8h-8zM946 414h8v-8h-8zM956 414h8v-8h-8zM966 414h8v-8h-8zM976 414h8v-8h-8zM986 414h8v-8h-8zM996 414h8v-8h-8zM1006 414h8v-8h-8zM1016 414h8v-8h-8zM1026 414h8v-8h-8zM1036 414h8v-8h-8zM1046 414h8v-8h-8zM1056 414h8v-8h-8zM1066 414h8v-8h-8zM1076 414h8v-8h-8zM1126 414h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M566 424h8v-8h-8zM576 424h8v-8h-8zM586 424h8v-8h-8zM596 424h8v-8h-8zM606 424h8v-8h-8zM616 424h8v-8h-8zM626 424h8v-8h-8zM636 424h8v-8h-8zM646 424h8v-8h-8zM656 424h8v-8h-8zM666 424h8v-8h-8zM676 424h8v-8h-8zM686 424h8v-8h-8zM696 424h8v-8h-8zM706 424h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M816 424h8v-8h-8z"
        aria-label="United Kingdom"
        data-tip="United Kingdom"
        data-country="united-kingdom"
      />
      <path
        d="M836 424h8v-8h-8z"
        aria-label="Germany"
        data-tip="Germany"
        data-country="germany"
      />
      <path
        d="M846 424h8v-8h-8zM856 424h8v-8h-8z"
        aria-label="Poland"
        data-tip="Poland"
        data-country="poland"
      />
      <path
        d="M866 424h8v-8h-8zM876 424h8v-8h-8z"
        aria-label="Belarus"
        data-tip="Belarus"
        data-country="belarus"
      />
      <path
        d="M886 424h8v-8h-8zM896 424h8v-8h-8zM906 424h8v-8h-8zM916 424h8v-8h-8zM926 424h8v-8h-8zM936 424h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M946 424h8v-8h-8zM956 424h8v-8h-8z"
        aria-label="Kazakhstan"
        data-tip="Kazakhstan"
        data-country="kazakhstan"
      />
      <path
        d="M966 424h8v-8h-8zM976 424h8v-8h-8zM986 424h8v-8h-8zM996 424h8v-8h-8zM1006 424h8v-8h-8zM1016 424h8v-8h-8zM1026 424h8v-8h-8zM1036 424h8v-8h-8zM1046 424h8v-8h-8zM1056 424h8v-8h-8zM1066 424h8v-8h-8zM1076 424h8v-8h-8zM1086 424h8v-8h-8zM1126 424h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M576 434h8v-8h-8zM586 434h8v-8h-8zM596 434h8v-8h-8zM606 434h8v-8h-8zM616 434h8v-8h-8zM626 434h8v-8h-8zM636 434h8v-8h-8zM646 434h8v-8h-8zM656 434h8v-8h-8zM666 434h8v-8h-8zM676 434h8v-8h-8zM686 434h8v-8h-8zM696 434h8v-8h-8zM706 434h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M816 434h8v-8h-8z"
        aria-label="United Kingdom"
        data-tip="United Kingdom"
        data-country="united-kingdom"
      />
      <path
        d="M826 434h8v-8h-8z"
        aria-label="Belgium"
        data-tip="Belgium"
        data-country="belgium"
      />
      <path
        d="M826 434h8v-8h-8z"
        aria-label="Netherlands"
        data-tip="Netherlands"
        data-country="netherlands"
      />
      <path
        d="M836 434h8v-8h-8z"
        aria-label="Germany"
        data-tip="Germany"
        data-country="germany"
      />
      <path
        d="M846 434h8v-8h-8zM856 434h8v-8h-8z"
        aria-label="Poland"
        data-tip="Poland"
        data-country="poland"
      />
      <path
        d="M866 434h8v-8h-8zM876 434h8v-8h-8z"
        aria-label="Ukraine"
        data-tip="Ukraine"
        data-country="ukraine"
      />
      <path
        d="M886 434h8v-8h-8zM896 434h8v-8h-8zM906 434h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M916 434h8v-8h-8z"
        aria-label="Kazakhstan"
        data-tip="Kazakhstan"
        data-country="kazakhstan"
      />
      <path
        d="M926 434h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M936 434h8v-8h-8zM946 434h8v-8h-8zM956 434h8v-8h-8zM966 434h8v-8h-8z"
        aria-label="Kazakhstan"
        data-tip="Kazakhstan"
        data-country="kazakhstan"
      />
      <path
        d="M976 434h8v-8h-8zM986 434h8v-8h-8zM996 434h8v-8h-8zM1006 434h8v-8h-8zM1016 434h8v-8h-8zM1026 434h8v-8h-8zM1036 434h8v-8h-8zM1046 434h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M1056 434h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M1066 434h8v-8h-8zM1076 434h8v-8h-8zM1086 434h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M576 444h8v-8h-8zM586 444h8v-8h-8zM596 444h8v-8h-8zM606 444h8v-8h-8zM616 444h8v-8h-8zM626 444h8v-8h-8zM636 444h8v-8h-8zM646 444h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M656 444h8v-8h-8zM666 444h8v-8h-8zM676 444h8v-8h-8zM686 444h8v-8h-8zM706 444h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M816 444h8v-8h-8zM826 444h8v-8h-8z"
        aria-label="France"
        data-tip="France"
        data-country="france"
      />
      <path
        d="M836 444h8v-8h-8z"
        aria-label="Germany"
        data-tip="Germany"
        data-country="germany"
      />
      <path
        d="M846 444h8v-8h-8z"
        aria-label="Austria"
        data-tip="Austria"
        data-country="austria"
      />
      <path
        d="M856 444h8v-8h-8z"
        aria-label="Hungary"
        data-tip="Hungary"
        data-country="hungary"
      />
      <path
        d="M866 444h8v-8h-8z"
        aria-label="Romania"
        data-tip="Romania"
        data-country="romania"
      />
      <path
        d="M876 444h8v-8h-8zM886 444h8v-8h-8z"
        aria-label="Ukraine"
        data-tip="Ukraine"
        data-country="ukraine"
      />
      <path
        d="M896 444h8v-8h-8zM906 444h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M916 444h8v-8h-8zM926 444h8v-8h-8zM936 444h8v-8h-8zM946 444h8v-8h-8zM956 444h8v-8h-8zM966 444h8v-8h-8zM976 444h8v-8h-8z"
        aria-label="Kazakhstan"
        data-tip="Kazakhstan"
        data-country="kazakhstan"
      />
      <path
        d="M986 444h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M996 444h8v-8h-8zM1006 444h8v-8h-8zM1016 444h8v-8h-8zM1026 444h8v-8h-8zM1036 444h8v-8h-8zM1046 444h8v-8h-8z"
        aria-label="Mongolia"
        data-tip="Mongolia"
        data-country="mongolia"
      />
      <path
        d="M1056 444h8v-8h-8zM1066 444h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M1076 444h8v-8h-8zM1086 444h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M576 454h8v-8h-8zM586 454h8v-8h-8zM596 454h8v-8h-8zM606 454h8v-8h-8zM616 454h8v-8h-8zM626 454h8v-8h-8zM636 454h8v-8h-8zM646 454h8v-8h-8zM656 454h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M666 454h8v-8h-8z"
        aria-label="Canada"
        data-tip="Canada"
        data-country="canada"
      />
      <path
        d="M676 454h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M816 454h8v-8h-8zM826 454h8v-8h-8z"
        aria-label="France"
        data-tip="France"
        data-country="france"
      />
      <path
        d="M836 454h8v-8h-8z"
        aria-label="Italy"
        data-tip="Italy"
        data-country="italy"
      />
      <path
        d="M836 454h8v-8h-8z"
        aria-label="Corsica"
        data-tip="Corsica"
        data-country="corsica"
      />
      <path
        d="M846 454h8v-8h-8z"
        aria-label="Bosnia"
        data-tip="Bosnia"
        data-country="bosnia"
      />
      <path
        d="M846 454h8v-8h-8z"
        aria-label="Croatia"
        data-tip="Croatia"
        data-country="croatia"
      />
      <path
        d="M856 454h8v-8h-8z"
        aria-label="Serbia"
        data-tip="Serbia"
        data-country="serbia"
      />
      <path
        d="M866 454h8v-8h-8z"
        aria-label="Romania"
        data-tip="Romania"
        data-country="romania"
      />
      <path
        d="M896 454h8v-8h-8zM906 454h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M916 454h8v-8h-8z"
        aria-label="Kazakhstan"
        data-tip="Kazakhstan"
        data-country="kazakhstan"
      />
      <path
        d="M926 454h8v-8h-8z"
        aria-label="Uzbekistan"
        data-tip="Uzbekistan"
        data-country="uzbekistan"
      />
      <path
        d="M936 454h8v-8h-8zM946 454h8v-8h-8zM956 454h8v-8h-8zM966 454h8v-8h-8z"
        aria-label="Kazakhstan"
        data-tip="Kazakhstan"
        data-country="kazakhstan"
      />
      <path
        d="M976 454h8v-8h-8zM986 454h8v-8h-8zM996 454h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M1006 454h8v-8h-8zM1016 454h8v-8h-8zM1026 454h8v-8h-8z"
        aria-label="Mongolia"
        data-tip="Mongolia"
        data-country="mongolia"
      />
      <path
        d="M1036 454h8v-8h-8zM1046 454h8v-8h-8zM1056 454h8v-8h-8zM1066 454h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M1076 454h8v-8h-8z"
        aria-label="Russia"
        data-tip="Russia"
        data-country="russia"
      />
      <path
        d="M1096 454h8v-8h-8z"
        aria-label="Japan"
        data-tip="Japan"
        data-country="japan"
      />
      <path
        d="M576 464h8v-8h-8zM586 464h8v-8h-8zM596 464h8v-8h-8zM606 464h8v-8h-8zM616 464h8v-8h-8zM626 464h8v-8h-8zM636 464h8v-8h-8zM646 464h8v-8h-8zM656 464h8v-8h-8zM666 464h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M806 464h8v-8h-8zM816 464h8v-8h-8z"
        aria-label="Spain"
        data-tip="Spain"
        data-country="spain"
      />
      <path
        d="M846 464h8v-8h-8z"
        aria-label="Italy"
        data-tip="Italy"
        data-country="italy"
      />
      <path
        d="M856 464h8v-8h-8z"
        aria-label="Greece"
        data-tip="Greece"
        data-country="greece"
      />
      <path
        d="M876 464h8v-8h-8zM886 464h8v-8h-8zM896 464h8v-8h-8z"
        aria-label="Turkey"
        data-tip="Turkey"
        data-country="turkey"
      />
      <path
        d="M906 464h8v-8h-8z"
        aria-label="Azerbaijan"
        data-tip="Azerbaijan"
        data-country="azerbaijan"
      />
      <path
        d="M926 464h8v-8h-8zM936 464h8v-8h-8z"
        aria-label="Turkmenistan"
        data-tip="Turkmenistan"
        data-country="turkmenistan"
      />
      <path
        d="M946 464h8v-8h-8z"
        aria-label="Uzbekistan"
        data-tip="Uzbekistan"
        data-country="uzbekistan"
      />
      <path
        d="M956 464h8v-8h-8z"
        aria-label="Kyrgyzstan"
        data-tip="Kyrgyzstan"
        data-country="kyrgyzstan"
      />
      <path
        d="M966 464h8v-8h-8zM976 464h8v-8h-8zM986 464h8v-8h-8zM996 464h8v-8h-8zM1006 464h8v-8h-8zM1016 464h8v-8h-8zM1026 464h8v-8h-8zM1036 464h8v-8h-8zM1046 464h8v-8h-8zM1056 464h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M586 474h8v-8h-8zM596 474h8v-8h-8zM606 474h8v-8h-8zM616 474h8v-8h-8zM626 474h8v-8h-8zM636 474h8v-8h-8zM646 474h8v-8h-8zM656 474h8v-8h-8zM666 474h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M806 474h8v-8h-8z"
        aria-label="Spain"
        data-tip="Spain"
        data-country="spain"
      />
      <path
        d="M816 474h8v-8h-8zM826 474h8v-8h-8z"
        aria-label="Algeria"
        data-tip="Algeria"
        data-country="algeria"
      />
      <path
        d="M836 474h8v-8h-8z"
        aria-label="Tunisia"
        data-tip="Tunisia"
        data-country="tunisia"
      />
      <path
        d="M886 474h8v-8h-8z"
        aria-label="Turkey"
        data-tip="Turkey"
        data-country="turkey"
      />
      <path
        d="M896 474h8v-8h-8z"
        aria-label="Syria"
        data-tip="Syria"
        data-country="syria"
      />
      <path
        d="M906 474h8v-8h-8zM916 474h8v-8h-8zM926 474h8v-8h-8z"
        aria-label="Iran"
        data-tip="Iran"
        data-country="iran"
      />
      <path
        d="M936 474h8v-8h-8z"
        aria-label="Turkmenistan"
        data-tip="Turkmenistan"
        data-country="turkmenistan"
      />
      <path
        d="M946 474h8v-8h-8z"
        aria-label="Afghanistan"
        data-tip="Afghanistan"
        data-country="afghanistan"
      />
      <path
        d="M956 474h8v-8h-8z"
        aria-label="Pakistan"
        data-tip="Pakistan"
        data-country="pakistan"
      />
      <path
        d="M966 474h8v-8h-8zM976 474h8v-8h-8zM986 474h8v-8h-8zM996 474h8v-8h-8zM1006 474h8v-8h-8zM1016 474h8v-8h-8zM1026 474h8v-8h-8zM1036 474h8v-8h-8zM1046 474h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M1066 474h8v-8h-8z"
        aria-label="South Korea"
        data-tip="South Korea"
        data-country="south-korea"
      />
      <path
        d="M1086 474h8v-8h-8z"
        aria-label="Japan"
        data-tip="Japan"
        data-country="japan"
      />
      <path
        d="M596 484h8v-8h-8z"
        aria-label="Mexico"
        data-tip="Mexico"
        data-country="mexico"
      />
      <path
        d="M606 484h8v-8h-8zM616 484h8v-8h-8zM626 484h8v-8h-8zM636 484h8v-8h-8zM646 484h8v-8h-8zM656 484h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M806 484h8v-8h-8z"
        aria-label="Morocco"
        data-tip="Morocco"
        data-country="morocco"
      />
      <path
        d="M816 484h8v-8h-8zM826 484h8v-8h-8z"
        aria-label="Algeria"
        data-tip="Algeria"
        data-country="algeria"
      />
      <path
        d="M836 484h8v-8h-8z"
        aria-label="Tunisia"
        data-tip="Tunisia"
        data-country="tunisia"
      />
      <path
        d="M846 484h8v-8h-8zM856 484h8v-8h-8z"
        aria-label="Libya"
        data-tip="Libya"
        data-country="libya"
      />
      <path
        d="M886 484h8v-8h-8z"
        aria-label="Jordan"
        data-tip="Jordan"
        data-country="jordan"
      />
      <path
        d="M896 484h8v-8h-8zM906 484h8v-8h-8z"
        aria-label="Iraq"
        data-tip="Iraq"
        data-country="iraq"
      />
      <path
        d="M916 484h8v-8h-8zM926 484h8v-8h-8z"
        aria-label="Iran"
        data-tip="Iran"
        data-country="iran"
      />
      <path
        d="M936 484h8v-8h-8zM946 484h8v-8h-8z"
        aria-label="Afghanistan"
        data-tip="Afghanistan"
        data-country="afghanistan"
      />
      <path
        d="M956 484h8v-8h-8z"
        aria-label="Pakistan"
        data-tip="Pakistan"
        data-country="pakistan"
      />
      <path
        d="M966 484h8v-8h-8z"
        aria-label="India"
        data-tip="India"
        data-country="india"
      />
      <path
        d="M976 484h8v-8h-8zM986 484h8v-8h-8zM996 484h8v-8h-8zM1006 484h8v-8h-8zM1016 484h8v-8h-8zM1026 484h8v-8h-8zM1036 484h8v-8h-8zM1046 484h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M596 494h8v-8h-8zM606 494h8v-8h-8zM616 494h8v-8h-8z"
        aria-label="Mexico"
        data-tip="Mexico"
        data-country="mexico"
      />
      <path
        d="M626 494h8v-8h-8zM656 494h8v-8h-8z"
        aria-label="United States"
        data-tip="United States"
        data-country="united-states"
      />
      <path
        d="M776 494h8v-8h-8z"
        aria-label="Tenerife"
        data-tip="Tenerife"
        data-country="tenerife"
      />
      <path
        d="M796 494h8v-8h-8z"
        aria-label="Western Sahara"
        data-tip="Western Sahara"
        data-country="western-sahara"
      />
      <path
        d="M806 494h8v-8h-8zM816 494h8v-8h-8zM826 494h8v-8h-8z"
        aria-label="Algeria"
        data-tip="Algeria"
        data-country="algeria"
      />
      <path
        d="M836 494h8v-8h-8zM846 494h8v-8h-8zM856 494h8v-8h-8z"
        aria-label="Libya"
        data-tip="Libya"
        data-country="libya"
      />
      <path
        d="M866 494h8v-8h-8zM876 494h8v-8h-8z"
        aria-label="Egypt"
        data-tip="Egypt"
        data-country="egypt"
      />
      <path
        d="M886 494h8v-8h-8zM896 494h8v-8h-8zM906 494h8v-8h-8z"
        aria-label="Saudi Arabia"
        data-tip="Saudi Arabia"
        data-country="saudi-arabia"
      />
      <path
        d="M926 494h8v-8h-8zM936 494h8v-8h-8z"
        aria-label="Iran"
        data-tip="Iran"
        data-country="iran"
      />
      <path
        d="M946 494h8v-8h-8z"
        aria-label="Pakistan"
        data-tip="Pakistan"
        data-country="pakistan"
      />
      <path
        d="M956 494h8v-8h-8zM966 494h8v-8h-8zM976 494h8v-8h-8z"
        aria-label="India"
        data-tip="India"
        data-country="india"
      />
      <path
        d="M986 494h8v-8h-8z"
        aria-label="Nepal"
        data-tip="Nepal"
        data-country="nepal"
      />
      <path
        d="M996 494h8v-8h-8z"
        aria-label="India"
        data-tip="India"
        data-country="india"
      />
      <path
        d="M1006 494h8v-8h-8z"
        aria-label="Myanmar"
        data-tip="Myanmar"
        data-country="myanmar"
      />
      <path
        d="M1016 494h8v-8h-8zM1026 494h8v-8h-8zM1036 494h8v-8h-8zM1046 494h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M616 504h8v-8h-8zM626 504h8v-8h-8z"
        aria-label="Mexico"
        data-tip="Mexico"
        data-country="mexico"
      />
      <path
        d="M656 504h8v-8h-8z"
        aria-label="Cuba"
        data-tip="Cuba"
        data-country="cuba"
      />
      <path
        d="M786 504h8v-8h-8z"
        aria-label="Western Sahara"
        data-tip="Western Sahara"
        data-country="western-sahara"
      />
      <path
        d="M796 504h8v-8h-8z"
        aria-label="Mauritania"
        data-tip="Mauritania"
        data-country="mauritania"
      />
      <path
        d="M806 504h8v-8h-8z"
        aria-label="Mali"
        data-tip="Mali"
        data-country="mali"
      />
      <path
        d="M816 504h8v-8h-8zM826 504h8v-8h-8z"
        aria-label="Algeria"
        data-tip="Algeria"
        data-country="algeria"
      />
      <path
        d="M836 504h8v-8h-8z"
        aria-label="Niger"
        data-tip="Niger"
        data-country="niger"
      />
      <path
        d="M846 504h8v-8h-8z"
        aria-label="Chad"
        data-tip="Chad"
        data-country="chad"
      />
      <path
        d="M856 504h8v-8h-8z"
        aria-label="Libya"
        data-tip="Libya"
        data-country="libya"
      />
      <path
        d="M866 504h8v-8h-8zM876 504h8v-8h-8zM886 504h8v-8h-8z"
        aria-label="Egypt"
        data-tip="Egypt"
        data-country="egypt"
      />
      <path
        d="M896 504h8v-8h-8zM906 504h8v-8h-8zM916 504h8v-8h-8z"
        aria-label="Saudi Arabia"
        data-tip="Saudi Arabia"
        data-country="saudi-arabia"
      />
      <path
        d="M926 504h8v-8h-8z"
        aria-label="Oman"
        data-tip="Oman"
        data-country="oman"
      />
      <path
        d="M956 504h8v-8h-8zM966 504h8v-8h-8zM976 504h8v-8h-8zM986 504h8v-8h-8z"
        aria-label="India"
        data-tip="India"
        data-country="india"
      />
      <path
        d="M996 504h8v-8h-8zM1006 504h8v-8h-8z"
        aria-label="Myanmar"
        data-tip="Myanmar"
        data-country="myanmar"
      />
      <path
        d="M1016 504h8v-8h-8z"
        aria-label="Vietnam"
        data-tip="Vietnam"
        data-country="vietnam"
      />
      <path
        d="M1026 504h8v-8h-8zM1036 504h8v-8h-8z"
        aria-label="China"
        data-tip="China"
        data-country="china"
      />
      <path
        d="M626 514h8v-8h-8zM636 514h8v-8h-8z"
        aria-label="Mexico"
        data-tip="Mexico"
        data-country="mexico"
      />
      <path
        d="M666 514h8v-8h-8z"
        aria-label="Jamaica"
        data-tip="Jamaica"
        data-country="jamaica"
      />
      <path
        d="M686 514h8v-8h-8z"
        aria-label="Puerto Rico"
        data-tip="Puerto Rico"
        data-country="puerto-rico"
      />
      <path
        d="M786 514h8v-8h-8zM796 514h8v-8h-8z"
        aria-label="Mauritania"
        data-tip="Mauritania"
        data-country="mauritania"
      />
      <path
        d="M806 514h8v-8h-8zM816 514h8v-8h-8z"
        aria-label="Mali"
        data-tip="Mali"
        data-country="mali"
      />
      <path
        d="M826 514h8v-8h-8zM836 514h8v-8h-8z"
        aria-label="Niger"
        data-tip="Niger"
        data-country="niger"
      />
      <path
        d="M846 514h8v-8h-8zM856 514h8v-8h-8z"
        aria-label="Chad"
        data-tip="Chad"
        data-country="chad"
      />
      <path
        d="M866 514h8v-8h-8zM876 514h8v-8h-8zM886 514h8v-8h-8z"
        aria-label="Sudan"
        data-tip="Sudan"
        data-country="sudan"
      />
      <path
        d="M906 514h8v-8h-8z"
        aria-label="Saudi Arabia"
        data-tip="Saudi Arabia"
        data-country="saudi-arabia"
      />
      <path
        d="M916 514h8v-8h-8z"
        aria-label="Yemen"
        data-tip="Yemen"
        data-country="yemen"
      />
      <path
        d="M966 514h8v-8h-8zM976 514h8v-8h-8z"
        aria-label="India"
        data-tip="India"
        data-country="india"
      />
      <path
        d="M1006 514h8v-8h-8zM1016 514h8v-8h-8z"
        aria-label="Thailand"
        data-tip="Thailand"
        data-country="thailand"
      />
      <path
        d="M786 524h8v-8h-8z"
        aria-label="Senegal"
        data-tip="Senegal"
        data-country="senegal"
      />
      <path
        d="M796 524h8v-8h-8zM806 524h8v-8h-8z"
        aria-label="Mali"
        data-tip="Mali"
        data-country="mali"
      />
      <path
        d="M816 524h8v-8h-8z"
        aria-label="Burkina Faso"
        data-tip="Burkina Faso"
        data-country="burkina-faso"
      />
      <path
        d="M826 524h8v-8h-8zM836 524h8v-8h-8z"
        aria-label="Nigeria"
        data-tip="Nigeria"
        data-country="nigeria"
      />
      <path
        d="M846 524h8v-8h-8zM856 524h8v-8h-8z"
        aria-label="Chad"
        data-tip="Chad"
        data-country="chad"
      />
      <path
        d="M866 524h8v-8h-8zM876 524h8v-8h-8zM886 524h8v-8h-8z"
        aria-label="Sudan"
        data-tip="Sudan"
        data-country="sudan"
      />
      <path
        d="M896 524h8v-8h-8z"
        aria-label="Ethiopia"
        data-tip="Ethiopia"
        data-country="ethiopia"
      />
      <path
        d="M966 524h8v-8h-8z"
        aria-label="India"
        data-tip="India"
        data-country="india"
      />
      <path
        d="M1016 524h8v-8h-8z"
        aria-label="Cambodia"
        data-tip="Cambodia"
        data-country="cambodia"
      />
      <path
        d="M1026 524h8v-8h-8z"
        aria-label="Vietnam"
        data-tip="Vietnam"
        data-country="vietnam"
      />
      <path
        d="M1056 524h8v-8h-8z"
        aria-label="Philippines"
        data-tip="Philippines"
        data-country="philippines"
      />
      <path
        d="M656 534h8v-8h-8zM666 534h8v-8h-8z"
        aria-label="Panama"
        data-tip="Panama"
        data-country="panama"
      />
      <path
        d="M676 534h8v-8h-8zM686 534h8v-8h-8zM696 534h8v-8h-8z"
        aria-label="Venezuela"
        data-tip="Venezuela"
        data-country="venezuela"
      />
      <path
        d="M796 534h8v-8h-8z"
        aria-label="Liberia"
        data-tip="Liberia"
        data-country="liberia"
      />
      <path d="M806 534h8v-8h-8z" aria-label="Côte d'Ivoire" />
      <path
        d="M816 534h8v-8h-8z"
        aria-label="Ghana"
        data-tip="Ghana"
        data-country="ghana"
      />
      <path
        d="M826 534h8v-8h-8zM836 534h8v-8h-8z"
        aria-label="Nigeria"
        data-tip="Nigeria"
        data-country="nigeria"
      />
      <path
        d="M846 534h8v-8h-8z"
        aria-label="Chad"
        data-tip="Chad"
        data-country="chad"
      />
      <path
        d="M856 534h8v-8h-8z"
        aria-label="Central African Republic"
        data-tip="Central African Republic"
        data-country="central-african-republic"
      />
      <path
        d="M866 534h8v-8h-8zM876 534h8v-8h-8z"
        aria-label="South Sudan"
        data-tip="South Sudan"
        data-country="south-sudan"
      />
      <path
        d="M886 534h8v-8h-8zM896 534h8v-8h-8zM906 534h8v-8h-8z"
        aria-label="Ethiopia"
        data-tip="Ethiopia"
        data-country="ethiopia"
      />
      <path
        d="M1056 534h8v-8h-8z"
        aria-label="Philippines"
        data-tip="Philippines"
        data-country="philippines"
      />
      <path
        d="M666 544h8v-8h-8zM676 544h8v-8h-8z"
        aria-label="Colombia"
        data-tip="Colombia"
        data-country="colombia"
      />
      <path
        d="M686 544h8v-8h-8z"
        aria-label="Venezuela"
        data-tip="Venezuela"
        data-country="venezuela"
      />
      <path
        d="M696 544h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M706 544h8v-8h-8z"
        aria-label="Suriname"
        data-tip="Suriname"
        data-country="suriname"
      />
      <path
        d="M716 544h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M836 544h8v-8h-8z"
        aria-label="Equatorial Guinea"
        data-tip="Equatorial Guinea"
        data-country="equatorial-guinea"
      />
      <path
        d="M846 544h8v-8h-8z"
        aria-label="Cameroon"
        data-tip="Cameroon"
        data-country="cameroon"
      />
      <path
        d="M856 544h8v-8h-8zM866 544h8v-8h-8z"
        aria-label="Democratic Republic of Congo"
        data-tip="Democratic Republic of Congo"
        data-country="democratic-republic-of-congo"
      />
      <path
        d="M876 544h8v-8h-8z"
        aria-label="Uganda"
        data-tip="Uganda"
        data-country="uganda"
      />
      <path
        d="M886 544h8v-8h-8z"
        aria-label="Kenya"
        data-tip="Kenya"
        data-country="kenya"
      />
      <path
        d="M896 544h8v-8h-8z"
        aria-label="Somalia"
        data-tip="Somalia"
        data-country="somalia"
      />
      <path
        d="M1006 544h8v-8h-8z"
        aria-label="Indonesia"
        data-tip="Indonesia"
        data-country="indonesia"
      />
      <path
        d="M1016 544h8v-8h-8zM1036 544h8v-8h-8z"
        aria-label="Malaysia"
        data-tip="Malaysia"
        data-country="malaysia"
      />
      <path
        d="M666 554h8v-8h-8zM676 554h8v-8h-8z"
        aria-label="Peru"
        data-tip="Peru"
        data-country="peru"
      />
      <path
        d="M686 554h8v-8h-8zM696 554h8v-8h-8zM706 554h8v-8h-8zM716 554h8v-8h-8zM726 554h8v-8h-8zM736 554h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M836 554h8v-8h-8z"
        aria-label="Gabon"
        data-tip="Gabon"
        data-country="gabon"
      />
      <path
        d="M846 554h8v-8h-8z"
        aria-label="Republic of Congo"
        data-tip="Republic of Congo"
        data-country="republic-of-congo"
      />
      <path
        d="M856 554h8v-8h-8zM866 554h8v-8h-8z"
        aria-label="Democratic Republic of Congo"
        data-tip="Democratic Republic of Congo"
        data-country="democratic-republic-of-congo"
      />
      <path
        d="M876 554h8v-8h-8zM886 554h8v-8h-8z"
        aria-label="Tanzania"
        data-tip="Tanzania"
        data-country="tanzania"
      />
      <path
        d="M1016 554h8v-8h-8zM1036 554h8v-8h-8zM1046 554h8v-8h-8zM1066 554h8v-8h-8zM1076 554h8v-8h-8zM1086 554h8v-8h-8z"
        aria-label="Indonesia"
        data-tip="Indonesia"
        data-country="indonesia"
      />
      <path
        d="M666 564h8v-8h-8z"
        aria-label="Peru"
        data-tip="Peru"
        data-country="peru"
      />
      <path
        d="M676 564h8v-8h-8zM686 564h8v-8h-8zM696 564h8v-8h-8zM706 564h8v-8h-8zM716 564h8v-8h-8zM726 564h8v-8h-8zM736 564h8v-8h-8zM746 564h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M846 564h8v-8h-8zM856 564h8v-8h-8z"
        aria-label="Angola"
        data-tip="Angola"
        data-country="angola"
      />
      <path
        d="M866 564h8v-8h-8z"
        aria-label="Democratic Republic of Congo"
        data-tip="Democratic Republic of Congo"
        data-country="democratic-republic-of-congo"
      />
      <path
        d="M876 564h8v-8h-8zM886 564h8v-8h-8z"
        aria-label="Tanzania"
        data-tip="Tanzania"
        data-country="tanzania"
      />
      <path
        d="M1026 564h8v-8h-8zM1036 564h8v-8h-8zM1086 564h8v-8h-8z"
        aria-label="Indonesia"
        data-tip="Indonesia"
        data-country="indonesia"
      />
      <path
        d="M676 574h8v-8h-8z"
        aria-label="Peru"
        data-tip="Peru"
        data-country="peru"
      />
      <path
        d="M686 574h8v-8h-8z"
        aria-label="Bolivia"
        data-tip="Bolivia"
        data-country="bolivia"
      />
      <path
        d="M696 574h8v-8h-8zM706 574h8v-8h-8zM716 574h8v-8h-8zM726 574h8v-8h-8zM736 574h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M846 574h8v-8h-8zM856 574h8v-8h-8z"
        aria-label="Angola"
        data-tip="Angola"
        data-country="angola"
      />
      <path
        d="M866 574h8v-8h-8zM876 574h8v-8h-8z"
        aria-label="Zambia"
        data-tip="Zambia"
        data-country="zambia"
      />
      <path
        d="M886 574h8v-8h-8z"
        aria-label="Mozambique"
        data-tip="Mozambique"
        data-country="mozambique"
      />
      <path
        d="M1076 574h8v-8h-8z"
        aria-label="Australia"
        data-tip="Australia"
        data-country="australia"
      />
      <path
        d="M686 584h8v-8h-8zM696 584h8v-8h-8z"
        aria-label="Bolivia"
        data-tip="Bolivia"
        data-country="bolivia"
      />
      <path
        d="M706 584h8v-8h-8zM716 584h8v-8h-8zM726 584h8v-8h-8zM736 584h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M846 584h8v-8h-8zM856 584h8v-8h-8z"
        aria-label="Namibia"
        data-tip="Namibia"
        data-country="namibia"
      />
      <path
        d="M866 584h8v-8h-8zM876 584h8v-8h-8z"
        aria-label="Zimbabwe"
        data-tip="Zimbabwe"
        data-country="zimbabwe"
      />
      <path
        d="M886 584h8v-8h-8z"
        aria-label="Mozambique"
        data-tip="Mozambique"
        data-country="mozambique"
      />
      <path
        d="M906 584h8v-8h-8z"
        aria-label="Madagascar"
        data-tip="Madagascar"
        data-country="madagascar"
      />
      <path
        d="M926 594h8v-8h-8z"
        aria-label="Reunion"
        data-tip="Reunion"
        data-country="reunion"
      />
      <path
        d="M1056 584h8v-8h-8zM1066 584h8v-8h-8zM1076 584h8v-8h-8zM1086 584h8v-8h-8zM1096 584h8v-8h-8z"
        aria-label="Australia"
        data-tip="Australia"
        data-country="australia"
      />
      <path
        d="M686 594h8v-8h-8z"
        aria-label="Chile"
        data-tip="Chile"
        data-country="chile"
      />
      <path
        d="M696 594h8v-8h-8zM706 594h8v-8h-8z"
        aria-label="Paraguay"
        data-tip="Paraguay"
        data-country="paraguay"
      />
      <path
        d="M716 594h8v-8h-8zM726 594h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M846 594h8v-8h-8z"
        aria-label="Namibia"
        data-tip="Namibia"
        data-country="namibia"
      />
      <path
        d="M856 594h8v-8h-8zM866 594h8v-8h-8z"
        aria-label="Botswana"
        data-tip="Botswana"
        data-country="botswana"
      />
      <path
        d="M876 594h8v-8h-8z"
        aria-label="South Africa"
        data-tip="South Africa"
        data-country="south-africa"
      />
      <path
        d="M906 594h8v-8h-8z"
        aria-label="Madagascar"
        data-tip="Madagascar"
        data-country="madagascar"
      />
      <path
        d="M1036 594h8v-8h-8zM1046 594h8v-8h-8zM1056 594h8v-8h-8zM1066 594h8v-8h-8zM1076 594h8v-8h-8zM1086 594h8v-8h-8zM1096 594h8v-8h-8zM1106 594h8v-8h-8z"
        aria-label="Australia"
        data-tip="Australia"
        data-country="australia"
      />
      <path
        d="M686 604h8v-8h-8zM696 604h8v-8h-8z"
        aria-label="Argentina"
        data-tip="Argentina"
        data-country="argentina"
      />
      <path
        d="M706 604h8v-8h-8z"
        aria-label="Paraguay"
        data-tip="Paraguay"
        data-country="paraguay"
      />
      <path
        d="M716 604h8v-8h-8z"
        aria-label="Brazil"
        data-tip="Brazil"
        data-country="brazil"
      />
      <path
        d="M846 604h8v-8h-8z"
        aria-label="Namibia"
        data-tip="Namibia"
        data-country="namibia"
      />
      <path
        d="M856 604h8v-8h-8zM866 604h8v-8h-8zM876 604h8v-8h-8z"
        aria-label="South Africa"
        data-tip="South Africa"
        data-country="south-africa"
      />
      <path
        d="M1046 604h8v-8h-8zM1056 604h8v-8h-8zM1066 604h8v-8h-8zM1076 604h8v-8h-8zM1086 604h8v-8h-8zM1096 604h8v-8h-8zM1106 604h8v-8h-8z"
        aria-label="Australia"
        data-tip="Australia"
        data-country="australia"
      />
      <path
        d="M686 614h8v-8h-8zM696 614h8v-8h-8z"
        aria-label="Argentina"
        data-tip="Argentina"
        data-country="argentina"
      />
      <path
        d="M706 614h8v-8h-8z"
        aria-label="Uruguay"
        data-tip="Uruguay"
        data-country="uruguay"
      />
      <path
        d="M856 614h8v-8h-8zM866 614h8v-8h-8z"
        aria-label="South Africa"
        data-tip="South Africa"
        data-country="south-africa"
      />
      <path
        d="M1046 614h8v-8h-8zM1056 614h8v-8h-8zM1076 614h8v-8h-8zM1086 614h8v-8h-8zM1096 614h8v-8h-8zM1106 614h8v-8h-8z"
        aria-label="Australia"
        data-tip="Australia"
        data-country="australia"
      />
      <path
        d="M676 624h8v-8h-8z"
        aria-label="Chile"
        data-tip="Chile"
        data-country="chile"
      />
      <path
        d="M686 624h8v-8h-8zM696 624h8v-8h-8zM706 624h8v-8h-8z"
        aria-label="Argentina"
        data-tip="Argentina"
        data-country="argentina"
      />
      <path
        d="M1096 624h8v-8h-8zM1106 624h8v-8h-8z"
        aria-label="Australia"
        data-tip="Australia"
        data-country="australia"
      />
      <path
        d="M1156 624h8v-8h-8z"
        aria-label="New Zealand"
        data-tip="New Zealand"
        data-country="new-zealand"
      />
      <path
        d="M676 634h8v-8h-8z"
        aria-label="Chile"
        data-tip="Chile"
        data-country="chile"
      />
      <path
        d="M686 634h8v-8h-8zM696 634h8v-8h-8z"
        aria-label="Argentina"
        data-tip="Argentina"
        data-country="argentina"
      />
      <path
        d="M1096 634h8v-8h-8z"
        aria-label="Australia"
        data-tip="Australia"
        data-country="australia"
      />
      <path
        d="M1156 634h8v-8h-8z"
        aria-label="New Zealand"
        data-tip="New Zealand"
        data-country="new-zealand"
      />
      <path
        d="M676 644h8v-8h-8z"
        aria-label="Chile"
        data-tip="Chile"
        data-country="chile"
      />
      <path
        d="M686 644h8v-8h-8z"
        aria-label="Argentina"
        data-tip="Argentina"
        data-country="argentina"
      />
      <path
        d="M1146 644h8v-8h-8z"
        aria-label="New Zealand"
        data-tip="New Zealand"
        data-country="new-zealand"
      />
      <path
        d="M676 654h8v-8h-8z"
        aria-label="Chile"
        data-tip="Chile"
        data-country="chile"
      />
      <path
        d="M686 654h8v-8h-8z"
        aria-label="Argentina"
        data-tip="Argentina"
        data-country="argentina"
      />
      <path
        d="M676 664h8v-8h-8zM676 674h8v-8h-8z"
        aria-label="Chile"
        data-tip="Chile"
        data-country="chile"
      />
      <path
        d="M686 674h8v-8h-8z"
        aria-label="Argentina"
        data-tip="Argentina"
        data-country="argentina"
      />
    </View>
  )
}

export const AnimationTravel = () => {
  const data = useStaticQuery(graphql`
    query WorldAnimatedQueryQuery {
      countries: allGoogleDocs {
        distinct(field: country)
      }
      regions: allGoogleDocs {
        distinct(field: region)
      }
    }
  `)

  const countries = useMemo(
    () => [...data.countries.distinct, ...data.regions.distinct],
    [data]
  )
  const getRandomCountry = useCallback(
    () => countries[Math.floor(Math.random() * countries.length)],
    [countries]
  )
  const [country, setCountry] = useState(getRandomCountry())
  useEffect(() => {
    let id = setInterval(() => {
      setCountry(getRandomCountry())
    }, 500)
    return () => clearInterval(id)
  }, [getRandomCountry])

  return <World selectedCountries={[country]} />
}
