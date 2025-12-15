/*
 * @Author: czy0729
 * @Date: 2025-12-14 17:39:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 16:39:33
 */
import React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '@components'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { H_OFFSET_BASE, H_OFFSET_STEP, LABEL_OFFSET_X, LINE_GAP_Y, LINE_HEIGHT } from '../ds'
import { HIT_SLOP } from './ds'
import { memoStyles } from './styles'

import type { NodeLayout, RelationEdge } from '../types'
import type { Props } from './types'

function Lines({ side, relations, layoutsRef, activeRelation, handleRelationPress }: Props) {
  return useObserver(() => {
    const styles = memoStyles()

    const computeWithHAndDY = (relations: RelationEdge[], side: 'left' | 'right') => {
      const posMap: Record<'top' | 'bottom', number> = { top: 0, bottom: 0 }

      // 映射 layout 信息
      const sorted = (
        relations
          .map(r => {
            const from = layoutsRef.current.get(Number(r.src))
            const to = layoutsRef.current.get(Number(r.dst))
            if (!from || !to) return null

            return {
              r,
              from,
              to,
              position: to.centerY < from.centerY ? 'top' : 'bottom'
            }
          })
          .filter(Boolean) as {
          r: RelationEdge
          from: NodeLayout
          to: NodeLayout
          position: 'top' | 'bottom'
        }[]
      )
        // 按视觉从上到下排序
        .sort((a, b) => a.to.centerY - b.to.centerY)

      // 再用视觉顺序的 i 去算 dy
      return sorted.map(({ r, from, to, position }, i) => {
        const offset = H_OFFSET_BASE + posMap[position]
        posMap[position] += H_OFFSET_STEP

        const dy = (i - (sorted.length - 1) / 2) * LINE_GAP_Y
        const hX = side === 'left' ? from.left - offset : from.right + offset

        return { r, from, to, hX, dy }
      })
    }

    const withH = computeWithHAndDY(relations, side)

    const getRelateChars = (r: RelationEdge) => {
      const from = layoutsRef.current.get(Number(r.src))
      const to = layoutsRef.current.get(Number(r.dst))
      if (!from || !to) return r.relate
      const arrow = to.centerY < from.centerY ? '↑' : '↓'
      return arrow === '↑' ? arrow + r.relate : r.relate + arrow
    }

    return (
      <>
        {withH.map(({ r, from, to, hX, dy }, i) => {
          const isActive = activeRelation === r
          const startY = from.centerY + dy
          const endY = to.centerY + (side === 'right' ? dy : 0)
          const vTop = Math.min(startY, endY)
          const vHeight = Math.abs(endY - startY)
          const labelHeight = r.relate.length * LINE_HEIGHT
          const labelTop = vTop + vHeight / 2 - labelHeight / 2

          return (
            <React.Fragment key={`${side}-${r.src}-${r.dst}-${i}`}>
              <View
                style={stl(
                  styles.horizontal,
                  {
                    top: startY - 0.5,
                    left: Math.min(side === 'left' ? from.left : from.right, hX),
                    width: Math.abs(hX - (side === 'left' ? from.left : from.right))
                  },
                  isActive && styles.active
                )}
              />
              <Pressable
                style={stl(
                  styles.vertical,
                  {
                    top: vTop,
                    left: hX - 0.5,
                    height: vHeight
                  },
                  isActive && styles.active
                )}
                onPress={() => handleRelationPress(r)}
                hitSlop={HIT_SLOP}
              />
              <View
                style={stl(
                  styles.horizontal,
                  {
                    top: endY - 0.5,
                    left: Math.min(hX, side === 'left' ? to.left : to.right),
                    width: Math.abs((side === 'left' ? to.left : to.right) - hX)
                  },
                  isActive && styles.active
                )}
              />

              <Pressable
                style={stl(styles.touchable, {
                  top: labelTop,
                  left: side === 'left' ? hX - 18 - LABEL_OFFSET_X : hX + 6 + LABEL_OFFSET_X
                })}
                onPress={() => handleRelationPress(r)}
                hitSlop={HIT_SLOP}
              >
                {getRelateChars(r)
                  .split('')
                  .map((char, idx) => (
                    <Text
                      key={idx}
                      style={styles.text}
                      type={isActive ? 'warning' : 'sub'}
                      size={11}
                      lineHeight={LINE_HEIGHT - 2}
                    >
                      {char}
                    </Text>
                  ))}
              </Pressable>
            </React.Fragment>
          )
        })}
      </>
    )
  })
}

export default Lines
