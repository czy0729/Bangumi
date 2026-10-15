/*
 * @Author: czy0729
 * @Date: 2026-10-15 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 进一步搜索的关键字推荐
 */
import { observer } from 'mobx-react'
import { Divider, Flex, Text, Touchable } from '@components'
import { _, monoStore, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

type Item = {
  item: string
  index: number
  picTotal?: number
}

/** 有图 > 未知 > 无图, 同档保持原顺序 */
function compareByPicTotal(a: Item, b: Item) {
  const rank = (picTotal?: number) => (picTotal > 0 ? 0 : picTotal === undefined ? 1 : 2)

  const rankA = rank(a.picTotal)
  const rankB = rank(b.picTotal)
  if (rankA !== rankB) return rankA - rankB
  if (rankA === 0) return b.picTotal - a.picTotal

  return a.index - b.index
}

function Keywords() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { keywords } = $
  if (!keywords.length) return null

  return (
    <Flex direction='column' justify='center'>
      <Divider style={_.mt.lg} />
      <Text style={_.mt.md} type='sub' size={13}>
        可尝试搜索
      </Text>
      {keywords
        .filter(item => {
          if (!item || item.length > 20) return false
          return !/^第.*(季|期)$/.test(item)
        })
        .map((item, index) => ({
          item,
          index,
          picTotal: monoStore.picTotal(item)
        }))
        .sort(compareByPicTotal)
        .slice(0, 10)
        .map(({ item, picTotal }) => {
          const textType = picTotal === 0 ? _.select('sub', 'icon') : 'desc'

          return (
            <Touchable
              key={item}
              style={_.mt.md}
              onPress={() => {
                navigation.push('Pic', {
                  monoId: $.params.monoId,
                  name: item
                })
              }}
            >
              <Text type={textType} size={13}>
                <Text type={textType} size={13} underline>
                  {item}
                </Text>
                {picTotal !== undefined ? ` (${picTotal > 99 ? '99+' : picTotal})` : ''}
              </Text>
            </Touchable>
          )
        })}
    </Flex>
  )
}

export default observer(Keywords)
