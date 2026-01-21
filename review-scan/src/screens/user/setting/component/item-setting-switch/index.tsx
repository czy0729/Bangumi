/*
 * @Author: czy0729
 * @Date: 2025-04-11 16:32:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 17:28:00
 */
import React, { useCallback } from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../styles'
import { useAsyncSwitchSetting } from '../../hooks'
import { getYuqueThumbs } from '../../utils'
import { Props } from './types'

function ItemSettingSwitch({
  setting,
  filter = '',
  thumb,
  hd = '',
  information = '',
  reverse = false
}: Props) {
  return useObserver(() => {
    const { value, handleSwitch } = useAsyncSwitchSetting(setting)
    const current = reverse ? !value : value
    const handleSyncPress = useCallback(() => {
      handleSwitch()

      t('设置.切换', {
        title: hd,
        checked: !current
      })
    }, [current, handleSwitch])

    return (
      <ItemSetting
        hd={hd}
        information={information}
        ft={<SwitchPro style={commonStyles.switch} value={current} onSyncPress={handleSyncPress} />}
        filter={filter}
        thumb={thumb ? getYuqueThumbs(thumb) : undefined}
      >
        <Heatmap id='设置.切换' title={hd} />
      </ItemSetting>
    )
  })
}

export default ItemSettingSwitch
