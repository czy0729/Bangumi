/*
 * iOS风格菜单
 * @Author: czy0729
 * @Date: 2019-04-06 06:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-05 18:27:09
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Text } from './text'
import { Touchable } from './touchable'

export const Menu = observer(
  ({
    style,
    title = [], // ['a', 'b'] | ['a', { title: <Text>b</Text>, disabled: true }]
    data = [],
    onSelect = Function.prototype
  }) => {
    const styles = memoStyles()
    return (
      <View style={style ? [styles.container, style] : styles.container}>
        {title.length !== 0 && (
          <View style={styles.title}>
            {title.map((item, index) => (
              <Text
                key={item}
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

          if (item.type === 'divider') {
            // eslint-disable-next-line react/no-array-index-key
            return <View key={index} style={styles.border} />
          }

          return (
            <View key={item.title} style={styles.border}>
              <Touchable
                style={styles.item}
                onPress={() => onSelect(item.title)}
              >
                {item.title}
              </Touchable>
            </View>
          )
        })}
      </View>
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  container: {
    width: parseInt(_.window.width * 0.48),
    maxWidth: _.device(240, 280),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
  },
  title: {
    width: '100%',
    paddingVertical: 12 * _.ratio,
    paddingHorizontal: 24 * _.ratio
  },
  item: {
    width: '100%',
    paddingVertical: 12 * _.ratio,
    paddingHorizontal: 24 * _.ratio
  },
  border: {
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  }
}))
