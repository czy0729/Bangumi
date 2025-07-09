/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 18:30:50
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, TextType, Touchable } from '@components'
import { _, userStore, useStore } from '@stores'
import { getTimestamp, lastDate, stl } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import TinygrailAvatar from '@tinygrail/_/avatar'
import { decimal } from '@tinygrail/_/utils'
import { Ctx } from '../../types'
import Balance from '../balance'
import { afterTax } from './utils'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function Item({
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
  lastActiveDate,
  lastIndex,
  state
}) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const balance = $.balance(userId)
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

    const text: string[] = []
    let right = ''
    if (title === '周股息') {
      if (balance) text.push(`现金${decimal(balance)}`)
      text.push(`周股息${shareText}`)
      right = `税后 ${decimal(afterTax(share))}`
    } else if (title === '流动资产') {
      text.push(`资产总值${assetsText}`, `周股息${shareText}`)
      right = totalText
    } else {
      if (balance) text.push(`现金${decimal(balance)}`)
      text.push(`税后${decimal(afterTax(share))}`)
      right = assetsText
    }
    text.push(lastDate(lastActiveTS))

    const isBan = state === 666

    return (
      <>
        {index === 0 && <Balance />}
        <View
          style={stl(
            styles.container,
            userStore.myId && userStore.myId === userId && styles.highlight
          )}
        >
          <Flex align='start'>
            <View style={_.mt.md}>
              <TinygrailAvatar
                navigation={navigation}
                src={avatar}
                size={38}
                userId={userId}
                name={nickname}
                last={lastActiveDate}
                event={EVENT}
              />
            </View>
            <Flex.Item style={styles.wrap}>
              <Flex align='start'>
                <Flex.Item style={_.mr.sm}>
                  <Touchable
                    style={styles.item}
                    onPress={() => {
                      navigation.push('TinygrailTree', {
                        userName: userId,
                        name: nickname
                      })

                      t('番市首富.跳转', {
                        to: 'TinygrailTree',
                        userId
                      })
                    }}
                  >
                    <Flex>
                      <Flex.Item>
                        <Flex>
                          <Text style={styles.rank} size={11} bold align='center'>
                            {rank}
                          </Text>
                          <Text type={isBan ? 'ask' : 'tinygrailPlain'} bold>
                            {nickname}
                            {isBan ? ' [已封禁] ' : ''}
                            {!!changeText && <Text type={changeColor}> {changeText}</Text>}
                          </Text>
                        </Flex>
                        <Text style={_.mt.xs} type='tinygrailText' size={12} lineHeight={13}>
                          {text.join(' / ')}
                        </Text>
                      </Flex.Item>
                      <Text style={_.ml.sm} type='tinygrailPlain'>
                        {right}
                      </Text>
                      <Iconfont
                        style={_.mr._sm}
                        name='md-navigate-next'
                        color={_.colorTinygrailText}
                      />
                    </Flex>
                  </Touchable>
                </Flex.Item>
              </Flex>
            </Flex.Item>
          </Flex>
        </View>
      </>
    )
  })
}

export default Item
