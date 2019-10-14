/*
 * @Author: czy0729
 * @Date: 2019-10-14 22:46:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-15 00:45:54
 */
import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { getTimestamp } from '@utils'
import _ from '@styles'

function TouchScroll({ onPress }, { $ }) {
  const { list } = $.comments
  if (!list.length) {
    return null
  }

  const { _time: readedTime } = $.readed
  const showFloor = [
    parseInt(list.length * 0.33333),
    parseInt(list.length * 0.66666),
    list.length - 1
  ]
  return (
    <Flex style={styles.container} direction='column'>
      <Flex.Item>
        <TouchableWithoutFeedback onPressIn={() => onPress(-1)}>
          <Flex style={styles.item} justify='end'>
            <Text size={10} type='icon'>
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
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Flex.Item key={index}>
            <TouchableWithoutFeedback onPressIn={() => onPress(index)}>
              <Flex
                style={[styles.item, isNew && styles.itemNew]}
                justify='end'
              >
                {showFloor.includes(index) && (
                  <Text size={10} type={isNew ? 'plain' : 'icon'}>
                    {list[index].floor.replace('#', '')}
                  </Text>
                )}
              </Flex>
            </TouchableWithoutFeedback>
          </Flex.Item>
        )
      })}
    </Flex>
  )
}

TouchScroll.defaultProps = {
  onPress: Function.prototype
}

TouchScroll.contextTypes = {
  $: PropTypes.object
}

export default observer(TouchScroll)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: _.headerHeight,
    right: 0,
    bottom: 44,
    width: 16
  },
  item: {
    width: 16,
    height: '100%',
    paddingRight: 1,
    marginVertical: 2
  },
  itemNew: {
    backgroundColor: 'rgba(254, 138, 149, 0.8)'
  }
})
