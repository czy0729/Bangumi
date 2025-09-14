/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:55:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 20:56:45
 */
import React from 'react'
import { ItemSetting } from '@_'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** 更新内容 */
function Versions({ navigation, filter }) {
  return useObserver(() => (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      {...TEXTS.versions}
      onPress={() => {
        navigation.push('Versions')
      }}
    />
  ))
}

export default Versions
