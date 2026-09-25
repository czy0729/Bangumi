/*
 * @Author: czy0729
 * @Date: 2022-03-23 18:16:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:48:09
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx, OriginItem } from '../../types'
import type { Props } from './types'

function Title({ type, name }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const data = $.data[type] as OriginItem[]
  const activeData = data.filter(item => item.active === 1)
  const activeNames = activeData.map(item => item.name)

  const handleSelect = useCallback(
    (label: string) => {
      if (label === '空') return

      const item = activeData.find(item => item.name === label)
      $.go({
        type,
        url: item.url
      })
    },
    [$, activeData, type]
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
        data={activeNames.length ? activeNames : ['空']}
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
