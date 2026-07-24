/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:12:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:53:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { URL_WENJUAN } from '@constants'
import { TEXTS } from '../ds'

import type { WithFilterProps } from '../../../types'

/** 开发计划问卷 */
function Question({ filter }: WithFilterProps) {
  return (
    <ItemSetting
      style={_.mt.xs}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        open(URL_WENJUAN)

        t('设置.跳转', {
          title: '开发计划',
          to: 'Jihua'
        })
      }}
      {...TEXTS.jihua}
    >
      <Heatmap id='设置.跳转' to='Jihua' alias='开发计划' />
    </ItemSetting>
  )
}

export default observer(Question)
