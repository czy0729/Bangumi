/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-29 21:02:53
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { observer } from '@utils/decorators'
import { B, M } from '@constants'
import { MODEL_TINYGRAIL_CACULATE_RICH_TYPE } from '@constants/model'
import _ from '@styles'
import { colorBorder, colorContainer, colorText } from '../styles'

const caculateTypeData = MODEL_TINYGRAIL_CACULATE_RICH_TYPE.data.map(
  item => item.label
)

function ToolBar(props, { $ }) {
  const { caculateType, total = 0, filterItems } = $.state
  const caculateTypeLabel = MODEL_TINYGRAIL_CACULATE_RICH_TYPE.getLabel(
    caculateType
  )
  let totalText
  if (total > B) {
    totalText = `${parseFloat((total / B).toFixed(1))}亿`
  } else if (total > M) {
    totalText = `${parseFloat((total / M).toFixed(1))}万`
  } else {
    totalText = parseFloat(total).toFixed(1)
  }
  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover
          data={caculateTypeData}
          onSelect={title => $.onCaculateTypeSelect(title)}
        >
          <Flex style={styles.item} justify='center'>
            <Text type='warning'>{caculateTypeLabel || '计算类型'}</Text>
            <Text style={_.ml.xs} type='warning' size={12}>
              {totalText}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
      <Flex.Item>
        <Popover
          data={[
            '重置',
            ...filterItems.map(item => `${item.name} #${item.id}`)
          ]}
          onSelect={title => {
            if (title === '重置') {
              $.reset()
              return
            }

            const [name, id] = title.split(' #')
            $.onToggleItem({
              id,
              name
            })
          }}
        >
          <Flex style={styles.item} justify='center'>
            <Iconfont
              style={{
                color: filterItems.length ? _.colorWarning : colorText
              }}
              name='filter'
              size={14}
            />
            <Text
              style={[
                _.ml.sm,
                {
                  color: filterItems.length ? _.colorWarning : colorText
                }
              ]}
            >
              {filterItems.length || '-'}
            </Text>
          </Flex>
        </Popover>
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
    height: 44,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorBorder,
    backgroundColor: colorContainer
  },
  item: {
    paddingVertical: _.sm + 4
  },
  touchable: {
    paddingHorizontal: _.lg
  }
})
