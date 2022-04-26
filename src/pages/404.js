import React from "react"

import {AnimationSport} from "../components/animation-sport"
import {Button} from "../components/button"
import {Link} from "../components/link"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"

const Page404 = () => {
  return (
    <LayoutPage title="404" css={{alignItems: "center"}}>
      <View css={{height: 200}}>
        <AnimationSport />
      </View>
      <View css={{flexDirection: "row", gap: 2}}>
        <Button as={Link} to="/" flag="france" />
        <Button as={Link} to="/en" flag="united-kingdom" />
      </View>
    </LayoutPage>
  )
}

export default Page404
