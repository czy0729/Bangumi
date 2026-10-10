/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:57:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 11:00:00
 *
 * 半月刊列表
 */
import { observer } from 'mobx-react'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ data }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { type } = $.state

  return (
    <ScrollView
      key={type}
      style={_.mt.md}
      contentContainerStyle={styles.list}
      onScroll={$.onScroll}
    >
      {data
        .filter(item => {
          const isCatalog = item.title.includes('【目录】')
          return type === '目录' ? isCatalog : !isCatalog
        })
        .map((item, index) => (
          <Item key={item.topicId} item={item} index={index} />
        ))}
    </ScrollView>
  )
}

export default observer(List)
