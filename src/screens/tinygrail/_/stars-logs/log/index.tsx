/*
 * @Author: czy0729
 * @Date: 2021-02-28 17:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-24 20:10:05
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, HTMLDecode, navigationReference, tinygrailOSS } from '@utils'
import { r } from '@utils/dev'
import Rank from '../../rank'
import { getTypeText } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Log({
  navigation,
  // filter,
  monoId,
  name = '',
  icon,
  amount,
  rank = 0,
  oldRank = 0,
  userName,
  time,
  type,
  onToggle
}) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const rankChange = oldRank - rank
    const isAskType = type === 1 || type === 4
    const textType = isAskType ? 'ask' : 'bid'
    const textMark = isAskType ? '-' : '+'
    const nameLength = name.length
    const nameSize = nameLength > 12 ? 8 : nameLength > 8 ? 10 : 12

    const handleAvatarPress = useCallback(() => {
      const navigationRef = navigation || navigationReference()
      if (!navigationRef) return

      onToggle?.()
      setTimeout(() => {
        navigationRef.push('Mono', {
          monoId: `character/${monoId}`,
          _name: name
        })
      }, 160)
    }, [])
    const handleItemPress = useCallback(() => {
      const navigationRef = navigation || navigationReference()
      if (!navigationRef) return

      onToggle?.()
      setTimeout(() => {
        navigationRef.push('TinygrailSacrifice', {
          monoId: `character/${monoId}`
        })
      }, 160)
    }, [])

    const desc = getTypeText(type)
    // if (filter && filter !== '全部' && FILTER_MAP[filter] !== desc) return null

    return (
      <Flex style={styles.container}>
        <Avatar
          src={tinygrailOSS(icon)}
          size={36}
          name={name}
          borderColor='transparent'
          skeletonType='tinygrail'
          onPress={handleAvatarPress}
        />

        <Flex.Item style={_.ml.sm}>
          <Touchable onPress={handleItemPress}>
            <Flex>
              <Text
                style={_.mr.xs}
                type='tinygrailPlain'
                size={nameSize}
                bold
                numberOfLines={1}
                shrink
              >
                {name}
              </Text>
              <Rank value={rank} />
              {rankChange !== 0 && (
                <Text
                  style={[
                    styles.change,
                    {
                      backgroundColor: rankChange > 0 ? _.colorBid : _.colorAsk
                    }
                  ]}
                  size={9}
                  lineHeight={1}
                  bold
                  align='center'
                  shadow
                >
                  {rankChange > 0 ? '↑' : '↓'}
                  {Math.abs(rankChange)}
                </Text>
              )}
            </Flex>

            <Flex style={_.mt.xs}>
              <Flex.Item>
                <Flex>
                  {!!userName && (
                    <Text
                      style={_.mr.xs}
                      type='tinygrailText'
                      size={10}
                      bold
                      numberOfLines={1}
                      shrink
                    >
                      @{HTMLDecode(userName)}
                    </Text>
                  )}
                  <Text type={textType} size={10} bold numberOfLines={1}>
                    {textMark}
                    {formatNumber(amount, 0)}
                    {desc === '星之力' ? '' : ` ${desc}`}
                  </Text>
                </Flex>
              </Flex.Item>

              <Text style={_.ml.md} type='tinygrailText' size={10}>
                {time}
              </Text>
            </Flex>
          </Touchable>
        </Flex.Item>
      </Flex>
    )
  })
}

export default Log
