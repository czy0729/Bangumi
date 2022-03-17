/*
 * @Author: czy0729
 * @Date: 2022-01-05 04:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:43:44
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { IconLayout, IconHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

let isList

function Extra({ $, title = 'Anime' }) {
  // 缓存最近一次的isList
  if ($) isList = $?.isList

  // 有state或者有缓存都显示icon
  const showLayoutIcon = isList !== undefined || $?.isList !== undefined

  // 显示的icon类型
  const currenIsList = $?.isList === undefined ? isList : $?.isList
  return (
    <Flex style={_.mr.xs}>
      {showLayoutIcon && (
        <IconLayout
          style={_.mr.xs}
          list={currenIsList}
          onPress={$?.switchLayout || Function.prototype}
        >
          <Heatmap right={30} id={`${title}.切换布局`} />
        </IconLayout>
      )}
      <IconHeader
        name='md-vertical-align-top'
        onPress={$?.scrollToTop || Function.prototype}
      >
        <Heatmap id={`${title}.到顶`} />
      </IconHeader>
    </Flex>
  )
}

export default ob(Extra)
