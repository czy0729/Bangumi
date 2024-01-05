/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 08:23:13
 */
import React from 'react'
import { View } from 'react-native'
import { Loading } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Info from './info'
import Linear from './linear'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

const RENDERED = {}

function Grid({ title = '全部' }: Props, { $ }: Ctx) {
  if ($.tabsLabel === title) RENDERED[title] = true
  if ($.tabsLabel !== title && !RENDERED[title]) return null
  if (!$.collection._loaded) return <Loading />

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Info title={title} />
      <View>
        <Linear />
        <List title={title} />
      </View>
    </View>
  )
}

export default obc(Grid, COMPONENT)
