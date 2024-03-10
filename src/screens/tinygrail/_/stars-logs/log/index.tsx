/*
 * @Author: czy0729
 * @Date: 2021-02-28 17:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 03:56:54
 */
import React from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, tinygrailOSS } from '@utils'
import { obc } from '@utils/decorators'
import { Navigation } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Log(
  { monoId, name = '', icon, amount, rank = 0, oldRank = 0, userName, time },
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
          navigation.push('Mono', {
            monoId: `character/${monoId}`,
            _name: name
          })
        }}
      />
      <Flex.Item style={_.ml.sm}>
        <Touchable
          onPress={() => {
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${monoId}`
            })
          }}
        >
          <Flex>
            <Text
              type='tinygrailPlain'
              size={name.length > 12 ? 8 : name.length > 8 ? 10 : 12}
              bold
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              style={[
                styles.rank,
                {
                  backgroundColor: rank <= 500 ? '#ffc107' : '#aaa'
                }
              ]}
              size={10}
              bold
              align='center'
            >
              {rank}
            </Text>
            {rankChange !== 0 && (
              <Text
                style={[
                  styles.change,
                  {
                    backgroundColor: rankChange >= 0 ? _.colorBid : _.colorAsk
                  }
                ]}
                size={10}
                bold
                align='center'
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
