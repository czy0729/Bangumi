/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:55:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:21:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { TEXTS } from '../ds'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../../types'

/** 更新内容 */
function Versions({ navigation, filter }: WithNavigation<WithFilterProps>) {
  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      {...TEXTS.versions}
      onPress={() => {
        navigation.push('Versions')
      }}
    />
  )
}

export default observer(Versions)
