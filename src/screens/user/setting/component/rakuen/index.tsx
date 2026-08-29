/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 20:22:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 超展开 */
function Rakuen({ filter }: WithFilterProps) {
  const navigation = useNavigation(COMPONENT)

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
