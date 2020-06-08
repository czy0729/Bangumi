/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-28 12:16:16
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function ToolBar(props, { $ }) {
  const styles = memoStyles()
  const { position } = $.state
  const { filters } = $.monoVoices
  return (
    <Flex style={styles.container}>
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
