/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:57:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 20:58:04
 */
import React from 'react'
import { ItemSetting } from '@_'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** 特色功能 */
function Tips({ navigation, filter }) {
  return useObserver(() => (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      {...TEXTS.tips}
      onPress={() => {
        navigation.push('Tips')
      }}
    />
  ))
}

export default Tips
