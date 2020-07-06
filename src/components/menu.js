/*
 * iOS风格菜单
 * @Author: czy0729
 * @Date: 2019-04-06 06:57:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-03 10:21:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import Text from './text'
import Touchable from './touchable'

function Menu({ style, title, data, onSelect }) {
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
              size={13}
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
                <Text size={16} align='center'>
                  {item}
                </Text>
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

export default observer(Menu)

const memoStyles = _.memoStyles(_ => ({
  container: {
    width: parseInt(_.window.width * 0.5),
    maxWidth: 240,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
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
  border: {
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  }
}))
