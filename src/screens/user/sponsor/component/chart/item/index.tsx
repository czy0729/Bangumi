/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 19:06:32
 */
import { memo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, flexStyle, Text, Touchable, UserStatus } from '@components'
import { _ } from '@stores'
import { getVisualLength, HTMLDecode, stl } from '@utils'
import { r } from '@utils/dev'
import { LEVELS, USERS_MAP } from '../../../ds'
import { getLevelIndex } from '../../../utils'
import ItemAvatar from './avatar'
import { getItemMetrics } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

/** treemap 单个色块 */
function Item({ w, h, x, y, data, percent, price, isMine, onPress, onLongPress }: Props) {
  r(COMPONENT)

  const styles = memoStyles()
  const { ratio, showAvatar, avatarSize, fontSize } = getItemMetrics(w, h, percent)

  const levelIndex = getLevelIndex(price)
  const backgroundStyle = isMine
    ? styles.mine
    : levelIndex >= 0
    ? styles[LEVELS[levelIndex].level]
    : undefined
  const name = HTMLDecode(USERS_MAP[data]?.n || `@${data}`)

  const visualLength = getVisualLength(name)
  const elName = (
    <Text
      size={fontSize - (visualLength >= 12 ? 2 : visualLength >= 8 ? 1 : 0)}
      numberOfLines={2}
      bold
      align='center'
      selectable={false}
    >
      {name}
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
        style={stl(
          flexStyle({ direction: 'column', justify: 'center' }),
          {
            width: w,
            height: h,
            backgroundColor: _.colorPlain
          },
          styles.body,
          backgroundStyle
        )}
        onPress={() => onPress(data)}
        onLongPress={onLongPress ? () => onLongPress(data) : undefined}
        accessibilityRole='button'
        accessibilityLabel={`${name} 支持额 ${price}`}
      >
        {showAvatar && (
          <ItemAvatar
            data={data}
            size={avatarSize}
            marginBottom={Math.floor(5.6 * ratio)}
            style={backgroundStyle}
          />
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
}

export default memo(observer(Item))
