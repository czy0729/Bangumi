/*
 * @Author: czy0729
 * @Date: 2022-01-05 04:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-22 20:43:11
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { IconHeader, IconLayout } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { COMPONENT } from './ds'
import { Props } from './types'

let isList: any

function Extra({ $, title = 'Anime' }: Props) {
  // 缓存最近一次的 isList
  if ($) isList = $?.isList

  // 有 state 或者有缓存都显示 icon
  const showLayoutIcon = isList !== undefined || $?.isList !== undefined

  // 显示的 icon 类型
  const currenIsList = $?.isList === undefined ? isList : $?.isList

  return (
    <Flex>
      {showLayoutIcon && (
        <IconLayout style={_.mr.xs} list={currenIsList} onPress={$?.switchLayout || FROZEN_FN}>
          <Heatmap right={30} id={`${title}.切换布局`} />
        </IconLayout>
      )}
      <IconHeader name='md-vertical-align-top' onPress={$?.scrollToTop || FROZEN_FN}>
        <Heatmap id={`${title}.到顶`} />
      </IconHeader>
    </Flex>
  )
}

export default ob(Extra, COMPONENT)
