/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:57:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:55:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** 特色功能 */
function Tips({ navigation, filter, setFalse }: Props) {
  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      {...TEXTS.tips}
      onPress={() => {
        setFalse()

        setTimeout(() => {
          navigation.push('Tips')
        }, 160)
      }}
    />
  )
}

export default observer(Tips)
