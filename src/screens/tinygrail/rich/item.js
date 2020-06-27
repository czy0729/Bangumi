/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 12:54:01
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { formatNumber, getTimestamp, lastDate } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { observer } from '@utils/decorators'
import { B, M } from '@constants'

function Item(
  {
    index,
    page,
    limit,
    avatar,
    userId,
    nickname,
    total,
    share,
    assets,
    principal,
    lastActiveDate,
    lastIndex
  },
  { navigation }
) {
  const styles = memoStyles()
  const isTop = index === 0
  let totalText
  if (Math.abs(total) > B) {
    totalText = `${formatNumber(total / B, 1)}亿`
  } else if (Math.abs(total) > M) {
    totalText = `${formatNumber(total / M, 1)}万`
  } else {
    totalText = formatNumber(Math.abs(total), 1)
  }

  let assetsText
  if (assets > B) {
    assetsText = `${formatNumber(assets / B, 1)}亿`
  } else if (assets > M) {
    assetsText = `${formatNumber(assets / M, 1)}万`
  } else {
    assetsText = assets
  }

  let principalText
  if (principal > B) {
    principalText = `${formatNumber(principal / B, 1)}亿`
  } else if (principal > M) {
    principalText = `${formatNumber(principal / M, 1)}万`
  } else {
    principalText = principal
  }

  let shareText
  if (share > M) {
    shareText = `${formatNumber(share / M, 1)}万`
  } else {
    shareText = share
  }

  const rank = index + 1 + (page - 1) * limit
  let changeText = ''
  let changeColor
  if (lastIndex === 0) {
    changeText = 'new'
    changeColor = 'warning'
  } else {
    const change = lastIndex - rank
    if (change < 0) {
      changeText = change
      changeColor = 'ask'
    } else if (change > 0) {
      changeText = `+${change}`
      changeColor = 'bid'
    }
  }

  return (
    <View style={styles.container}>
      <Flex align='start'>
        <View>
          <Avatar
            style={styles.avatar}
            src={tinygrailOSS(avatar)}
            size={44}
            borderColor='transparent'
            name={nickname}
            onPress={() => {
              t('番市首富.跳转', {
                to: 'Zone',
                userId
              })

              navigation.push('Zone', {
                userId,
                from: 'tinygrail'
              })
            }}
          />
        </View>
        <Flex.Item style={[styles.wrap, !isTop && styles.border]}>
          <Flex align='start'>
            <Flex.Item style={_.mr.sm}>
              <Touchable
                style={styles.item}
                highlight
                onPress={() => {
                  t('番市首富.跳转', {
                    to: 'TinygrailTree',
                    userId
                  })

                  navigation.push('TinygrailTree', {
                    userName: userId,
                    name: nickname
                  })
                }}
              >
                <Flex>
                  <Flex.Item>
                    <Text type='tinygrailPlain' size={16} bold>
                      {rank}. {nickname}
                      {!!changeText && (
                        <Text type={changeColor} size={16}>
                          {' '}
                          {changeText}
                        </Text>
                      )}
                    </Text>
                    <Text style={_.mt.xs} type='tinygrailText' size={11}>
                      总{assetsText} / 余{totalText} / 初{principalText} /{' '}
                      {lastActiveDate
                        ? lastDate(
                            getTimestamp(lastActiveDate.replace('T', ' '))
                          )
                        : '-'}
                    </Text>
                  </Flex.Item>
                  <Text style={_.ml.xs} type='tinygrailPlain'>
                    {shareText}
                  </Text>
                  <Iconfont
                    style={_.ml.xs}
                    size={14}
                    name='right'
                    color={_.colorTinygrailText}
                  />
                </Flex>
              </Touchable>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  avatar: {
    marginRight: _.xs,
    marginTop: _.md,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  item: {
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  },
  bonus: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: _.colorWarning,
    overflow: 'hidden'
  }
}))
