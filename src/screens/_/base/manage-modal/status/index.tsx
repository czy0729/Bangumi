/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 20:58:38
 */
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { feedback } from '@utils'
import { StatusBtnGroup } from '../../status-btn-group'
import { AUTO_COMPLETE } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Status({ status, action, onSelect }: Props) {
  const config = AUTO_COMPLETE[action]
  const enabled = config && systemStore.setting[config.key]
  const showSetting = status === 'collect'

  /** 设置行透明度, 常驻占位使高度恒定, 仅做淡入淡出 */
  const opacity = useSharedValue(showSetting ? 1 : 0)

  useEffect(() => {
    opacity.value = withTiming(showSetting ? 1 : 0, {
      duration: 200
    })
  }, [opacity, showSetting])

  const settingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value * (enabled ? 1 : 0.5)
  }))

  return (
    <>
      <StatusBtnGroup style={_.mt.md} value={status} action={action} onSelect={onSelect} />

      {config && (
        <Animated.View
          style={[styles.setting, settingAnimatedStyle]}
          pointerEvents={showSetting ? 'auto' : 'none'}
        >
          <Touchable
            withoutFeedback
            onPress={() => {
              systemStore.switchSetting(config.key)
              feedback(true)
            }}
          >
            <Flex>
              <Text type='sub' size={11} bold>
                {config.label}
              </Text>
              <Iconfont
                style={_.ml.xs}
                name={enabled ? 'md-radio-button-on' : 'md-radio-button-off'}
                color={_.colorSub}
                size={13}
              />
            </Flex>
          </Touchable>
        </Animated.View>
      )}
    </>
  )
}

export default observer(Status)
