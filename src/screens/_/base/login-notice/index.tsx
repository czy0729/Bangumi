/*
 * @Author: czy0729
 * @Date: 2022-06-25 02:49:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 01:15:03
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { userStore } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import i18n from '@constants/i18n'
import { BlurView } from '../blur-view'
import { memoStyles } from './styles'

export const LoginNotice = ob(({ navigation }) => {
  if (!userStore.outdate) return null

  const styles = memoStyles()
  return (
    <View style={styles.loginNotice}>
      {IOS && <BlurView style={styles.blurView} />}
      <Touchable onPress={() => navigation.push('LoginV2')}>
        <Flex style={styles.body}>
          <Text style={styles.text} type='sub' size={12} bold>
            检测到授权信息过期，点击{i18n.login()}，或者重新冷启动试试
          </Text>
        </Flex>
      </Touchable>
    </View>
  )
})
