/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-31 18:18:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Iconfont, UserStatus } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { decimal } from '@tinygrail/_/utils'

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

  const totalText = decimal(Math.abs(total))
  const assetsText = decimal(Math.abs(assets))
  const shareText = decimal(Math.abs(share))

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
    const principalText = decimal(Math.abs(principal))
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
                    <Flex>
                      <Text style={styles.rank} size={12} bold align='center'>
                        {rank}
                      </Text>
                      <Text
                        type={state === 666 ? 'ask' : 'tinygrailPlain'}
                        size={15}
                        bold
                      >
                        {nickname}
                        {!!changeText && (
                          <Text type={changeColor} size={15}>
                            {' '}
                            {changeText}
                          </Text>
                        )}
                      </Text>
                    </Flex>
                    <Text style={_.mt.xs} type='tinygrailText' size={12}>
                      {text}
                    </Text>
                  </Flex.Item>
                  <Text style={_.ml.xs} type='tinygrailPlain'>
                    {right}
                  </Text>
                  <Iconfont name='md-navigate-next' color={_.colorTinygrailText} />
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

const memoStyles = _.memoStyles(() => ({
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
    paddingHorizontal: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
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
  },
  rank: {
    minWidth: 20,
    marginRight: 6,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: '#ffc107',
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
