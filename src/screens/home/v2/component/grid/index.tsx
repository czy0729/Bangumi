/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:19:01
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { _, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { IOS, PAD } from '@constants'
import { H_TABBAR } from '../../ds'
import Layout from './layout'
import Linear from './linear'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx, TabsLabel } from '../../types'
import type { Props } from './types'

const RENDERED = new Map<TabsLabel, true>()

function Grid({ title = '全部' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  if ($.tabsLabel === title) RENDERED.set(title, true)
  if ($.tabsLabel !== title && !RENDERED.has(title)) return null

  if (!$.collection._loaded) return <Loading />

  const styles = memoStyles()

  const basePadding = headerHeight + ($.tabs.length <= 1 ? _.sm : H_TABBAR)
  const iosPadAdjustment = IOS && PAD ? statusBarHeight : 0
  const paddingTop = basePadding + iosPadAdjustment

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop
        }
      ]}
    >
      <Layout title={title} />
      <View>
        <Linear />
        <List title={title} />
      </View>
    </View>
  )
}

export default observer(Grid)
