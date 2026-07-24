/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:46:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:17:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { APP_ID_SAY_DEVELOP } from '@constants'
import { TEXTS } from '../ds'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../../types'

/** 反馈 */
function Feedback({ navigation, filter }: WithNavigation<WithFilterProps>) {
  return (
    <ItemSetting
      arrow
      filter={filter}
      highlight
      onPress={() => {
        navigation.push('Say', {
          sayId: APP_ID_SAY_DEVELOP
        })

        t('设置.跳转', {
          to: 'Say'
        })
      }}
      {...TEXTS.say}
    >
      <Heatmap id='设置.跳转' to='Say' alias='吐槽' />
    </ItemSetting>
  )
}

export default observer(Feedback)
