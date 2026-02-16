/*
 * @Author: czy0729
 * @Date: 2019-11-17 21:04:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-13 22:30:44
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover as PopoverComp } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { EVENT, FROZEN_FN } from '@constants'
import { styles } from './styles'
import { Props } from './types'

const DATA = [
  // '收藏',
  '买入',
  '卖出',
  '资产重组'
  // 'K线'
] as const

function Popover({
  id,
  relation = [],
  subject,
  subjectId,
  event = EVENT,
  onCollect = FROZEN_FN
}: Props) {
  const navigation = useNavigation()
  const { id: eventId, data: eventData } = event
  let _data: string[] = [...DATA]
  if (subject && subjectId) _data = [..._data, subject]
  if (relation.length) _data = [..._data, `关联角色 (${relation.length + 1})`]
  return (
    <PopoverComp
      style={styles.touch}
      contentStyle={styles.content}
      data={_data}
      onSelect={title => {
        switch (title) {
          case '收藏':
            onCollect(id)
            break

          case 'K线':
            t(eventId, {
              to: 'TinygrailTrade',
              from: 'popover',
              monoId: id,
              ...eventData
            })

            navigation.push('TinygrailTrade', {
              monoId: `character/${id}`
            })
            break

          case '买入':
            t(eventId, {
              to: 'TinygrailDeal',
              from: 'popover',
              type: 'bid',
              monoId: id,
              ...eventData
            })

            navigation.push('TinygrailDeal', {
              monoId: `character/${id}`,
              type: 'bid'
            })
            break

          case '卖出':
            t(eventId, {
              to: 'TinygrailDeal',
              from: 'popover',
              type: 'ask',
              monoId: id,
              ...eventData
            })

            navigation.push('TinygrailDeal', {
              monoId: `character/${id}`,
              type: 'ask'
            })
            break

          case '资产重组':
            t(eventId, {
              to: 'TinygrailSacrifice',
              from: 'popover',
              monoId: id,
              ...eventData
            })

            navigation.push('TinygrailSacrifice', {
              monoId: `character/${id}`
            })
            break

          default:
            if (title.includes('关联角色')) {
              t(eventId, {
                to: 'TinygrailRelation',
                from: 'popover',
                monoId: id,
                ...eventData
              })

              navigation.push('TinygrailRelation', {
                ids: [id, ...relation],
                name: `${subject} (${relation.length + 1})`
              })
              return
            }

            t(eventId, {
              to: 'Subject',
              from: 'popover',
              monoId: id,
              ...eventData
            })

            navigation.push('Subject', {
              subjectId
            })
            break
        }
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-vert' size={16} color={_.colorTinygrailText} />
      </Flex>
    </PopoverComp>
  )
}

export default ob(Popover)
