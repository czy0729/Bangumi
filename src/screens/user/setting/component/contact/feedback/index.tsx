/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:46:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 16:31:12
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { APP_ID_SAY_DEVELOP } from '@constants'
import { TEXTS } from '../ds'

/** 反馈 */
function Feedback({ navigation, filter }) {
  return useObserver(() => (
    <ItemSetting
      arrow
      filter={filter}
      highlight
      onPress={() => {
        t('设置.跳转', {
          to: 'Say'
        })

        navigation.push('Say', {
          sayId: APP_ID_SAY_DEVELOP
        })
      }}
      {...TEXTS.say}
    >
      <Heatmap id='设置.跳转' to='Say' alias='吐槽' />
    </ItemSetting>
  ))
}

export default Feedback
