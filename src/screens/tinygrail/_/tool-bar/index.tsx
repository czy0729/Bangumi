/*
 * @Author: czy0729
 * @Date: 2019-10-03 21:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-10 18:32:39
 */
import React, { useCallback, useMemo } from 'react'
import { ScrollView } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { FROZEN_FN, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { scrollToX } from './utils'
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
  onSortPress = FROZEN_FN,
  onSortLongPress = FROZEN_FN,
  onLevelSelect = FROZEN_FN
}: Props) {
  const sum = Object.keys(levelMap).reduce((total, level) => total + levelMap[level], 0)
  const memoDS = useMemo(
    () => [
      `全部 (${sum})`,
      ...Object.keys(levelMap)
        .reverse()
        .map(level => `lv${level} (${levelMap[level]})`)
    ],
    [levelMap, sum]
  )
  const handleSelect = useCallback(
    (title: string) => {
      const lv = title.split(' ')[0]
      onLevelSelect(lv === '全部' ? '' : lv.replace('lv', ''))
    },
    [onLevelSelect]
  )

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Flex style={stl(styles.container, style)}>
        {renderLeft}
        <Popover data={memoDS} onSelect={handleSelect}>
          <Flex style={styles.item} justify='center'>
            <Iconfont
              name='md-filter-list'
              size={16}
              color={level ? _.colorAsk : _.colorTinygrailText}
            />
            <Text style={_.ml.xs} size={13} type={level ? 'ask' : 'tinygrailText'}>
              {level ? `lv${level}` : '全部'}
              {levelMap[level] ? ` (${levelMap[level]})` : ''}
            </Text>
          </Flex>
        </Popover>
        {!!data.length && (
          <ScrollView
            ref={scrollView => {
              scrollToX(scrollView, data, sort)
            }}
            contentContainerStyle={styles.contentContainerStyle}
            horizontal
            {...SCROLL_VIEW_RESET_PROPS}
          >
            {data.map(item => {
              const isActive = sort === item.value
              return (
                <Touchable
                  key={item.label}
                  withoutFeedback
                  onPress={() => onSortPress(item.value)}
                  onLongPress={onSortLongPress}
                >
                  <Flex style={styles.item} justify='center'>
                    <Text type={isActive ? 'warning' : 'tinygrailText'} size={13} bold={isActive}>
                      {item.label}
                    </Text>
                    {isActive && !!direction && (
                      <Iconfont
                        style={_.mr._xs}
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
  })
}

export default ToolBar
