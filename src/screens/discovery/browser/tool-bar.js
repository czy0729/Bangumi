/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-23 20:07:29
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Iconfont, Text, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { DATA_BROWSER_AIRTIME, DATA_BROWSER_MONTH } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const typeData = MODEL_SUBJECT_TYPE.data.map(item => item.title)

function ToolBar(props, { $ }) {
  const styles = memoStyles()
  const { type, airtime, month } = $.state
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover data={typeData} onSelect={$.onTypeSelect}>
          <Flex style={styles.item} justify='center'>
            <Text type='sub' size={12}>
              {typeCn}
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='down'
              size={10}
              color={_.colorSub}
            />
          </Flex>
          <Heatmap id='索引.类型选择' />
        </Popover>
      </Flex.Item>
      <Flex.Item>
        <Popover data={DATA_BROWSER_AIRTIME} onSelect={$.onAirdateSelect}>
          <Flex style={styles.item} justify='center'>
            <Text type='sub' size={12}>
              {`${airtime}年` || '年'}
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='down'
              size={10}
              color={_.colorSub}
            />
          </Flex>
          <Heatmap id='索引.年选择' />
        </Popover>
      </Flex.Item>
      <Flex.Item>
        <Popover data={DATA_BROWSER_MONTH} onSelect={$.onMonthSelect}>
          <Flex style={styles.item} justify='center'>
            <Text style={_.ml.sm} type='sub' size={12}>
              {`${month}月` || '月'}
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='down'
              size={10}
              color={_.colorSub}
            />
          </Flex>
          <Heatmap id='索引.月选择' />
        </Popover>
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
    paddingVertical: _.md - 4,
    paddingHorizontal: _.md
  }
}))
