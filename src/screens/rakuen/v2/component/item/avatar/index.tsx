/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:49:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目头像
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar as AvatarComp, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { keepBasicChars } from '@utils'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

/** 无头像占位配色, 每项为 [底色, 字色] */
const LIGHT_PALETTE = [
  ['252, 227, 230', '186, 68, 84'],
  ['253, 235, 219', '178, 104, 42'],
  ['250, 242, 214', '152, 116, 30'],
  ['224, 241, 228', '56, 128, 82'],
  ['219, 240, 242', '40, 118, 130'],
  ['222, 235, 250', '54, 104, 172'],
  ['232, 228, 248', '102, 80, 168'],
  ['232, 234, 238', '96, 104, 116']
]
const DARK_PALETTE = [
  ['76, 48, 52', '246, 168, 176'],
  ['76, 58, 42', '242, 182, 128'],
  ['72, 66, 40', '232, 208, 116'],
  ['44, 70, 54', '136, 212, 160'],
  ['40, 68, 72', '124, 206, 214'],
  ['42, 60, 80', '146, 182, 234'],
  ['58, 50, 78', '182, 164, 236'],
  ['54, 58, 64', '176, 184, 196']
]

/** 占位首字: 跳过符号取首个文字, 整段都是符号时退回首个字符 */
function getPlaceholderChar(text: string) {
  const basic = keepBasicChars(text)
  if (basic) return basic.slice(0, 1)

  return Array.from(text.trim())[0] || ''
}

/** 整段文案决定配色, 相同文案得到相同颜色 */
function getPlaceholderColor(text: string, isDark: boolean) {
  let value = 0
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) | 0

  const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE
  const [bg, fg] = palette[Math.abs(value) % palette.length]
  return {
    backgroundColor: `rgb(${bg})`,
    color: `rgb(${fg})`
  }
}

function Avatar({ src, name, userId, priority, text }: Props) {
  const { navigation } = useStore<Ctx>()

  const styles = memoStyles()

  if (!src) {
    const seed = String(text || '')
    const { backgroundColor, color } = getPlaceholderColor(seed, _.isDark)
    return (
      <View style={styles.avatar}>
        <View
          style={[
            styles.placeholder,
            {
              borderRadius: systemStore.setting.avatarRound ? _.r(40) : _.radiusSm,
              backgroundColor
            }
          ]}
        >
          <Text size={16} bold style={{ color }}>
            {getPlaceholderChar(seed)}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.avatar}>
      <AvatarComp
        navigation={navigation}
        src={src}
        userId={userId}
        name={name}
        priority={priority}
        params={{
          _id: userId,
          _name: name,
          _image: src
        }}
        event={{
          id: '超展开.跳转',
          data: {
            to: 'Zone',
            userId
          }
        }}
      />
    </View>
  )
}

export default observer(Avatar)
