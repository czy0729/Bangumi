/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 10:26:49
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Text, Touchable, UserStatus } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { r } from '@utils/dev'
import { IMG_DEFAULT_AVATAR } from '@constants'
import { USERS_MAP } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ViewStyle } from '@types'

function Item({ w, h, x, y, data, percent, price, isFilter, onPress, onLongPress }) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const ratio = (percent + 1) ** 2
    const ratioHeight = (Math.min(w, h) / _.window.height) * 1.2
    const showAvatar =
      !isFilter && !!data && price >= 10 && (w * h) / (_.window.width * _.window.height) > 0.016
    const avatarSize = Math.min(64, parseInt(String(ratioHeight * 240)))

    let backgroundStyle: ViewStyle
    if (price >= 100) {
      backgroundStyle = styles.l4
    } else if (price >= 50) {
      backgroundStyle = styles.l3
    } else if (price >= 20) {
      backgroundStyle = styles.l2
    } else if (price >= 10) {
      backgroundStyle = styles.l1
    }

    const elName = (
      <Text
        size={USERS_MAP[data]?.n?.length >= 8 ? 9 : Math.min(13, parseInt(String(10 * ratio)))}
        numberOfLines={2}
        bold
        align='center'
        selectable={false}
      >
        {HTMLDecode(USERS_MAP[data]?.n)}
      </Text>
    )

    return (
      <View
        style={[
          styles.item,
          {
            top: y,
            left: x
          }
        ]}
      >
        <Touchable
          style={{
            width: w,
            height: h
          }}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <Flex
            style={[
              styles.body,
              {
                width: w,
                height: h,
                backgroundColor: _.colorPlain
              },
              backgroundStyle
            ]}
            direction='column'
            justify='center'
          >
            {showAvatar && (
              <View
                style={{
                  marginBottom: Math.floor(5.6 * ratio)
                }}
                pointerEvents='none'
              >
                <UserStatus
                  style={backgroundStyle}
                  userId={USERS_MAP[data]?.i || data}
                  mini={avatarSize < 32}
                >
                  <Avatar
                    src={
                      USERS_MAP[data]?.a
                        ? `https://lain.bgm.tv/pic/user/l/000/${USERS_MAP[data]?.a}.jpg`
                        : IMG_DEFAULT_AVATAR
                    }
                    size={avatarSize}
                    borderWidth={0}
                  />
                </UserStatus>
              </View>
            )}
            <Flex style={styles.content} justify='center'>
              {showAvatar ? (
                elName
              ) : (
                <UserStatus style={backgroundStyle} userId={USERS_MAP[data]?.i || data} mini>
                  <View style={_.mh.sm}>{elName}</View>
                </UserStatus>
              )}
            </Flex>
          </Flex>
        </Touchable>
        <View
          style={stl(
            styles.border,
            !x && {
              borderLeftWidth: 0
            },
            !y && {
              borderTopWidth: 0
            }
          )}
          pointerEvents='none'
        />
      </View>
    )
  })
}

export default Item
