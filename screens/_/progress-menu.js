/*
 * @Author: czy0729
 * @Date: 2019-03-16 08:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-06 05:03:44
 */
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '@components'
import _, { colorPlain } from '@styles'

const ProgressMenu = ({ style, title, data, onSelect }) => (
  <View style={style}>
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
    {data.map(item => (
      <View key={item} style={_.border.top}>
        <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
          <Text size={16} align='center'>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
)

ProgressMenu.defaultProps = {
  style: undefined,
  title: [],
  data: [],
  onSelect: () => {}
}

export default ProgressMenu

const styles = StyleSheet.create({
  title: {
    width: 224,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colorPlain
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colorPlain
  }
})
