/*
 * @Author: czy0729
 * @Date: 2019-11-21 23:37:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:30:50
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { stl, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import {
  B,
  M,
  MODEL_TINYGRAIL_ASSETS_TYPE,
  MODEL_TINYGRAIL_CACULATE_TYPE,
  TINYGRAIL_ASSETS_TYPE,
  TINYGRAIL_CACULATE_TEMPLE_TYPE,
  TINYGRAIL_CACULATE_TYPE
} from '@constants'
import { ViewStyle } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const TYPE_DATA = TINYGRAIL_ASSETS_TYPE.map(item => item.label)
const CACULATE_TYPE_DATA = TINYGRAIL_CACULATE_TYPE.map(item => item.label)
const CACULATE_TEMPLE_TYPE_DATA = TINYGRAIL_CACULATE_TEMPLE_TYPE.map(item => item.label)

function ToolBar({ style }: { style?: ViewStyle }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { type, caculateType, total = 0, filterItems } = $.state
  const typeLabel = MODEL_TINYGRAIL_ASSETS_TYPE.getLabel(type)
  const caculateTypeLabel = MODEL_TINYGRAIL_CACULATE_TYPE.getLabel(caculateType)
  let totalText
  if (total > B) {
    totalText = `${toFixed(total / B, 1)}亿`
  } else if (total > M) {
    totalText = `${toFixed(total / M, 1)}万`
  } else {
    totalText = toFixed(total || 0, 1)
  }
  return (
    <Flex style={stl(styles.container, style)}>
      <Flex.Item flex={0.8}>
        <Popover data={TYPE_DATA} onSelect={title => $.onTypeSelect(title)}>
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
          data={$.isTemple ? CACULATE_TEMPLE_TYPE_DATA : CACULATE_TYPE_DATA}
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
          data={['重置', '隐藏低持仓', ...filterItems.map(item => `${item.name} #${item.id}`)]}
          onSelect={title => {
            t('资产分析.选择筛选', {
              title
            })

            if (title === '重置') {
              $.reset()
              return
            }

            if (title === '隐藏低持仓') {
              $.onHideLow()
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
                color: filterItems.length ? _.colorWarning : _.colorTinygrailText
              }}
              name='md-filter-list'
              size={16}
            />
            <Text style={_.ml.sm} type={filterItems.length ? 'warning' : 'tinygrailText'}>
              {filterItems.length || '-'}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
    </Flex>
  )
}

export default ob(ToolBar)
