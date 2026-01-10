/*
 * @Author: czy0729
 * @Date: 2023-03-02 14:17:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:22
 */
import React from 'react'
import { ItemVoice } from '@_'
import { _ } from '@stores'
import { useNavigation, useObserver } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'

import type { MonoVoicesItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

function Item({ item, index }: RenderItem<MonoVoicesItem>) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => (
    <ItemVoice
      {...item}
      navigation={navigation}
      style={_.container.item}
      event={EVENT}
      index={index}
    />
  ))
}

export default Item
