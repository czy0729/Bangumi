/*
 * iOS风格菜单
 * @Author: czy0729
 * @Date: 2019-04-06 06:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-30 18:10:26
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import _ from '@styles'
import Text from './text'
import Touchable from './touchable'

function Menu({ style, title, data, onSelect }) {
  return (
    <View style={[styles.container, style]}>
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
            <View key={item} style={_.border.top}>
              <Touchable style={styles.item} onPress={() => onSelect(item)}>
                <Text size={16} align='center'>
                  {item}
                </Text>
              </Touchable>
            </View>
          )
        }

        if (item.type === 'divider') {
          // eslint-disable-next-line react/no-array-index-key
          return <View key={index} style={styles.divider} />
        }

        return (
          <View key={item.title} style={_.border.top}>
            <Touchable style={styles.item} onPress={() => onSelect(item.title)}>
              {item.title}
            </Touchable>
          </View>
        )
      })}
    </View>
  )
}

Menu.defaultProps = {
  style: undefined,
  title: [], // ['a', 'b'] | ['a', { title: <Text>b</Text>, disabled: true }]
  data: [],
  onSelect: Function.prototype
}

export default Menu

const styles = StyleSheet.create({
  container: {
    width: _.window.width * 0.5
  },
  title: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  item: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: _.colorBorder
  }
})
