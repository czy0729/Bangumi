/*
 * @Author: czy0729
 * @Date: 2024-04-21 01:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 05:40:49
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Skeleton } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { memoStyles } from './styles'

import type { WithFilterProps } from '../../../types'

/** 图片加载动画 */
function ImageSkeleton({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('imageSkeleton')

  const { title } = TEXTS.imageSkeleton.setting

  const styles = memoStyles()

  const genItemProps = (bool: boolean) => ({
    title: bool ? '开启' : '关闭',
    active: bool === value,
    filter,
    onPress: () => {
      if (bool === value) return

      handleSwitch()

      t('设置.切换', {
        title,
        checked: bool
      })
    }
  })

  return (
    <ItemSettingBlock style={_.mt.sm} filter={filter} {...TEXTS.imageSkeleton.setting}>
      <ItemSettingBlock.Item {...genItemProps(true)}>
        <Flex style={styles.container} justify='center'>
          <View style={styles.content}>
            <Skeleton width={styles.content.width} height={styles.content.height} />
          </View>
        </Flex>
      </ItemSettingBlock.Item>

      <ItemSettingBlock.Item style={_.ml.md} {...genItemProps(false)}>
        <Flex style={styles.container} justify='center'>
          <View style={[styles.content, styles.placeholder]} />
        </Flex>
      </ItemSettingBlock.Item>

      <Heatmap id='设置.切换' title={title} />
    </ItemSettingBlock>
  )
}

export default observer(ImageSkeleton)
