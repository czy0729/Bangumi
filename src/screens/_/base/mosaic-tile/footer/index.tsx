/*
 * @Author: czy0729
 * @Date: 2026-11-05 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 热力图底部: 数据类型切换与区间总数
 */
import { observer } from 'mobx-react'
import { Flex, Iconfont, Popover, Text } from '@components'
import { _ } from '@stores'
import { HEATMAP_TYPES } from '../ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Footer({ type, loading, total, unit, onTypeChange }: Props) {
  const styles = memoStyles()

  const currentTypeLabel =
    HEATMAP_TYPES.find(item => item.value === type)?.label || HEATMAP_TYPES[0].label

  return (
    <Flex style={styles.footer} align='center'>
      {!!onTypeChange && (
        <Popover
          style={styles.popover}
          data={HEATMAP_TYPES.map(item => item.label)}
          value={currentTypeLabel}
          onSelect={label => {
            const next = HEATMAP_TYPES.find(item => item.label === label)
            if (next) onTypeChange(next.value)
          }}
        >
          <Flex style={styles.trigger} justify='center'>
            <Text type={_.select('sub', 'icon')} size={12} bold>
              {currentTypeLabel}
            </Text>
            <Iconfont
              style={_.ml.xxs}
              name='md-filter-list'
              size={14}
              color={_.select(_.colorSub, _.colorIcon)}
            />
          </Flex>
        </Popover>
      )}
      <Flex.Item>
        <Text type={_.select('sub', 'icon')} size={12} bold align='right'>
          {loading ? '正在获取数据…' : `过去一年共 ${total} ${unit}`}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default observer(Footer)
