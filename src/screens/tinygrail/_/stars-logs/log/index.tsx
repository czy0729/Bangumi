/*
 * @Author: czy0729
 * @Date: 2021-02-28 17:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 17:48:31
 */
import React from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, navigationReference, tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import { Navigation } from '@types'
import Rank from '../../rank'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Log(
  { monoId, name = '', icon, amount, rank = 0, oldRank = 0, userName, time, type },
  {
    navigation
  }: {
    navigation: Navigation
  }
) {
  const styles = memoStyles()
  const rankChange = oldRank - rank

  return (
    <Flex style={styles.container}>
      <Avatar
        src={tinygrailOSS(icon)}
        size={36}
        name={name}
        borderColor='transparent'
        skeletonType='tinygrail'
        onPress={() => {
          const navigationRef = navigation || navigationReference()
          if (!navigationRef) return

          navigationRef.push('Mono', {
            monoId: `character/${monoId}`,
            _name: name
          })
        }}
      />
      <Flex.Item style={_.ml.sm}>
        <Touchable
          onPress={() => {
            const navigationRef = navigation || navigationReference()
            if (!navigationRef) return

            navigation.push('TinygrailSacrifice', {
              monoId: `character/${monoId}`
            })
          }}
        >
          <Flex>
            <Text
              style={_.mr.xs}
              type='tinygrailPlain'
              size={name.length > 12 ? 8 : name.length > 8 ? 10 : 12}
              bold
              numberOfLines={1}
            >
              {name}
            </Text>
            <Rank value={rank} />
            {rankChange !== 0 && (
              <Text
                style={[
                  styles.change,
                  {
                    backgroundColor: rankChange >= 0 ? _.colorBid : _.colorAsk
                  }
                ]}
                size={9}
                lineHeight={1}
                bold
                align='center'
                shadow
              >
                {rankChange >= 0 ? '↑' : '↓'}
                {Math.abs(rankChange)}
              </Text>
            )}
          </Flex>
          <Flex style={_.mt.xs}>
            <Flex.Item>
              {userName ? (
                <Text type='bid' size={10} numberOfLines={1}>
                  <Text type='tinygrailText' size={10}>
                    @{userName}{' '}
                  </Text>
                  +{formatNumber(amount, 0)}
                  {type === 3 && ' 精炼成功'}
                </Text>
              ) : (
                <Text type='ask' size={10}>
                  <Text type='tinygrailText' size={10}>
                    受到攻击{' '}
                  </Text>
                  -{formatNumber(amount, 0)}
                </Text>
              )}
            </Flex.Item>
            <Text type='tinygrailText' size={10}>
              {time}
            </Text>
          </Flex>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

export default obc(Log, COMPONENT)
