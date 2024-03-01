/*
 * @Author: czy0729
 * @Date: 2019-10-03 21:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 05:20:58
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { memoStyles } from './styles'
import { Props } from './types'

function ToolBar({
  style,
  data = [],
  sort,
  level,
  levelMap = {},
  direction,
  renderLeft,
  onSortPress = () => {},
  onLevelSelect = () => {}
}: Props) {
  const styles = memoStyles()
  const sum = Object.keys(levelMap).reduce((total, level) => total + levelMap[level], 0)
  const levelDS = [
    `全部 (${sum})`,
    ...Object.keys(levelMap).map(level => `lv${level} (${levelMap[level]})`)
  ]
  return (
    <Flex style={stl(styles.container, style)}>
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
          <Text style={_.ml.xs} size={13} type={level ? 'ask' : 'tinygrailText'}>
            {level ? `lv${level}` : '等级'}
            {levelMap[level] ? ` (${levelMap[level]})` : ''}
          </Text>
        </Flex>
      </Popover>
      {!!data.length && (
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          {...SCROLL_VIEW_RESET_PROPS}
        >
          {data.map(item => {
            const isActive = sort === item.value
            return (
              <Touchable key={item.label} withoutFeedback onPress={() => onSortPress(item.value)}>
                <Flex style={styles.item} justify='center'>
                  <Text type={isActive ? 'warning' : 'tinygrailText'} size={13} bold={isActive}>
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
