/*
 * @Author: czy0729
 * @Date: 2025-03-22 20:12:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 20:17:02
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Notify() {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View style={styles.notify}>
        <Text size={12} lineHeight={14} type='sub'>
          隐私策略: 我们十分尊重您的隐私, 我们不会收集上述信息. (多次
          {i18n.login()}失败后可能一段时间内不能再次{i18n.login()})
        </Text>
      </View>
    )
  })
}

export default Notify
