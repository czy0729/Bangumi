/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-18 13:12:04
 */
import React from 'react'
import { View } from 'react-native'
import { Loading } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Info from './layout'
import Linear from './linear'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

const RENDERED = {}

function Grid({ title = '全部' }: Props) {
  const { $ } = useStore<Ctx>()

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
}

export default ob(Grid, COMPONENT)
