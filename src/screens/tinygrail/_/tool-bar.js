/*
 * @Author: czy0729
 * @Date: 2019-10-03 21:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-09 13:52:14
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function ToolBar({ data, sort, direction, onSortPress }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          const isActive = sort === item.value
          return (
            <Touchable
              key={item.label}
              style={index === 0 && _.ml.sm}
              withoutFeedback
              onPress={() => onSortPress(item.value)}
            >
              <Flex style={styles.item} justify='center'>
                <Text
                  type={isActive ? 'warning' : 'tinygrailText'}
                  size={13}
                  bold={isActive}
                >
                  {item.label}
                </Text>
                <View style={styles.angle}>
                  {isActive && !!direction && (
                    <View style={styles[direction]} />
                  )}
                </View>
              </Flex>
            </Touchable>
          )
        })}
      </ScrollView>
      <View style={styles.tips} />
    </Flex>
  )
}

ToolBar.defaultProps = {
  data: [],
  onSortPress: Function.prototype
}

export default observer(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    height: 46,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  tips: {
    width: 6,
    height: 6,
    marginLeft: 8,
    borderWidth: 6,
    borderColor: 'transparent',
    borderBottomColor: _.colorTinygrailText,
    transform: [
      {
        rotate: '90deg'
      }
    ]
  },
  item: {
    paddingHorizontal: 4,
    height: 44
  },
  angle: {
    width: 4,
    marginLeft: _.xs,
    marginRight: 8
  },
  down: {
    width: 4,
    height: 4,
    marginTop: 4,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: _.colorWarning
  },
  up: {
    width: 4,
    height: 4,
    marginBottom: 4,
    borderWidth: 4,
    borderColor: 'transparent',
    borderBottomColor: _.colorWarning
  }
}))
