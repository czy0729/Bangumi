/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:24:22
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import {
  B,
  M,
  MODEL_TINYGRAIL_CALCULATE_RICH_TYPE,
  TINYGRAIL_CALCULATE_RICH_TYPE
} from '@constants'
import { memoStyles } from './styles'

import type { TinygrailCalculateRichTypeCn } from '@types'
import type { Ctx } from '../types'

const calculateTypeData = TINYGRAIL_CALCULATE_RICH_TYPE.map(item => item.label)

function ToolBar() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { calculateType, total = 0, filterItems } = $.state
  const calculateTypeLabel = MODEL_TINYGRAIL_CALCULATE_RICH_TYPE.getLabel(calculateType)
  let totalText: string
  if (total > B) {
    totalText = `${toFixed(total / B, 1)}亿`
  } else if (total > M) {
    totalText = `${toFixed(total / M, 1)}万`
  } else {
    totalText = toFixed(total || 0, 1)
  }
  return (
    <Flex style={styles.container}>
      <Flex.Item>
        <Popover
          data={calculateTypeData}
          onSelect={(title: TinygrailCalculateRichTypeCn) => $.onCalculateTypeSelect(title)}
        >
          <Flex style={styles.item} justify='center'>
            <Text type='warning'>{calculateTypeLabel || '计算类型'}</Text>
            <Text style={_.ml.xs} type='warning' size={12}>
              {totalText}
            </Text>
          </Flex>
        </Popover>
      </Flex.Item>
      <Flex.Item>
        <Popover
          data={['重置', ...filterItems.map(item => `${item.name} #${item.id}`)]}
          onSelect={title => {
            t('前百首富.选择筛选', {
              title
            })

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
