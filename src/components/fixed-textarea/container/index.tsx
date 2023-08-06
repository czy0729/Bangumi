/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:19:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 19:25:50
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IOS } from '@constants'
import { BlurView } from '../../@/ant-design/modal/blur-view'
import { memoStyles } from './styles'

function Container({ children }) {
  const styles = memoStyles()
  const { bottom } = useSafeAreaInsets()
  if (IOS) return <BlurView style={styles.container}>{children}</BlurView>

  return (
    <View
      style={[
        styles.container,
        styles.plain,
        {
          paddingBottom: bottom
        }
      ]}
    >
      {children}
    </View>
  )
}

export default observer(Container)
