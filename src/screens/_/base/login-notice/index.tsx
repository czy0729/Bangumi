/*
 * @Author: czy0729
 * @Date: 2022-06-25 02:49:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-25 18:11:44
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { SafeAreaBottom, Touchable, Flex, Text } from '@components'
import { userStore } from '@stores'
import { IOS } from '@constants'
import i18n from '@constants/i18n'
import { BlurView } from '../blur-view'
import { memoStyles } from './styles'

export const LoginNotice = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets()

  return useObserver(() => {
    if (!userStore.outdate) return null

    const styles = memoStyles()
    const content = (
      <BlurView>
        <Touchable onPress={() => navigation.push('LoginV2')}>
          <Flex style={styles.body}>
            <Text style={styles.text} type='sub' size={12} bold>
              检测到授权信息过期，点击{i18n.login()}，或者重新冷启动试试
            </Text>
          </Flex>
        </Touchable>
      </BlurView>
    )

    // 安卓虚拟按键布局
    if (!IOS && bottom > 20) {
      return (
        <SafeAreaBottom style={styles.loginNotice} type='height'>
          {content}
        </SafeAreaBottom>
      )
    }

    return <View style={styles.loginNotice}>{content}</View>
  })
}
