/*
 * @Author: czy0729
 * @Date: 2024-04-20 22:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:49
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 图片渐出动画 */
function ImageFadeIn() {
  const { value, handleSwitch } = useAsyncSwitchSetting('imageFadeIn')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '图片渐出动画',
              checked: !value
            })
          }}
        />
      }
      {...TEXTS.imageFadeIn}
    >
      <Heatmap id='设置.切换' title='图片渐出动画' />
    </ItemSetting>
  ))
}

export default ImageFadeIn
