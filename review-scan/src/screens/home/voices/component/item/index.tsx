/*
 * @Author: czy0729
 * @Date: 2023-03-02 14:17:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:22
 */
import React from 'react'
import { ItemVoice } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'

function Item({ item, index }) {
  const navigation = useNavigation()
  return (
    <ItemVoice
      style={_.container.item}
      navigation={navigation}
      event={EVENT}
      index={index}
      {...item}
    />
  )
}

export default ob(Item, COMPONENT)
