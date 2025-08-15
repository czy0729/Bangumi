/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:53:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 20:54:22
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** 赞助者 */
function Sponsor({ navigation, filter }) {
  return useObserver(() => (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      {...TEXTS.advance}
      onPress={() => {
        t('设置.跳转', {
          to: 'Sponsor'
        })

        navigation.push('Sponsor')
      }}
    >
      <Heatmap id='设置.跳转' to='Sponsor' alias='赞助者' />
    </ItemSetting>
  ))
}

export default Sponsor
