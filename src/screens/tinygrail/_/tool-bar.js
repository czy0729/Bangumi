/*
 * @Author: czy0729
 * @Date: 2019-10-03 21:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-06 08:05:51
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function ToolBar({
  data = [],
  sort,
  level,
  levelMap = {},
  direction,
  renderLeft,
  onSortPress = Function.prototype,
  onLevelSelect = Function.prototype
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
        <Flex style={styles.item} justify='center'>
          <Iconfont
            name='md-filter-list'
            size={16}
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
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          alwaysBounceVertical={false}
          showsHorizontalScrollIndicator={false}
        >
          {data.map(item => {
            const isActive = sort === item.value
            return (
              <Touchable
                key={item.label}
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
                  {isActive && !!direction && (
                    <Iconfont
                      style={_.ml._xs}
                      name={`md-arrow-drop-${direction}`}
                      color={_.colorWarning}
                    />
                  )}
                </Flex>
              </Touchable>
            )
          })}
        </ScrollView>
      )}
    </Flex>
  )
}

export default ob(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: 12 * _.ratio,
    height: 46 * _.ratio,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  contentContainerStyle: {
    height: 44 * _.ratio,
    paddingLeft: _.xs * _.ratio,
    paddingRight: _._wind * _.ratio
  },
  item: {
    height: 44 * _.ratio,
    paddingHorizontal: 6 * _.ratio
  }
}))
