/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:20:09
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, UserStatus } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { formatNumber, getTimestamp, lastDate } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { B, M } from '@constants'

function Item(
  {
    index,
    title,
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
    lastIndex,
    state
  },
  { navigation }
) {
  const styles = memoStyles()
  const isTop = index === 0
  const lastActiveTS = getTimestamp(lastActiveDate.replace('T', ' '))

  let totalText
  if (Math.abs(total) > B) {
    totalText = `${formatNumber(total / B, 1)}亿`
  } else if (Math.abs(total) > M) {
    totalText = `${formatNumber(total / M, 1)}万`
  } else {
    totalText = formatNumber(Math.abs(total), 1)
  }

  let assetsText
  if (Math.abs(assets) > B) {
    assetsText = `${formatNumber(assets / B, 1)}亿`
  } else if (Math.abs(assets) > M) {
    assetsText = `${formatNumber(assets / M, 1)}万`
  } else {
    assetsText = formatNumber(Math.abs(assets), 1)
  }

  let shareText
  if (Math.abs(share) > M) {
    shareText = `${formatNumber(share / M, 1)}万`
  } else {
    shareText = formatNumber(Math.abs(share), 1)
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

  let text = ''
  let right = ''
  if (title === '股息') {
    text = `总值${assetsText} / 余${totalText}`
    right = shareText
  } else if (title === '余额') {
    text = `总值${assetsText} / 股息${shareText}`
    right = totalText
  } else if (title === '初始') {
    let principalText
    if (Math.abs(principal) > B) {
      principalText = `${formatNumber(principal / B, 1)}亿`
    } else if (Math.abs(principal) > M) {
      principalText = `${formatNumber(principal / M, 1)}万`
    } else {
      principalText = formatNumber(Math.abs(principal), 1)
    }
    text = `总值${assetsText} / 股息${shareText} / 余${totalText}`
    right = principalText
  } else {
    text = `股息${shareText} / 余${totalText} / ${lastDate(lastActiveTS)}`
    right = assetsText
  }

  return (
    <View style={styles.container}>
      <Flex align='start'>
        <View>
          <UserStatus style={styles.userStatus} last={lastActiveTS}>
            <Avatar
              style={styles.avatar}
              src={tinygrailOSS(avatar)}
              size={36}
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
          </UserStatus>
        </View>
        <Flex.Item style={[styles.wrap, !isTop && !_.flat && styles.border]}>
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
                    <Text
                      type={state === 666 ? 'ask' : 'tinygrailPlain'}
                      size={15}
                      bold
                    >
                      {rank}. {nickname}
                      {!!changeText && (
                        <Text type={changeColor} size={15}>
                          {' '}
                          {changeText}
                        </Text>
                      )}
                    </Text>
                    <Text style={_.mt.xs} type='tinygrailText' size={11}>
                      {text}
                    </Text>
                  </Flex.Item>
                  <Text style={_.ml.xs} type='tinygrailPlain'>
                    {right}
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

export default obc(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  userStatus: {
    backgroundColor: _.colorTinygrailContainer
  },
  avatar: {
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
