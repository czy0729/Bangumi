/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-17 23:59:23
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Iconfont, Text, Touchable, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { DATA_AIRTIME, DATA_MONTH } from '@constants'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_RANK_ANIME_FILTER,
  MODEL_RANK_BOOK_FILTER,
  MODEL_RANK_GAME_FILTER,
  MODEL_RANK_REAL_FILTER
} from '@constants/model'

const typeData = MODEL_SUBJECT_TYPE.data.map(item => item.title)

function ToolBar(props, { $ }) {
  const styles = memoStyles()
  const { type, filter, airtime, month, list } = $.state
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
  const isEmptyMonth = month === ''
  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover data={typeData} onSelect={$.onTypeSelect}>
          <Flex style={styles.item} justify='center'>
            <Text size={12} type='main'>
              {typeCn}
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='down'
              size={10}
              color={_.colorMain}
            />
          </Flex>
          <Heatmap id='排行榜.类型选择' />
        </Popover>
      </Flex.Item>
      {typeCn !== '音乐' && (
        <Flex.Item>
          <Popover
            data={filterData.data.map(item => item.label)}
            onSelect={title => $.onFilterSelect(title, filterData)}
          >
            <Flex style={styles.item} justify='center'>
              <Text size={12} type={isEmptyFilter ? 'sub' : 'main'}>
                {filterCn === '全部' ? '类型' : filterCn}
              </Text>
              <Iconfont
                style={_.ml.xs}
                name='down'
                size={10}
                color={isEmptyFilter ? _.colorSub : _.colorMain}
              />
            </Flex>
            <Heatmap id='排行榜.筛选选择' />
          </Popover>
        </Flex.Item>
      )}
      <Flex.Item flex={0.8}>
        <Popover data={DATA_AIRTIME} onSelect={$.onAirdateSelect}>
          <Flex style={styles.item} justify='center'>
            <Text size={12} type={isEmptyAirdate ? 'sub' : 'main'}>
              {airtime || '年'}
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='down'
              size={10}
              color={isEmptyAirdate ? _.colorSub : _.colorMain}
            />
          </Flex>
          <Heatmap id='排行榜.年选择' />
        </Popover>
      </Flex.Item>
      <Flex.Item flex={0.8}>
        <Popover data={DATA_MONTH} onSelect={$.onMonthSelect}>
          <Flex style={styles.item} justify='center'>
            <Text size={12} type={isEmptyMonth ? 'sub' : 'main'}>
              {month || '月'}
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='down'
              size={10}
              color={isEmptyMonth ? _.colorSub : _.colorMain}
            />
          </Flex>
          <Heatmap id='排行榜.月选择' />
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
              size={12}
              color={!list ? _.colorMain : undefined}
            />
          </Flex>
          <Heatmap id='排行榜.切换布局' />
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
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  }
}))
