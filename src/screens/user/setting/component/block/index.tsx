/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:30:00
 */
import React, { Children } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { HairlineContext } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import Tip from '../tip'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Block({ style, title, tip, onBlockRef, children, ...other }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  /** 过滤掉搜索未命中的项 (组件自身返回 null 占位) */
  const items = Children.toArray(children)

  /** 全部未命中时, 分组标题与卡片一起不渲染, 避免出现空卡片 */
  if (!items.length) return null

  /**
   * 行间细线由 ITEM 行自身绘制 (见 ItemSetting), 卡片负责裁掉最顶部的一条
   *  - 行被隐藏时细线随之消失, 不需要容器去数可见项
   *  - 旧用法 (分组标题 Tip 放在卡片内) 不做细线
   * */
  const firstType = React.isValidElement(items[0]) ? (items[0] as { type?: unknown }).type : null
  const divided = firstType !== Tip

  return (
    <>
      {!!tip && <Tip>{tip}</Tip>}
      <View
        ref={title && onBlockRef ? ref => onBlockRef(ref, title) : undefined}
        style={stl(styles.block, style)}
        {...other}
      >
        <HairlineContext.Provider value={divided}>
          <View style={styles.content}>{items}</View>
        </HairlineContext.Provider>
      </View>
    </>
  )
}

export default observer(Block)
