/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 22:54:20
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Iconfont, Text, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { IOS, DATA_BROWSER_AIRTIME, DATA_BROWSER_MONTH } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const typeData = MODEL_SUBJECT_TYPE.data.map(item => item.title)

function ToolBar(props, { $ }) {
  const styles = memoStyles()
  const { type, airtime, month } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  return (
    <Flex style={styles.container} justify='center'>
      <Popover data={typeData} onSelect={$.onTypeSelect}>
        <Flex style={styles.item} justify='center'>
          <Iconfont name='filter' size={12} color={_.colorMain} />
          <Text style={_.ml.xs} size={11} type='main' bold>
            {typeCn}
          </Text>
        </Flex>
        <Heatmap id='索引.类型选择' />
      </Popover>
      <Popover data={DATA_BROWSER_AIRTIME} onSelect={$.onAirdateSelect}>
        <Flex style={styles.item} justify='center'>
          <Text type='sub' size={11} bold>
            {`${airtime}年` || '年'}
          </Text>
        </Flex>
        <Heatmap id='索引.年选择' />
      </Popover>
      <Popover data={DATA_BROWSER_MONTH} onSelect={$.onMonthSelect}>
        <Flex style={styles.item} justify='center'>
          <Text type='sub' size={11} bold>
            {`${month}月` || '月'}
          </Text>
        </Flex>
        <Heatmap id='索引.月选择' />
      </Popover>
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
