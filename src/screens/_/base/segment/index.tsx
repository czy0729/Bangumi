/*
 * @Author: czy0729
 * @Date: 2026-04-20 20:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 22:13:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { feedback, stl } from '@utils'
import { memoStyles } from './styles'

import type { Props as SegmentProps } from './types'
export type { SegmentProps }

/** 简易版分段器 */
export const Segment = observer(
  <T extends string>({ style, textStyle, data, selectedIndex, onSelect }: SegmentProps<T>) => {
    const styles = memoStyles()

    return (
      <Flex style={stl(styles.title, style)}>
        {data.map((item, index) => {
          const isActive = selectedIndex === index

          return (
            <>
              {!!index && <View key={`${item}|split`} style={styles.split} />}
              <Touchable
                key={item}
                onPress={() => {
                  if (isActive) return

                  onSelect(item, index)
                  feedback(true)
                }}
              >
                <Text style={stl(!isActive && styles.opacity, textStyle)} type='sub' size={12} bold>
                  {item}
                </Text>
              </Touchable>
            </>
          )
        })}
      </Flex>
    )
  }
)

export default Segment
