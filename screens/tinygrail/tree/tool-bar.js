/*
 * @Author: czy0729
 * @Date: 2019-11-21 23:37:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-23 19:13:18
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { observer } from '@utils/decorators'
import {
  MODEL_TINYGRAIL_ASSETS_TYPE,
  MODAL_TINYGRAIL_CACULATE_TYPE,
  MODAL_TINYGRAIL_CACULATE_TEMPLE_TYPE
} from '@constants/model'
import _ from '@styles'
import { colorBorder, colorContainer, colorText } from '../styles'

const typeData = MODEL_TINYGRAIL_ASSETS_TYPE.data.map(item => item.label)
const caculateTypeData = MODAL_TINYGRAIL_CACULATE_TYPE.data.map(
  item => item.label
)
const caculateTempleTypeData = MODAL_TINYGRAIL_CACULATE_TEMPLE_TYPE.data.map(
  item => item.label
)

function ToolBar(props, { $ }) {
  const { type, caculateType, total = 0, filterItems } = $.state
  const typeLabel = MODEL_TINYGRAIL_ASSETS_TYPE.getLabel(type)
  const caculateTypeLabel = MODAL_TINYGRAIL_CACULATE_TYPE.getLabel(caculateType)
  let totalText
  if (total > 100000000) {
    totalText = `${(total / 100000000).toFixed(1)}亿`
  } else if (total > 10000) {
    totalText = `${(total / 10000).toFixed(1)}万`
  } else {
    totalText = parseFloat(total).toFixed(1)
  }
  return (
    <Flex style={styles.container}>
      <Flex.Item flex={0.8}>
        <Popover data={typeData} onSelect={title => $.onTypeSelect(title)}>
          <Flex style={styles.item} justify='center'>
            <Text type='warning'>{typeLabel || '范围'}</Text>
            <Text style={_.ml.xs} type='warning' size={12}>
              {$.charaAssets.length}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
      <Flex.Item>
        <Popover
          data={$.isTemple ? caculateTempleTypeData : caculateTypeData}
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
      <Flex.Item flex={0.8}>
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
              id: parseInt(id),
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
