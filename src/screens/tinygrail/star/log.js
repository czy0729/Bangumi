/*
 * @Author: czy0729
 * @Date: 2021-02-28 17:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-02 20:00:44
 */
import React from 'react'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'

function Item(
  { monoId, name, icon, amount, rank = 0, oldRank = 0, userName, time },
  { navigation }
) {
  const styles = memoStyles()
  const rankChange = oldRank - rank
  return (
    <Flex style={styles.container}>
      <Avatar
        style={styles.avatar}
        src={tinygrailOSS(icon)}
        size={36}
        name={name}
        borderColor='transparent'
        onPress={() =>
          navigation.push('Mono', {
            monoId: `character/${monoId}`,
            _name: name
          })
        }
      />
      <Flex.Item style={_.ml.sm}>
        <Touchable
          onPress={() =>
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${monoId}`
            })
          }
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

export default obc(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    marginBottom: _.md,
    backgroundColor: _.colorTinygrailContainer
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  rank: {
    minWidth: 22,
    paddingHorizontal: _.xs,
    marginLeft: _.xs,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  change: {
    minWidth: 22,
    paddingHorizontal: _.xs,
    marginLeft: _.xs,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.32)',
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
