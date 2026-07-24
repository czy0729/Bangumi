/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:24:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../types'

/** 超展开 */
function Rakuen({ navigation, filter }: WithNavigation<WithFilterProps>) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)
  if (!shows) return null

  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        navigation.push('RakuenSetting')

        t('设置.跳转', {
          title: '超展开',
          to: 'RakuenSetting'
        })
      }}
      {...TEXTS.rakuen}
    >
      <Heatmap id='设置.跳转' to='RakuenSetting' alias='超展开设置' />
    </ItemSetting>
  )
}

export default observer(Rakuen)
