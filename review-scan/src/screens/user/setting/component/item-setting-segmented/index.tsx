/*
 * @Author: czy0729
 * @Date: 2025-04-11 16:32:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 19:09:31
 */
import React, { useCallback, useMemo } from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../styles'
import { useAsyncSetSetting } from '../../hooks'
import { getYuqueThumbs } from '../../utils'
import { Props } from './types'

function ItemSettingSegmented({
  setting,
  values,
  filter = '',
  thumb,
  hd = '',
  information = ''
}: Props) {
  const memoValues: string[] = useMemo(
    () => values.map((item: { label: any }) => item.label),
    [values]
  )

  return useObserver(() => {
    const { value, handleSet } = useAsyncSetSetting(setting)
    const handleSyncPress = useCallback(
      (label: string) => {
        const find = values.find(item => item.label === label)
        if (!find) return

        handleSet(find.value)

        t('设置.切换', {
          title: hd,
          label
        })
      },
      [handleSet]
    )

    return (
      <ItemSetting
        hd={hd}
        information={information}
        ft={
          <SegmentedControl
            style={commonStyles.segmentedControl}
            values={memoValues}
            size={12}
            selectedIndex={values.findIndex(item => item.value === value)}
            onValueChange={handleSyncPress}
          />
        }
        filter={filter}
        thumb={thumb ? getYuqueThumbs(thumb) : undefined}
      >
        <Heatmap id='设置.切换' title={hd} />
      </ItemSetting>
    )
  })
}

export default ItemSettingSegmented
