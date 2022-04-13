import React from "react"
import FlagAT from "wobblecode-flat-flags/images/png-47/AT.png"
import FlagBA from "wobblecode-flat-flags/images/png-47/BA.png"
import FlagES from "wobblecode-flat-flags/images/png-47/ES.png"
import FlagFR from "wobblecode-flat-flags/images/png-47/FR.png"
import FlagGB from "wobblecode-flat-flags/images/png-47/GB.png"
import FlagHR from "wobblecode-flat-flags/images/png-47/HR.png"
import FlagHU from "wobblecode-flat-flags/images/png-47/HU.png"
import FlagID from "wobblecode-flat-flags/images/png-47/ID.png"
import FlagIS from "wobblecode-flat-flags/images/png-47/IS.png"
import FlagIT from "wobblecode-flat-flags/images/png-47/IT.png"
import FlagJO from "wobblecode-flat-flags/images/png-47/JO.png"
import FlagNL from "wobblecode-flat-flags/images/png-47/NL.png"
import FlagNZ from "wobblecode-flat-flags/images/png-47/NZ.png"
import FlagPE from "wobblecode-flat-flags/images/png-47/PE.png"
import FlagSG from "wobblecode-flat-flags/images/png-47/SG.png"

import {View} from "./view"

const flags = {
  "new-zealand": FlagNZ,
  "united-kingdom": FlagGB,
  austria: FlagAT,
  bosnia: FlagBA,
  croatia: FlagHR,
  france: FlagFR,
  hungary: FlagHU,
  iceland: FlagIS,
  indonesia: FlagID,
  italy: FlagIT,
  jordan: FlagJO,
  netherlands: FlagNL,
  peru: FlagPE,
  singapore: FlagSG,
  spain: FlagES,
}

export const Flag = ({country, css, ...props}) =>
  flags[country] ? (
    <View css={css} {...props}>
      <View
        as="img"
        src={flags[country]}
        alt={`Flag ${country}`}
        css={{
          width: "100%",
          height: "auto",
        }}
      />
    </View>
  ) : null
