/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 22:08:16
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Iconfont, Text, Touchable, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { IOS, DATA_AIRTIME, DATA_MONTH } from '@constants'
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
    <Flex style={styles.container} justify='center'>
      <Popover data={typeData} onSelect={$.onTypeSelect}>
        <Flex style={styles.item} justify='center'>
          <Iconfont name='filter' size={12} color={_.colorMain} />
          <Text style={_.ml.xs} size={11} type='main' bold>
            {typeCn}
          </Text>
        </Flex>
        <Heatmap id='排行榜.类型选择' />
      </Popover>
      {typeCn !== '音乐' && (
        <Popover
          data={filterData.data.map(item => item.label)}
          onSelect={title => $.onFilterSelect(title, filterData)}
        >
          <Flex style={styles.item} justify='center'>
            <Text size={11} type={isEmptyFilter ? 'desc' : 'main'} bold>
              {filterCn === '全部' ? '类型' : filterCn}
            </Text>
          </Flex>
          <Heatmap id='排行榜.筛选选择' />
        </Popover>
      )}
      <Popover data={DATA_AIRTIME} onSelect={$.onAirdateSelect}>
        <Flex style={styles.item} justify='center'>
          <Text size={11} type={isEmptyAirdate ? 'desc' : 'main'} bold>
            {airtime || '年'}
          </Text>
        </Flex>
        <Heatmap id='排行榜.年选择' />
      </Popover>
      <Popover data={DATA_MONTH} onSelect={$.onMonthSelect}>
        <Flex style={styles.item} justify='center'>
          <Text size={11} type={isEmptyMonth ? 'desc' : 'main'} bold>
            {month || '月'}
          </Text>
        </Flex>
        <Heatmap id='排行榜.月选择' />
      </Popover>
      <Touchable onPress={$.toggleList}>
        <Flex style={styles.item} justify='center'>
          <Iconfont
            style={_.mr.xs}
            name='list'
            size={14}
            color={list ? _.colorMain : _.colorDesc}
          />
          <Iconfont
            style={_.ml.sm}
            name='order'
            size={13}
            color={!list ? _.colorMain : _.colorDesc}
          />
        </Flex>
        <Heatmap id='排行榜.切换布局' />
      </Touchable>
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
    paddingTop: IOS ? 6 : 0,
    paddingBottom: 10
  },
  item: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    marginHorizontal: _.xs,
    backgroundColor: _.select(
      'rgba(238, 238, 238, 0.8)',
      _._colorDarkModeLevel1
    ),
    borderRadius: 16
  }
}))
