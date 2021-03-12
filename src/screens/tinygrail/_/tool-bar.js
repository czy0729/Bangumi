/*
 * @Author: czy0729
 * @Date: 2019-10-03 21:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-12 14:06:39
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function ToolBar({
  data,
  sort,
  level,
  levelMap,
  direction,
  renderLeft,
  onSortPress,
  onLevelSelect
}) {
  const styles = memoStyles()
  const sum = Object.keys(levelMap).reduce(
    (total, level) => total + levelMap[level],
    0
  )
  const levelDS = [
    `全部 (${sum})`,
    ...Object.keys(levelMap).map(level => `lv${level} (${levelMap[level]})`)
  ]
  return (
    <Flex style={styles.container}>
      {renderLeft}
      <Popover
        data={levelDS}
        onSelect={title => {
          const lv = title.split(' ')[0]
          onLevelSelect(lv === '全部' ? '' : lv.replace('lv', ''))
        }}
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
            {levelMap[level] ? ` (${levelMap[level]})` : ''}
          </Text>
        </Flex>
      </Popover>
      {!!data.length && (
        <ScrollView
          style={_.container.flex}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
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
      )}
    </Flex>
  )
}

ToolBar.defaultProps = {
  data: [],
  levelMap: {},
  onSortPress: Function.prototype,
  onLevelSelect: Function.prototype
}

export default observer(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: 12,
    height: 46,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  tips: {
    width: 4,
    height: 4,
    marginTop: -1,
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
    paddingHorizontal: 4,
    height: 46
  },
  item: {
    paddingHorizontal: 4
  },
  angle: {
    width: 4,
    marginLeft: 2,
    marginRight: 6
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
