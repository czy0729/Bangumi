/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-07 19:03:15
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { API_AVATAR } from '@constants'
import { USERS_MAP } from '../ds'
import { memoStyles } from './styles'

function Item({ w, h, x, y, data, percent, price, isFilter, onPress, onLongPress }) {
  const styles = memoStyles()
  const ratio = (percent + 1) ** 2
  const ratioHeight = (Math.min(w, h) / _.window.height) * 1.2
  const showAvatar =
    !isFilter &&
    !!data &&
    price >= 10 &&
    (w * h) / (_.window.width * _.window.height) > 0.018
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
      <Touchable onPress={onPress} onLongPress={onLongPress}>
        <Flex
          style={[
            styles.body,
            {
              width: w,
              height: h,
              backgroundColor: _.colorPlain
            }
          ]}
          direction='column'
          justify='center'
        >
          {showAvatar && (
            <View
              style={{
                marginBottom: parseInt(String(5.6 * ratio))
              }}
              pointerEvents='none'
            >
              <Avatar
                src={API_AVATAR(USERS_MAP[data]?.i)}
                size={parseInt(String(ratioHeight * 240))}
                radius={parseInt(String(ratioHeight * 240 * 0.4))}
                borderWidth={0}
              />
            </View>
          )}
          <Flex style={styles.content} justify='center'>
            {price >= 10 && (
              <View
                style={[
                  styles.dot,
                  price >= 10 && styles.dot1,
                  price >= 20 && styles.dot2,
                  price >= 50 && styles.dot3,
                  price >= 100 && styles.dot4,
                  price >= 200 && styles.dot5
                ]}
                pointerEvents='none'
              />
            )}
            <Text
              size={Math.min(14, parseInt(String(10 * ratio)))}
              numberOfLines={1}
              bold
              selectable={false}
            >
              {USERS_MAP[data]?.n}
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <View style={styles.border} pointerEvents='none' />
    </View>
  )
}

export default ob(Item)
