/*
 * @Author: czy0729
 * @Date: 2024-04-25 03:42:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 03:44:03
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import styles from '../../../styles'
import { TEXTS, VALUES_2 } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 自定义放送时间块 */
function ShowCustomOnair({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('showCustomOnair')

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
              title: '条目.自定义放送时间块',
              label
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661209627915-8d0fe927-8c1e-4849-9993-d87df4ea5e6d.png',
        '0/2022/png/386799/1661209631943-1d4861c5-396f-4641-9b72-c88148e2cafd.png'
      ])}
      {...TEXTS.showCustomOnair}
      information={`收藏状态为在看的动画，章节的右下方，${i18n.initial()}值为线上放送时间，手动更改后首页收藏排序以此为准`}
    >
      <Heatmap id='设置.切换' title='条目.自定义放送时间块' />
    </ItemSetting>
  ))
}

export default ShowCustomOnair
