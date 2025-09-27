/*
 * @Author: czy0729
 * @Date: 2024-04-20 22:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:53
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** iOS 默认图片缓存策略 */
function IOSImageCache({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('iosImageCacheV2')

  return useObserver(() => (
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
  ))
}

export default IOSImageCache
