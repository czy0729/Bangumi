/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 16:04:37
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Popover, Menu, Iconfont, Text, Touchable } from '@components'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_COLLECTION_STATUS, MODEL_ORDERBY } from '@constants/model'
import _ from '@styles'
import { tabs } from './store'

const orderData = MODEL_ORDERBY.data.map(item => item.label)

const ToolBar = (props, { $ }) => {
  const { subjectType, list, order, tag, page } = $.state
  const type = MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
  const userCollectionsTags = $.userCollectionsTags(subjectType, type)
  const orderPopoverProps = IOS
    ? {
        overlay: <Menu data={orderData} onSelect={$.onSortSelect} />
      }
    : {
        data: orderData,
        onSelect: $.onSortSelect
      }
  const filterData = ['重置']
  userCollectionsTags.forEach(item =>
    filterData.push(`${item.tag} (${item.count})`)
  )
  const filterPopoverProps = IOS
    ? {
        overlay: <Menu data={filterData} onSelect={$.onFilterSelect} />
      }
    : {
        data: filterData,
        onSelect: $.onFilterSelect
      }
  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover placement='bottom' {...orderPopoverProps}>
          <Flex style={styles.item} justify='center'>
            <Iconfont
              name='sort'
              size={14}
              color={order ? _.colorMain : undefined}
            />
            <Text
              style={_.ml.sm}
              type={order ? 'main' : 'sub'}
              numberOfLines={1}
            >
              {order ? MODEL_ORDERBY.getLabel(order) : '收藏时间'}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
      <Flex.Item>
        <Popover placement='bottom' {...filterPopoverProps}>
          <Flex style={styles.item} justify='center'>
            <Iconfont
              name='filter'
              size={14}
              color={tag ? _.colorMain : undefined}
            />
            <Text style={_.ml.sm} type={tag ? 'main' : 'sub'} numberOfLines={1}>
              {tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: _.colorBg
  },
  item: {
    padding: _.sm + 4
  },
  touchable: {
    paddingHorizontal: _.lg
  }
})
