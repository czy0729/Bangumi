/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:53:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:18:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../../types'

/** 赞助者 */
function Sponsor({ navigation, filter }: WithNavigation<WithFilterProps>) {
  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      {...TEXTS.advance}
      onPress={() => {
        navigation.push('Sponsor')

        t('设置.跳转', {
          to: 'Sponsor'
        })
      }}
    >
      <Heatmap id='设置.跳转' to='Sponsor' alias='赞助者' />
    </ItemSetting>
  )
}

export default observer(Sponsor)
