/*
 * @Author: czy0729
 * @Date: 2026-07-19 05:54:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-20 00:08:20
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { SETTING_HOME_ANIME_INFO_INLINE } from '@constants'
import styles from '../../../styles'
import { HOME_ANIME_INFO_INLINE_VALUES, TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

import type { WithFilterProps } from '../../../types'

/** 放送及额外信息 */
function HomeAnimeInfoInline({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('homeAnimeInfoInline')

  const elFt = useMemo(
    () => (
      <SegmentedControl
        style={styles.segmentedControl}
        size={12}
        values={HOME_ANIME_INFO_INLINE_VALUES}
        selectedIndex={Number(value)}
        onValueChange={label => {
          handleSet(SETTING_HOME_ANIME_INFO_INLINE.find(item => item.label === label).value)

          t('设置.切换', {
            title: TEXTS.homeAnimeInfoInline.hd,
            label
          })
        }}
      />
    ),
    [handleSet, value]
  )

  return (
    <ItemSetting
      ft={elFt}
      filter={filter}
      sub
      thumb={getYuqueThumbs([
        '0/2026/png/386799/1784477040441-3674ff5d-c3e4-4e13-956f-8122559902b0.png',
        '0/2026/png/386799/1784477054824-f0b20515-28b5-431c-aff0-68809688bd6c.png',
        '0/2026/png/386799/1784477062639-b33f4d14-26f0-4c07-8268-87efc61454a1.png'
      ])}
      {...TEXTS.homeAnimeInfoInline}
    >
      <Heatmap id='设置.切换' title={TEXTS.homeAnimeInfoInline.hd} />
    </ItemSetting>
  )
}

export default observer(HomeAnimeInfoInline)
