/*
 * @Author: czy0729
 * @Date: 2019-11-17 21:04:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-14 03:26:26
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Iconfont } from '@components'
import { Popover as CompPopover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'

const data = ['K线', '买入', '卖出', '资产重组']

function Popover({ id, event }, { navigation }) {
  const { id: eventId, data: eventData } = event
  return (
    <CompPopover
      contentStyle={{
        borderTopRightRadius: 0
      }}
      data={data}
      onSelect={title => {
        switch (title) {
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
            break
        }
      }}
    >
      <Iconfont
        style={styles.extra}
        name='extra'
        color={_.colorTinygrailText}
      />
    </CompPopover>
  )
}

Popover.contextTypes = {
  navigation: PropTypes.object
}

Popover.defaultProps = {
  event: EVENT
}

export default observer(Popover)

const styles = StyleSheet.create({
  extra: {
    height: 56,
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  }
})
