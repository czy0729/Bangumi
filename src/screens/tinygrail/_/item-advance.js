/*
 * @Author: czy0729
 * @Date: 2020-01-08 15:21:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-10 20:18:48
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'

function Item(props, { navigation }) {
  const styles = memoStyles()
  const {
    event,
    assets,
    index,
    id,
    name,
    icon,
    bonus,
    rate,
    level,
    amount,
    current,
    firstAsks,
    firstBids,
    firstAmount,
    mark,
    isAuctioning
  } = props
  const { id: eventId, data: eventData } = event
  const isAuction = !firstBids && !firstAsks
  const isBids = !!firstBids
  const isTop = index === 0
  return (
    <Flex style={styles.container} align='start'>
      <Avatar
        style={styles.avatar}
        src={tinygrailOSS(icon)}
        size={36}
        name={name}
        borderColor='transparent'
        onPress={() => {
          t(eventId, {
            to: 'Mono',
            monoId: id,
            ...eventData
          })

          navigation.push('Mono', {
            monoId: `character/${id}`,
            _name: name
          })
        }}
      />
      <Flex.Item style={!isTop && !_.flat && styles.border}>
        <Touchable
          style={styles.item}
          onPress={() => {
            if (isAuction) {
              t(eventId, {
                to: 'TinygrailSacrifice',
                monoId: id,
                ...eventData
              })

              navigation.push('TinygrailSacrifice', {
                monoId: `character/${id}`
              })
              return
            }

            t(eventId, {
              to: 'TinygrailDeal',
              monoId: id,
              ...eventData
            })

            navigation.push('TinygrailDeal', {
              monoId: `character/${id}`,
              type: isBids ? 'ask' : 'bid'
            })
          }}
        >
          <Flex>
            <Flex.Item>
              <Text
                type='tinygrailPlain'
                size={name.length > 16 ? 12 : name.length > 13 ? 12 : 15}
                lineHeight={15}
                bold
              >
                {index + 1}.{name}
                {!!bonus && (
                  <Text size={12} lineHeight={15} type='warning'>
                    {' '}
                    x{bonus}
                  </Text>
                )}
                {parseInt(level) > 1 && (
                  <Text type='ask' size={12} lineHeight={15}>
                    {' '}
                    lv{level}
                  </Text>
                )}
              </Text>
              <Text style={_.mt.xs} type='tinygrailText' size={11}>
                {!!amount && (
                  <Text type='warning' size={11}>
                    {amount}股
                  </Text>
                )}
                {!!amount && ' / '}
                {!!firstAmount && (
                  <Text type={isBids ? 'bid' : 'ask'} size={11}>
                    {isBids && '收'}
                    {firstAmount}股
                  </Text>
                )}
                {assets && (
                  <Text type='bid' size={11}>
                    {assets.state || '-'} ({assets.sacrifices || '-'})
                  </Text>
                )}
                {assets && ' / '}
                {!!firstAmount && ' / '}₵
                {toFixed(firstAsks || firstBids || current, 2)} / +
                {toFixed(rate, 2)} / +{toFixed(rate * (level + 1) * 0.3, 2)}
              </Text>
            </Flex.Item>
            {isAuctioning && (
              <Text style={_.ml.sm} type='bid'>
                {' '}
                [竞拍中]
              </Text>
            )}
            <Text style={_.ml.md} type='tinygrailPlain' size={16}>
              {mark}
            </Text>
          </Flex>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

Item.defaultProps = {
  event: EVENT,
  assets: undefined
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  active: {
    backgroundColor: _.colorTinygrailActive
  },
  avatar: {
    marginTop: _.md,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    paddingLeft: _.sm
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
