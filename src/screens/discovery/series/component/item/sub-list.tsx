/*
 * @Author: czy0729
 * @Date: 2026-10-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 00:00:00
 *
 * 系列组子条目: 超出阈值折叠
 */
import { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import Subject from '../subject'
import { COMPONENT as PARENT, SUB_ITEM_MAX } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { SubListProps } from './types'

const COMPONENT = rc(PARENT, 'SubList')

function SubList({ id, index, sub }: SubListProps) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const moreRef = useRef<View>(null)

  /** 收起前的按钮位置, 用于收起后补偿滚动 */
  const collapseY = useRef(0)

  const expanded = $.state.expand.includes(id)
  const visible = expanded ? sub : sub.slice(0, SUB_ITEM_MAX)
  const rest = sub.length - SUB_ITEM_MAX

  useEffect(() => {
    // 收起后按钮随内容上移, 用位置差值把列表滚回去
    if (!collapseY.current) return

    requestAnimationFrame(() => {
      const before = collapseY.current
      collapseY.current = 0
      moreRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
        $.scrollBy(pageY - before)
      })
    })
  }, [expanded, $])

  const handlePress = () => {
    if (!expanded) {
      $.onExpand(id)
      return
    }

    moreRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      collapseY.current = pageY
      $.onExpand(id)
    })
  }

  return (
    <View style={styles.sub}>
      {visible.map((item, idx) => (
        <Subject
          key={item}
          style={styles.subItem}
          id={item}
          small
          section={index}
          index={idx + 1}
        />
      ))}
      {rest > 0 && (
        <View ref={moreRef} collapsable={false} style={styles.more}>
          <Touchable onPress={handlePress}>
            <Text type='main' size={12} bold>
              {expanded ? '收起' : `查看更多 (${rest})`}
            </Text>
          </Touchable>
        </View>
      )}
    </View>
  )
}

export default observer(SubList)
