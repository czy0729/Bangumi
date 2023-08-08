/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:19:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 16:33:14
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import { BlurView } from '../../@/ant-design/modal/blur-view'
import { SafeAreaBottom } from '../../safe-area-bottom'
import { memoStyles } from './styles'

function Container({ children }) {
  const styles = memoStyles()
  if (IOS) return <BlurView style={styles.container}>{children}</BlurView>

  return (
    <SafeAreaBottom style={[styles.container, styles.plain]} type='paddingBottom'>
      {children}
    </SafeAreaBottom>
  )
}

export default observer(Container)
