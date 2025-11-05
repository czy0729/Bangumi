/*
 * @Author: czy0729
 * @Date: 2025-07-17 14:00:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-18 06:19:19
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { decimal, desc, formatNumber, tinygrailOSS } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailAvatar from '@tinygrail/_/avatar'
import TinygrailLevel from '@tinygrail/_/level'
import { Ctx } from '../../types'
import { COMPONENT, COVER_HEIGHT, COVER_WIDTH } from './ds'
import { memoStyles } from './styles'

function Item({ item }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { price, total, list, user } = $.detail(item)
    if (!list?.length) return null

    const change = total - price
    const percent = ((total - price) / (price || 100000)) * 100

    const topItem = list.slice().sort((a, b) => desc(a[4] * a[5], b[4] * b[5]))[0]
    const image = tinygrailOSS(topItem[1], 480)
    const isAnonymous = !$.userStatus(user.username)

    const { sort } = $.state
    const percentText = `${percent >= 0 ? '+' : ''}${formatNumber(percent, 0)}%`
    const changeText = `${change >= 0 ? '+' : ''}${decimal(change)}`
    const topText = sort === 'amount' ? changeText : percentText
    const bottomText = sort === 'amount' ? percentText : changeText

    return (
      <Flex style={styles.item}>
        {!!image && (
          <View style={styles.image}>
            <Image
              src={image}
              size={COVER_WIDTH}
              height={COVER_HEIGHT}
              imageViewer
              imageViewerSrc={image}
              skeletonType='tinygrail'
              radius={_.radiusSm}
            />
          </View>
        )}
        <Flex.Item>
          <Touchable
            style={_.mt._xs}
            onPress={() => {
              navigation.push('TinygrailSacrifice', {
                monoId: `character/${topItem[0]}`
              })
            }}
          >
            <Flex>
              <Text type='tinygrailPlain' size={12} lineHeight={13} numberOfLines={1}>
                {topItem[2]}
              </Text>
              <TinygrailLevel style={_.ml.xs} size={11} lineHeight={13} value={topItem[3]} />
            </Flex>
          </Touchable>
          <Touchable
            style={_.mt.xs}
            onPress={() => {
              navigation.push('TinygrailDeal', {
                monoId: `character/${topItem[0]}`
              })
            }}
          >
            <Text type='tinygrailText' size={11} lineHeight={13} bold>
              ₵{formatNumber(topItem[4])}{' '}
              <Text style={_.ml.xs} type='warning' size={11} lineHeight={13}>
                x{topItem[5]}
              </Text>
            </Text>
          </Touchable>
        </Flex.Item>
        <Flex style={styles.user} direction='column' align='end'>
          {!isAnonymous && (
            <Flex style={styles.avatar} justify='center'>
              <TinygrailAvatar
                navigation={navigation}
                src={user.avatar}
                userId={user.username}
                name={user.nickname}
                size={32}
              />
            </Flex>
          )}
          <Text
            style={styles.name}
            type={isAnonymous ? 'tinygrailText' : 'tinygrailPlain'}
            size={11}
            numberOfLines={1}
            bold
            align='center'
          >
            {isAnonymous ? '匿名用户' : user.nickname}
          </Text>
        </Flex>
        <View style={styles.side}>
          <Text type={percent >= 0 ? 'bid' : 'ask'} size={13} bold align='right'>
            {topText}
          </Text>
          <Text style={_.mt.xs} type='tinygrailText' size={11} lineHeight={13} bold align='right'>
            {bottomText}
          </Text>
        </View>
      </Flex>
    )
  })
}

export default Item
