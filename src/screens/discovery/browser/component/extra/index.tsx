/*
 * @Author: czy0729
 * @Date: 2021-01-03 04:41:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:59:21
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconLayout } from '@_'
import { ob } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { ViewStyle } from '@types'
import { StoreType } from '../../types'
import { COMPONENT } from './ds'

let isList: boolean

function Extra({ $, style }: { $: StoreType; style?: ViewStyle }) {
  // 缓存最近一次的isList
  if ($) isList = $?.isList

  // 有state或者有缓存都显示icon
  const showLayoutIcon = isList !== undefined || $?.isList !== undefined
  if (!showLayoutIcon) return null

  // 显示的icon类型
  const currenIsList = $?.isList === undefined ? isList : $?.isList
  return (
    <IconLayout style={style} list={currenIsList} onPress={$?.switchLayout || FROZEN_FN}>
      <Heatmap right={30} id='索引.切换布局' />
    </IconLayout>
  )
}

export default ob(Extra, COMPONENT)
