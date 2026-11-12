/*
 * @Author: czy0729
 * @Date: 2020-07-15 16:37:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 04:27:12
 *
 * 发现频道通用筛选面板
 */
import { observer } from 'mobx-react'
import { Component, Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { isArray } from '@utils'
import { useNavigation } from '@utils/hooks'
import { FilterSwitch } from '../filter-switch'
import { useOptionCounts } from './hooks'
import Row from './row'
import Selected from './selected'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { EventKeys } from '@types'
import type { Ctx, Props as FilterProps } from './types'
export type { FilterProps }

/** 筛选组 */
export const Filter = observer(
  ({
    filterDS = [],
    title = '频道',
    name = '番剧',
    type = 'Anime',
    lastUpdate,
    information = '',
    renderRight
  }: FilterProps) => {
    const { $ } = useStore<Ctx>(COMPONENT)
    const navigation = useNavigation()

    const styles = memoStyles()
    const { layout, expand } = $?.state || {}
    const query = ($?.state?.query || {}) as Record<string, unknown>
    const ready = $?.state?._loaded === true
    const { length } = $?.list || []
    const total = $?.total || length
    const eventId = `${type}.选择` as EventKeys
    const tags = query.tags as string[] | undefined

    const items = filterDS.filter(item => {
      const value = query[item.type]
      const selected = isArray(value) ? value.length > 0 : Boolean(value)

      // 配置永久展开 || 展开中 || 当前有选择
      return item.always || expand || selected
    })
    const counts = useOptionCounts({ query, counts: $?.counts, ready })

    /** 已选项 (排序为模式项不参与); 点击标签移除该条件 */
    const selectedItems: { type: string; value: string | number; multiple: boolean }[] = []
    filterDS.forEach(item => {
      if (item.type === 'sort') return
      const value = query[item.type] as string | number | (string | number)[] | undefined
      if (isArray(value)) {
        value.forEach(v =>
          selectedItems.push({ type: item.type, value: v as string | number, multiple: true })
        )
      } else if (value !== '' && value !== undefined && value !== null) {
        selectedItems.push({ type: item.type, value, multiple: false })
      }
    })

    /** 全部重置: 批量替换 query 为逐维清空的版本, 一次驱动查询与持久化 (排序不动) */
    const handleResetAll = () => {
      if (typeof $?.setState !== 'function' || typeof $?.search !== 'function') return
      const nextQuery = { ...query } as Record<string, unknown>
      filterDS.forEach(item => {
        if (item.type === 'sort') return
        const value = nextQuery[item.type] as string | number | (string | number)[] | undefined
        if (value === undefined || value === '' || value === null) return
        nextQuery[item.type] = isArray(value) ? [] : ''
      })
      $.setState({ query: nextQuery })
      $.search()
      if (typeof $?.save === 'function') $.save()
    }

    return (
      <Component id='base-filter' style={layout === 'grid' ? styles.grid : styles.list}>
        <FilterSwitch title={title} name={name} />

        {!!selectedItems.length && (
          <Selected items={selectedItems} eventId={eventId} onReset={handleResetAll} />
        )}

        {items.map(item => (
          <Row key={item.title} item={item} counts={counts} eventId={eventId} />
        ))}

        <Flex style={_.mt.sm} justify='center'>
          <Touchable
            style={styles.more}
            onPress={() => {
              if (typeof $?.onExpand === 'function') $.onExpand()
            }}
          >
            <Text type={_.select('sub', 'icon')} size={11} lineHeight={12} bold noWrap>
              {expand ? '收起' : '更多'}选项
            </Text>
          </Touchable>
        </Flex>

        <Flex style={styles.ft}>
          <Flex.Item>
            <Text size={11} type='sub' bold>
              {total !== length ? `${length} (${total}) 条记录` : `${length} 条记录`}
              {!!tags?.length && ` · ${tags.join(' · ')}`}
            </Text>
          </Flex.Item>
          {renderRight}
          <Touchable
            onPress={() => {
              navigation.push('Information', {
                title: `找${name}`,
                message: information.split('\n'),
                advance: true
              })
            }}
          >
            <Flex>
              {!!lastUpdate && (
                <Text style={_.mr.sm} size={11} type='sub' bold>
                  最后更新 {lastUpdate}
                </Text>
              )}
              <Iconfont name='md-info-outline' size={16} />
            </Flex>
          </Touchable>
        </Flex>
      </Component>
    )
  }
)

export default Filter
