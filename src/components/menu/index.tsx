/*
 * iOS 风格菜单
 * @Author: czy0729
 * @Date: 2019-04-06 06:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 17:58:27
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { ViewStyle, ReactNode } from '@types'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'

type TitleItemType =
  | string
  | {
      type?: string
      title: ReactNode
      disabled?: boolean
    }

type DataItemType =
  | string
  | {
      type?: string
      title?: string
    }

type Props = {
  style?: ViewStyle
  title?: TitleItemType[]
  data?: DataItemType[]
  onSelect?: (title?: string) => any
}

export const Menu = observer(
  ({ style, title = [], data = [], onSelect = () => {} }: Props) => {
    const styles = memoStyles()
    return (
      <View style={[styles.container, style]}>
        {title.length !== 0 && (
          <View style={styles.title}>
            {title.map((item, index) => (
              <Text
                key={index}
                style={index !== 0 && _.mt.sm}
                type='sub'
                size={12}
                align='center'
              >
                {item}
              </Text>
            ))}
          </View>
        )}
        {data.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <View key={item} style={styles.border}>
                <Touchable style={styles.item} onPress={() => onSelect(item)}>
                  <Text align='center'>{item}</Text>
                </Touchable>
              </View>
            )
          }

          if (item.type === 'divider') return <View key={index} style={styles.border} />

          return (
            <View key={item.title} style={styles.border}>
              <Touchable style={styles.item} onPress={() => onSelect(item.title)}>
                {item.title}
              </Touchable>
            </View>
          )
        })}
      </View>
    )
  }
)
