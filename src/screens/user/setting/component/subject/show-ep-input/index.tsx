/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:49:16
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

/** 进度输入框 */
function ShowEpInput({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('showEpInput')

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
              title: '条目.进度输入框',
              label
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661209205559-20bb627c-a3bc-49ef-8ead-2e5b7e557ef3.png'
      ])}
      {...TEXTS.showEpInput}
    >
      <Heatmap id='设置.切换' title='条目.进度输入框' />
    </ItemSetting>
  ))
}

export default ShowEpInput
