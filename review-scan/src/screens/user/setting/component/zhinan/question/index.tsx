/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:12:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 05:13:16
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { URL_WENJUAN } from '@constants'
import { TEXTS } from '../ds'

/** 开发计划问卷 */
function Question({ filter }) {
  return useObserver(() => (
    <ItemSetting
      style={_.mt.xs}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        t('设置.跳转', {
          title: '开发计划',
          to: 'Jihua'
        })

        open(URL_WENJUAN)
      }}
      {...TEXTS.jihua}
    >
      <Heatmap id='设置.跳转' to='Jihua' alias='开发计划' />
    </ItemSetting>
  ))
}

export default Question
