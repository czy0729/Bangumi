/*
 * @Author: czy0729
 * @Date: 2024-02-03 19:51:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-29 22:25:50
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Flex, Text } from '@components'
import { _, systemStore, userStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ANDROID, IOS, WEB } from '@constants'
import { IconTouchable } from '../../icon/touchable'
import { BlurView } from '../blur-view'
import { COMPONENT, HIT_SLOP } from './ds'
import { memoStyles } from './styles'

/** 主站 502 轻提示 */
export const ErrorNotice = () => {
  r(COMPONENT)

  const { bottom } = useSafeAreaInsets()
  const [show, setShow] = useState(true)

  return useObserver(() => {
    if (!userStore.websiteError || !show) return null

    const styles = memoStyles()
    const isBlur = IOS || WEB || (ANDROID && systemStore.setting.androidBlur)
    const Component = isBlur ? BlurView : View
    const passProps: any = {}
    if (!isBlur) {
      passProps.style = {
        backgroundColor: _.colorMainLight
      }
    }

    return (
      <View
        style={[
          styles.errorNotice,
          {
            bottom: _.tabBarHeight + _.ios(0, bottom)
          }
        ]}
      >
        <Component {...passProps}>
          <Flex style={styles.body}>
            <Flex.Item>
              <Text type='sub' size={12} bold>
                检测到主站通信错误 (bgm.tv | 502: Bad gateway)
              </Text>
            </Flex.Item>
            <IconTouchable
              style={_.ml.sm}
              name='md-close'
              size={18}
              hitSlop={HIT_SLOP}
              onPress={() => setShow(false)}
            />
          </Flex>
        </Component>
      </View>
    )
  })
}

export default ErrorNotice
