/*
 * @Author: czy0729
 * @Date: 2019-10-03 21:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-01 15:48:44
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

const levelDS = [
  '全部',
  'lv1',
  'lv2',
  'lv3',
  'lv4',
  'lv5',
  'lv6',
  'lv7',
  'lv8',
  'lv9',
  'lv10',
  'lv11',
  'lv12',
  'lv13',
  'lv14',
  'lv15'
]

function ToolBar({ data, sort, level, direction, onSortPress, onLevelSelect }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container}>
      <Popover
        data={levelDS}
        onSelect={title =>
          onLevelSelect(title === '全部' ? '' : title.replace('lv', ''))
        }
      >
        <Flex style={styles.popover} justify='center'>
          <Iconfont
            name='filter'
            size={13}
            color={level ? _.colorAsk : _.colorTinygrailText}
          />
          <Text
            style={_.ml.xs}
            size={13}
            type={level ? 'ask' : 'tinygrailText'}
          >
            {level ? `lv${level}` : '等级'}
          </Text>
        </Flex>
      </Popover>
      {!!data.length && (
        <>
          <Flex.Item>
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
          </Flex.Item>
          <View style={styles.tips} />
        </>
      )}
    </Flex>
  )
}

ToolBar.defaultProps = {
  data: [],
  onSortPress: Function.prototype,
  onLevelSelect: Function.prototype
}

export default observer(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: 6,
    paddingRight: 10,
    height: 47,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  tips: {
    width: 4,
    height: 4,
    marginLeft: 8,
    borderWidth: 4,
    borderColor: 'transparent',
    borderBottomColor: _.colorTinygrailText,
    transform: [
      {
        rotate: '90deg'
      }
    ]
  },
  popover: {
    paddingHorizontal: 6,
    height: 44,
    marginTop: -3
  },
  item: {
    paddingHorizontal: 4,
    height: 44
  },
  angle: {
    width: 4,
    marginLeft: _.xs,
    marginRight: 4
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
