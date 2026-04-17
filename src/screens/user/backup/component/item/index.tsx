/*
 * @Author: czy0729
 * @Date: 2022-12-08 11:03:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:32:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

export default observer(({ item }) => {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      item={item}
      upload={$.upload(item.subject?.id)}
      onBottom={$.onBottom}
      onSubmit={$.onSubmit}
    />
  )
})
