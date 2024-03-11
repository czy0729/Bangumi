/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 17:37:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, TextType, Touchable } from '@components'
import { _ } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { decimal } from '@tinygrail/_/utils'
import { Ctx } from '../../types'
import Avatar from './avatar'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

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
  { navigation }: Ctx
) {
  const styles = memoStyles()
  const lastActiveTS = getTimestamp(lastActiveDate.replace('T', ' '))

  const totalText = decimal(Math.abs(total))
  const assetsText = decimal(Math.abs(assets))
  const shareText = decimal(Math.abs(share))

  const rank = index + 1 + (page - 1) * limit
  let changeText: any = ''
  let changeColor: TextType
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
    text = `总值${assetsText} / 流动资金${totalText}`
    right = shareText
  } else if (title === '余额') {
    text = `总值${assetsText} / 股息${shareText}`
    right = totalText
  } else if (title === '初始') {
    const principalText = decimal(Math.abs(principal))
    text = `总值${assetsText} / 股息${shareText} / 流动资金${totalText}`
    right = principalText
  } else {
    text = `周股息${shareText} / 流动资金${totalText} / ${lastDate(lastActiveTS)}`
    right = assetsText
  }

  return (
    <View style={styles.container}>
      <Flex align='start'>
        <Avatar
          avatar={avatar}
          nickname={nickname}
          userId={userId}
          lastActiveDate={lastActiveDate}
        />
        <Flex.Item style={styles.wrap}>
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
                      <Text type={state === 666 ? 'ask' : 'tinygrailPlain'} bold>
                        {nickname}
                        {!!changeText && (
                          <Text type={changeColor} size={15}>
                            {' '}
                            {changeText}
                          </Text>
                        )}
                      </Text>
                    </Flex>
                    <Text style={_.mt.xs} type='tinygrailText' size={12} lineHeight={13}>
                      {text}
                    </Text>
                  </Flex.Item>
                  <Text style={_.ml.sm} type='tinygrailPlain'>
                    {right}
                  </Text>
                  <Iconfont style={_.mr._xs} name='md-navigate-next' color={_.colorTinygrailText} />
                </Flex>
              </Touchable>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  )
}

export default obc(Item, COMPONENT)
