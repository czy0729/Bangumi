/*
 * @Author: czy0729
 * @Date: 2024-04-20 22:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 05:40:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

import type { WithFilterProps } from '../../../types'

/** iOS 默认图片缓存策略 */
function IOSImageCache({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('iosImageCacheV2')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '默认图片缓存策略',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.iOSImageCache}
    >
      <Heatmap id='设置.切换' title='默认图片缓存策略' />
    </ItemSetting>
  )
}

export default observer(IOSImageCache)
