/*
 * @Author: czy0729
 * @Date: 2021-01-03 04:41:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 08:26:16
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconLayout } from '@_'
import { ob } from '@utils/decorators'

let isList

function Extra({ $, style }) {
  // 缓存最近一次的isList
  if ($) isList = $?.isList

  // 有state或者有缓存都显示icon
  const showLayoutIcon = isList !== undefined || $?.isList !== undefined
  if (!showLayoutIcon) return null

  // 显示的icon类型
  const currenIsList = $?.isList === undefined ? isList : $?.isList
  return (
    <IconLayout
      style={style}
      list={currenIsList}
      onPress={$?.switchLayout || Function.prototype}
    >
      <Heatmap right={30} id='索引.切换布局' />
    </IconLayout>
  )
}

export default ob(Extra)
