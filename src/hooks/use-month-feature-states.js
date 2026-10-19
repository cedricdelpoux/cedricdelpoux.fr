import {useContext, useEffect, useRef} from "react"
import {MapContext} from "@urbica/react-map-gl"

// A feature state is only a paint change, the map worker doesn't rebuild its
// tiles. Only the months between the previous one and the new one change.
export const useMonthFeatureStates = (source, idsByMonth, month, getState) => {
  const map = useContext(MapContext)
  const applied = useRef(null)

  useEffect(() => {
    if (!map || !idsByMonth || !map.getSource(source)) return

    const isUpdate = applied.current?.idsByMonth === idsByMonth
    const from = isUpdate ? Math.min(applied.current.month, month) : 0
    const to = isUpdate
      ? Math.max(applied.current.month, month)
      : idsByMonth.length - 1

    for (let index = from; index <= to; index++) {
      idsByMonth[index].forEach((id) =>
        map.setFeatureState({source, id}, getState(id, month))
      )
    }

    applied.current = {idsByMonth, month}
  }, [map, source, idsByMonth, month, getState])
}
