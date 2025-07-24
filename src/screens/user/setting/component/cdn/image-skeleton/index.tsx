/*
 * @Author: czy0729
 * @Date: 2024-04-21 01:06:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:52
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Skeleton } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { memoStyles } from './styles'

/** 图片加载动画 */
function ImageSkeleton({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('imageSkeleton')
  const { title } = TEXTS.imageSkeleton.setting

  return useObserver(() => {
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
  })
}

export default ImageSkeleton
