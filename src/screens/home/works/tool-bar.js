/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-25 19:13:36
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { MODEL_MONO_WORKS_ORDERBY } from '@constants/model'

const orderData = MODEL_MONO_WORKS_ORDERBY.data.map(item => item.label)

function ToolBar(props, { $ }) {
  const styles = memoStyles()
  const { order, position, list } = $.state
  const { filters } = $.monoWorks
  const orderLabel = MODEL_MONO_WORKS_ORDERBY.getLabel(order)
  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover data={orderData} onSelect={$.onOrderSelect}>
          <Flex style={styles.item} justify='center'>
            <Iconfont
              name='sort'
              size={14}
              color={orderLabel !== '名称' ? _.colorMain : undefined}
            />
            <Text
              style={_.ml.sm}
              type={orderLabel !== '名称' ? 'main' : 'sub'}
              numberOfLines={1}
            >
              {orderLabel}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
      {filters.map(item => {
        const data = item.data.map(i => i.title)
        const find = item.data.find(i => i.value === position) || {
          title: '全部'
        }
        return (
          <Flex.Item key={item.title}>
            <Popover
              data={data}
              onSelect={label => $.onFilterSelect(label, item.data)}
            >
              <Flex style={styles.item} justify='center'>
                <Text>{item.title}</Text>
                <Text
                  style={_.ml.sm}
                  type={find.title !== '全部' ? 'main' : 'sub'}
                >
                  {find.title}
                </Text>
              </Flex>
            </Popover>
          </Flex.Item>
        )
      })}
      <Flex.Item>
        <Touchable onPress={$.toggleList}>
          <Flex style={styles.item} justify='center'>
            <Iconfont
              name='list'
              size={14}
              color={list ? _.colorMain : undefined}
            />
            <Iconfont
              style={_.ml.md}
              name='order'
              size={14}
              color={!list ? _.colorMain : undefined}
            />
          </Flex>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

ToolBar.contextTypes = {
  $: PropTypes.object
}

export default observer(ToolBar)

const memoStyles = _.memoStyles(_ => ({
  container: {
    backgroundColor: _.colorBg
  },
  item: {
    padding: _.sm + 4
  },
  touchable: {
    paddingHorizontal: _.lg
  }
}))
