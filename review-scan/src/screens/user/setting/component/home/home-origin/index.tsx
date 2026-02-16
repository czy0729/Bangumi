/*
 * @Author: czy0729
 * @Date: 2024-04-24 10:47:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 10:52:43
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { TEXTS, VALUES } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 收藏项右侧菜单 */
function HomeOrigin({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('homeOrigin')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={VALUES}
          selectedIndex={value === -1 ? 2 : value ? 0 : 1}
          onValueChange={label => {
            handleSet(label === VALUES[0] ? true : label === VALUES[1] ? false : -1)

            t('设置.切换', {
              title: '显示搜索源头按钮',
              checked: value !== false
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661061347638-6ba991c5-b296-43e6-8d95-2b3c9da920ab.png',
        '0/2022/png/386799/1661061354378-cc1ece33-5a8c-419c-8e05-8559106ffb9d.png',
        '0/2022/png/386799/1661060959608-f312593f-5512-4b75-9060-c9b0071ed6ce.png'
      ])}
      {...TEXTS.homeOrigin}
    >
      <Heatmap id='设置.切换' title='显示搜索源头按钮' />
    </ItemSetting>
  ))
}

export default HomeOrigin
