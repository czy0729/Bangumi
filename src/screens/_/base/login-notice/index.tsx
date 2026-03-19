/*
 * @Author: czy0729
 * @Date: 2022-06-25 02:49:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:09:07
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { Flex, Link, Text } from '@components'
import { _, userStore } from '@stores'
import { r } from '@utils/dev'
import { IOS, WEB } from '@constants'
import i18n from '@constants/i18n'
import { IconTouchable } from '../../icon/touchable'
import { BlurView } from '../blur-view'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

/** 重新登录轻提示 */
export const LoginNotice = observer(() => {
  r(COMPONENT)

  const { bottom } = useSafeAreaInsets()
  const [show, setShow] = useState(true)

  // 若主站 502 优先级会比此显示要高
  if (userStore.websiteError || !userStore.outdate || !show) return null

  const styles = memoStyles()

  const isBlur = IOS || WEB
  const Component = isBlur ? BlurView : View
  const passProps = !isBlur
    ? {
        style: {
          backgroundColor: _.colorMainLight
        }
      }
    : undefined

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
            <Link style={styles.touch} path='LoginV2'>
              <Text type='sub' size={12} bold>
                检测到授权信息过期，点击{i18n.login()}，或者下拉刷新试试
              </Text>
            </Link>
          </Flex.Item>

          <IconTouchable style={_.ml.sm} name='md-close' size={18} onPress={() => setShow(false)} />
        </Flex>
      </Component>
    </View>
  )
})

export default LoginNotice
