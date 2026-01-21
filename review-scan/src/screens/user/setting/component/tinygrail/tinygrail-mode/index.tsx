/*
 * @Author: czy0729
 * @Date: 2024-04-25 17:08:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 17:13:23
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { DS, TEXTS } from '../ds'
import { getYuqueThumbs } from '../../../utils'

/** 小圣杯涨跌色 */
function TinygrailMode({ filter }) {
  return useObserver(() => (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={DS}
          selectedIndex={_.isWeb ? 2 : _.isGreen ? 0 : 1}
          onValueChange={value => {
            if ((_.isGreen && value === DS[0]) || (!_.isGreen && value === DS[1])) {
              return
            }

            t('设置.切换', {
              title: '小圣杯涨跌色',
              label: _.isWeb ? '网页一致' : _.isGreen ? '红涨绿跌' : '绿涨红跌'
            })

            _.toggleTinygrailMode()
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661214673062-50a40076-90c3-499f-9ea6-bc4694a92f05.png',
        '0/2022/png/386799/1661214675966-24eb1061-9a89-4c72-8173-e3a3f3f16adb.png'
      ])}
      {...TEXTS.tinygrailMode}
    >
      <Heatmap id='设置.切换' title='小圣杯涨跌色' />
    </ItemSetting>
  ))
}

export default TinygrailMode
