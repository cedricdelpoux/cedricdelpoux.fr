import React from "react"

import {View} from "../components/view"

const technologies = [
  {name: "Prettier", color: "56B3B4"},
  {name: "Netlify", color: "00AD9F"},
  {name: "React", color: "45b8d8"},
  {name: "CSS3", color: "264de4"},
  {name: "Gatsby", color: "663399"},
  {name: "GraphQL", color: "E10098"},
  {name: "Styled-components", color: "db7092"},
  {name: "Npm", color: "CB3837"},
  {name: "Git", color: "F1502F"},
  {name: "HTML5", color: "E34F26"},
  {name: "Babel", color: "f5da55", logoColor: "black"},
  {name: "Javascript", color: "F0DB4F", logoColor: "black"},
  {name: "Node.js", color: "43853d"},
]

export const Technologies = () => {
  return (
    <View
      css={{
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        flexWrap: "wrap",
        maxWidth: 500,
        ml: -1,
        mb: -1,
      }}
    >
      {technologies.map((technology) => (
        <View
          key={technology.name}
          as="img"
          alt={technology.name}
          title={technology.name}
          src={`https://img.shields.io/badge/-${technology.name.replace(
            "-",
            "_"
          )}-${technology.color}?style=flat-square&logo=${
            technology.name
          }&logoColor=${technology.logoColor || "white"}`}
          css={{display: "inline-flex", ml: 1, mb: 1}}
        />
      ))}
    </View>
  )
}
