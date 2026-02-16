/*
 * @Author: czy0729
 * @Date: 2022-06-25 02:49:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-29 22:27:03
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Flex, Text, Touchable } from '@components'
import { _, systemStore, userStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ANDROID, IOS, WEB } from '@constants'
import i18n from '@constants/i18n'
import { IconTouchable } from '../../icon/touchable'
import { BlurView } from '../blur-view'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as LoginNoticeProps } from './types'

export { LoginNoticeProps }

/** 重新登录轻提示 */
export const LoginNotice = ({ navigation }: LoginNoticeProps) => {
  r(COMPONENT)

  const { bottom } = useSafeAreaInsets()
  const [show, setShow] = useState(true)

  return useObserver(() => {
    // 若主站 502 优先级会比此显示要高
    if (userStore.websiteError || !userStore.outdate || !show) return null

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
          styles.loginNotice,
          {
            bottom: _.tabBarHeight + _.ios(0, bottom)
          }
        ]}
      >
        <Component {...passProps}>
          <Flex style={styles.body}>
            <Flex.Item>
              <Touchable onPress={() => navigation.push('LoginV2')}>
                <Text type='sub' size={12} bold>
                  检测到授权信息过期，点击{i18n.login()}，或者重新冷启动试试
                </Text>
              </Touchable>
            </Flex.Item>
            <IconTouchable
              style={_.ml.sm}
              name='md-close'
              size={18}
              onPress={() => setShow(false)}
            />
          </Flex>
        </Component>
      </View>
    )
  })
}

export default LoginNotice
