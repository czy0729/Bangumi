/*
 * @Author: czy0729
 * @Date: 2025-12-11 01:56:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-13 05:49:17
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import Item from './item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { map } = $.state
  const { node, relate } = map

  const relateMap = useMemo(() => {
    const temp = {}
    relate.forEach(item => {
      if (item.src == $.subjectId) temp[item.dst] = item.relate
    })
    return temp
  }, [$.subjectId, relate])

  return (
    <ScrollView contentContainerStyle={_.container.bottom}>
      {node.map(item => (
        <Item key={item.id} item={item} relate={relateMap[item.id]} />
      ))}
    </ScrollView>
  )
}

export default observer(List)
