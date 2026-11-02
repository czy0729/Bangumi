/*
 * @Author: czy0729
 * @Date: 2022-03-23 18:16:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 04:12:23
 *
 * 分类标题: 名称、启用数量与测试入口
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT, EMPTY_MENU } from './ds'
import { memoStyles } from './styles'

import type { Ctx, OriginItem } from '../../types'
import type { Props } from './types'

function Title({ type, name }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const data = $.data[type]
  const activeData = data.filter(item => item.active === 1)

  /** 菜单项带上原始条目, 按引用取值 (Web 端按文案去重, 回调下标不可靠) */
  const handleSelect = useCallback(
    (entry?: { text: string; item?: OriginItem }) => {
      if (!entry?.item) return

      $.go({
        type,
        url: entry.item.url
      })
    },
    [$, type]
  )

  return (
    <Flex>
      <Text size={20} bold>
        {name}
      </Text>
      <Text style={styles.count} type={_.select('sub', 'icon')} size={11} lineHeight={14} bold>
        {activeData.length}/{data.length}
      </Text>
      <Flex.Item />
      <Popover
        style={styles.test}
        data={activeData.length ? activeData.map(item => ({ text: item.name, item })) : EMPTY_MENU}
        onSelect={handleSelect}
      >
        <Flex>
          <Iconfont name='md-airplay' size={15} color={_.colorSub} />
          <Text style={_.ml.xs} type='sub' size={12} lineHeight={14} bold>
            测试
          </Text>
        </Flex>
      </Popover>
    </Flex>
  )
}

export default observer(Title)
