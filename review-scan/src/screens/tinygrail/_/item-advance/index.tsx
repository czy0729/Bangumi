/*
 * @Author: czy0729
 * @Date: 2020-01-08 15:21:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:19:06
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { EVENT } from '@constants'
import Rank from '@tinygrail/_/rank'
import { calculateRate } from '@tinygrail/_/utils'
import { memoStyles } from './styles'

function Item({
  event = EVENT,
  assets,
  index,
  id,
  name,
  icon,
  bonus,
  level,
  amount,
  current,
  firstAsks,
  firstBids,
  firstAmount,
  rate,
  rank,
  stars,
  mark,
  isAuctioning
}) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const { id: eventId, data: eventData } = event
  const isAuction = !firstBids && !firstAsks
  const isBids = !!firstBids
  const isTop = index === 0
  return (
    <Flex style={styles.container} align='start'>
      <View style={_.mt.md}>
        <Avatar
          src={tinygrailOSS(icon)}
          name={name}
          borderColor='transparent'
          skeletonType='tinygrail'
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
      </View>
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
              <Flex>
                <Rank value={rank} />
                <Flex.Item>
                  <Text
                    type='tinygrailPlain'
                    size={name.length > 16 ? 13 : name.length > 13 ? 14 : 15}
                    lineHeight={15}
                    bold
                  >
                    {index + 1}. {name}
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
                </Flex.Item>
              </Flex>
              <Text style={_.mt.xs} type='tinygrailText' size={12}>
                {!!amount && (
                  <Text type='warning' size={12} bold>
                    {amount}股
                  </Text>
                )}
                {!!amount && ' / '}
                {!!firstAmount && (
                  <Text type={isBids ? 'bid' : 'ask'} size={12} bold>
                    {isBids && '收'}
                    {firstAmount}股
                  </Text>
                )}
                {assets && (
                  <Text type='bid' size={12}>
                    {assets.state || '-'} ({assets.sacrifices || '-'})
                  </Text>
                )}
                {assets && ' / '}
                {!!firstAmount && ' / '}₵{toFixed(firstAsks || firstBids || current, 2)} / +
                {toFixed(rate, 1)} ({Number(toFixed(calculateRate(rate, rank, stars), 1))})
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

export default observer(Item)
