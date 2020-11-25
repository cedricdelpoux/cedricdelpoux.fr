import React from "react"

import {AnimationSport} from "../components/animation-sport"
import {Button} from "../components/button"
import {Flag} from "../components/flag"
import {LayoutPage} from "../layouts/page"
import {Link} from "../components/link"
import {View} from "../components/view"

export default () => {
  return (
    <LayoutPage title="404" css={{alignItems: "center"}}>
      <View css={{height: 200}}>
        <AnimationSport />
      </View>
      <View css={{flexDirection: "row", gap: 2}}>
        <Button as={Link} to="/">
          <Flag country="france" css={{width: "30px"}} />
        </Button>
        <Button as={Link} to="/en">
          <Flag country="united-kingdom" css={{width: "30px"}} />
        </Button>
      </View>
    </LayoutPage>
  )
}
