/*
 * @Author: czy0729
 * @Date: 2019-11-17 21:04:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-04 17:05:26
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover as CompPopover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'

const data = ['收藏', 'K线', '买入', '卖出', '资产重组']

function Popover(
  {
    id,
    relation = [],
    subject,
    subjectId,
    event = EVENT,
    onCollect = Function.prototype
  },
  { navigation }
) {
  const { id: eventId, data: eventData } = event
  let _data = data
  if (subject && subjectId) {
    _data = [..._data, subject]
  }
  if (relation.length) {
    _data = [..._data, `关联角色 (${relation.length + 1})`]
  }
  return (
    <CompPopover
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
    </CompPopover>
  )
}

export default obc(Popover)

const styles = _.create({
  touch: {
    marginTop: 8,
    borderRadius: 20,
    overflow: 'hidden'
  },
  content: {
    borderTopRightRadius: 0
  },
  icon: {
    width: 36,
    height: 36
  }
})
