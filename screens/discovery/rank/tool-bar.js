/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-05 00:59:29
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { airtimeData } from '@constants'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_RANK_ANIME_FILTER,
  MODEL_RANK_BOOK_FILTER,
  MODEL_RANK_GAME_FILTER,
  MODEL_RANK_REAL_FILTER
} from '@constants/model'

const typeData = MODEL_SUBJECT_TYPE.data.map(item => item.title)

function ToolBar(props, { $, navigation }) {
  const styles = memoStyles()
  const { type, filter, airtime, list } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  let filterData
  switch (typeCn) {
    case '书籍':
      filterData = MODEL_RANK_BOOK_FILTER
      break
    case '游戏':
      filterData = MODEL_RANK_GAME_FILTER
      break
    case '三次元':
      filterData = MODEL_RANK_REAL_FILTER
      break
    default:
      filterData = MODEL_RANK_ANIME_FILTER
      break
  }
  const filterCn = filterData.getLabel(filter)
  const isEmptyFilter = filter === ''
  const isEmptyAirdate = airtime === ''

  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover
          data={typeData}
          onSelect={title => $.onTypeSelect(title, navigation)}
        >
          <Flex style={styles.item} justify='center'>
            <Iconfont name='app' size={14} color={_.colorMain} />
            <Text style={_.ml.sm} type='main'>
              {typeCn}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
      {typeCn !== '音乐' && (
        <Flex.Item>
          <Popover
            data={filterData.data.map(item => item.label)}
            onSelect={title => $.onFilterSelect(title, filterData, navigation)}
          >
            <Flex style={styles.item} justify='center'>
              <Iconfont
                name='filter'
                size={14}
                color={isEmptyFilter ? _.colorSub : _.colorMain}
              />
              <Text style={_.ml.sm} type={isEmptyFilter ? 'sub' : 'main'}>
                {filterCn === '全部' ? '类型' : filterCn}
              </Text>
            </Flex>
          </Popover>
        </Flex.Item>
      )}
      <Flex.Item>
        <Popover
          data={airtimeData}
          onSelect={title => $.onAirdateSelect(title, navigation)}
        >
          <Flex style={styles.item} justify='center'>
            <Iconfont
              name='calendar'
              size={14}
              color={isEmptyAirdate ? _.colorSub : _.colorMain}
            />
            <Text style={_.ml.sm} type={isEmptyAirdate ? 'sub' : 'main'}>
              {airtime || '年份'}
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
  $: PropTypes.object,
  navigation: PropTypes.object
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
