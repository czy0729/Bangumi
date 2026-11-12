/*
 * @Author: czy0729
 * @Date: 2026-11-13 15:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 15:20:00
 *
 * 已选条件: 与筛选组同构的横向滚动行, 点击标签移除该条件
 */
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { HIT_SLOP } from '../ds'
import { memoStyles as memoRowStyles } from '../styles'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../types'
import type { Props } from './types'

function Selected({ items, eventId, onReset }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)
  const styles = memoStyles()
  const rowStyles = memoRowStyles()

  return (
    <Flex style={stl(rowStyles.row, styles.selected)} align='center'>
      <Text size={12} bold noWrap>
        已选
      </Text>
      <Touchable style={styles.selectedReset} hitSlop={HIT_SLOP} onPress={onReset}>
        <Text type='sub' size={11} bold noWrap>
          重置 {items.length}
        </Text>
      </Touchable>
      <Flex.Item style={_.ml.sm}>
        <ScrollView horizontal style={rowStyles.contentContainerStyle} {...SCROLL_VIEW_RESET_PROPS}>
          <Flex align='center'>
            {items.map(item => (
              <Touchable
                key={`${item.type}|${item.value}`}
                style={styles.selectedTag}
                hitSlop={HIT_SLOP}
                onPress={() => {
                  if (typeof $?.onSelect !== 'function') return
                  if (item.multiple) $.onSelect(item.type, item.value, true)
                  else $.onSelect(item.type, '')
                }}
              >
                <Flex align='center'>
                  <Text style={styles.selectedTagText} size={11} bold noWrap>
                    {String(item.value)}
                  </Text>
                  <Iconfont style={_.ml.xs} name='md-close' size={11} color={_.colorMain} />
                </Flex>
                <Heatmap right={-1} id={eventId} value={String(item.value)} mini />
              </Touchable>
            ))}
          </Flex>
        </ScrollView>
      </Flex.Item>
    </Flex>
  )
}

export default observer(Selected)
