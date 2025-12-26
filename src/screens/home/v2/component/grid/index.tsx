/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:35:15
 */
import React from 'react'
import { View } from 'react-native'
import { Loading } from '@components'
import { _, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
import { IOS, PAD } from '@constants'
import { H_TABBAR } from '../../ds'
import Info from './layout'
import Linear from './linear'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

const RENDERED = {}

function Grid({ title = '全部' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  return useObserver(() => {
    if ($.tabsLabel === title) RENDERED[title] = true
    if ($.tabsLabel !== title && !RENDERED[title]) return null
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
        <Info title={title} />
        <View>
          <Linear />
          <List title={title} />
        </View>
      </View>
    )
  })
}

export default Grid
