/*
 * @Author: czy0729
 * @Date: 2022-06-25 02:49:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:29:03
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _, userStore } from '@stores'
import { r } from '@utils/dev'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import { IconTouchable } from '../../icon'
import { BlurView } from '../blur-view'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

/** 重新登录轻提示 */
export const LoginNotice = ({ navigation }: { navigation: Navigation }) => {
  r(COMPONENT)

  const { bottom } = useSafeAreaInsets()
  const [show, setShow] = useState(true)

  return useObserver(() => {
    if (!userStore.outdate || !show) return null

    const styles = memoStyles()
    return (
      <View
        style={[
          styles.loginNotice,
          {
            bottom: bottom + _.tabBarHeight
          }
        ]}
      >
        <BlurView>
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
        </BlurView>
      </View>
    )
  })
}
