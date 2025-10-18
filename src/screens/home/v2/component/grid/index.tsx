/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 17:05:07
 */
import React from 'react'
import { View } from 'react-native'
import { Loading } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
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

  return useObserver(() => {
    if ($.tabsLabel === title) RENDERED[title] = true
    if ($.tabsLabel !== title && !RENDERED[title]) return null
    if (!$.collection._loaded) return <Loading />

    const styles = memoStyles()
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: $.listPaddingTop
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
