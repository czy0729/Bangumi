/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 09:48:28
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { B, M, MODEL_TINYGRAIL_CACULATE_RICH_TYPE, TINYGRAIL_CACULATE_RICH_TYPE } from '@constants'
import { TinygrailCaculateRichTypeCn } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const caculateTypeData = TINYGRAIL_CACULATE_RICH_TYPE.map(item => item.label)

function ToolBar() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { caculateType, total = 0, filterItems } = $.state
  const caculateTypeLabel = MODEL_TINYGRAIL_CACULATE_RICH_TYPE.getLabel(caculateType)
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
          data={caculateTypeData}
          onSelect={(title: TinygrailCaculateRichTypeCn) => $.onCaculateTypeSelect(title)}
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
