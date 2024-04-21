/*
 * @Author: czy0729
 * @Date: 2024-04-21 01:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-21 01:09:16
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 图片加载动画 */
function ImageSkeleton({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('imageSkeleton')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '图片加载动画',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.imageSkeleton}
    >
      <Heatmap id='设置.切换' title='图片加载动画' />
    </ItemSetting>
  ))
}

export default ImageSkeleton
