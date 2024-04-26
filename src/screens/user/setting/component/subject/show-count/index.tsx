/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:45:04
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { TEXTS, VALUES_2 } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 其他用户收藏数量 */
function ShowCount({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('showCount')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={VALUES_2}
          selectedIndex={value ? 0 : 1}
          onValueChange={label => {
            handleSet(label === '显示')

            t('设置.切换', {
              title: '条目.其他用户收藏数量',
              label
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661209187428-25d8eb90-0a10-4ec6-9ac3-0e9512fd62d5.png'
      ])}
      {...TEXTS.showCount}
    >
      <Heatmap id='设置.切换' title='条目.其他用户收藏数量' />
    </ItemSetting>
  ))
}

export default ShowCount
