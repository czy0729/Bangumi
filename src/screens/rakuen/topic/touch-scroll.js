/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-09-06 16:14:49
 */
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp, titleCase } from '@utils'
import { memo, obc } from '@utils/decorators'
import { MODEL_RAKUEN_SCROLL_DIRECTION } from '@constants/model'

const defaultProps = {
  styles: {},
  list: [],
  readedTime: 0,
  scrollDirection: MODEL_RAKUEN_SCROLL_DIRECTION.getValue('右侧'),
  isWebLogin: false,
  onPress: Function.prototype
}

const TouchScroll = memo(
  ({ styles, list, readedTime, scrollDirection, isWebLogin, onPress }) => {
    rerender('Topic.TouchScroll.Main')

    const showFloor = [
      parseInt(list.length * 0.33333),
      parseInt(list.length * 0.66666),
      list.length - 1
    ]

    const isVertical =
      scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('右侧') ||
      scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('左侧')
    return (
      <Flex
        style={[
          styles[`container${titleCase(scrollDirection)}`],
          !isWebLogin && !isVertical && styles.notLogin
        ]}
        direction={isVertical ? 'column' : undefined}
      >
        <Flex.Item flex={isVertical ? 1 : 3}>
          <TouchableWithoutFeedback onPressIn={() => onPress(-1)}>
            <Flex style={isVertical ? styles.itemVertical : styles.itemHorizontal}>
              <Text style={styles.text} size={8} type='icon' align='center'>
                1
              </Text>
            </Flex>
          </TouchableWithoutFeedback>
        </Flex.Item>
        {list.map((item, index) => {
          let isNew = false

          if (readedTime) {
            if (getTimestamp(item.time) > readedTime) {
              isNew = true
            }

            if (!isNew) {
              if (item.sub) {
                item.sub.forEach(i => {
                  if (getTimestamp(i.time) > readedTime) {
                    isNew = true
                  }
                })
              }
            }
          }

          const showFloorText = showFloor.includes(index)
          return (
            <Flex.Item
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              flex={isVertical ? 1 : showFloorText ? 3 : 1}
            >
              <TouchableWithoutFeedback onPressIn={() => onPress(index)}>
                <Flex
                  style={[
                    isVertical ? styles.itemVertical : styles.itemHorizontal,
                    isNew && styles.itemNew,
                    showFloorText && styles.itemText
                  ]}
                >
                  {showFloorText && (
                    <Text
                      style={styles.text}
                      size={8}
                      type={isNew ? _.select('plain', 'icon') : 'icon'}
                      align='center'
                    >
                      {String(list[index].floor).replace('#', '')}
                    </Text>
                  )}
                </Flex>
              </TouchableWithoutFeedback>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  },
  defaultProps,
  ({ list, ...other }) => ({
    list: list.length,
    ...other
  })
)

export default obc(({ onPress }, { $ }) => {
  rerender('Topic.TouchScroll')

  const { scrollDirection } = $.setting
  const { list } = $.comments
  if (
    scrollDirection === MODEL_RAKUEN_SCROLL_DIRECTION.getValue('隐藏') ||
    !list.length
  ) {
    return null
  }

  const { _time: readedTime } = $.readed
  return (
    <TouchScroll
      styles={memoStyles()}
      list={list}
      readedTime={readedTime}
      scrollDirection={scrollDirection}
      isWebLogin={$.isWebLogin}
      onPress={onPress}
    />
  )
})

const memoStyles = _.memoStyles(_ => ({
  containerRight: {
    position: 'absolute',
    top: _.headerHeight,
    right: 0,
    bottom: 40,
    width: 16 * _.ratio,
    backgroundColor: _.colorPlain
  },
  containerLeft: {
    position: 'absolute',
    top: _.headerHeight,
    left: 0,
    bottom: 40,
    width: 16 * _.ratio,
    backgroundColor: _.colorPlain
  },
  containerBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    width: '100%',
    height: 24 * _.ratio,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  notLogin: {
    bottom: 0,
    height: 32 * _.ratio,
    paddingBottom: 8
  },
  itemVertical: {
    width: 16 * _.ratio,
    height: '100%'
  },
  itemHorizontal: {
    width: '100%',
    height: '100%'
  },
  itemNew: {
    backgroundColor: _.select('rgba(254, 138, 149, 0.4)', 'rgb(59, 48, 51)')
  },
  itemText: {
    minHeight: 24 * _.ratio
  },
  text: {
    width: '100%'
  }
}))
