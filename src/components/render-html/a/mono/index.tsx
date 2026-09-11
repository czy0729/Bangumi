/*
 * @Author: czy0729
 * @Date: 2025-01-19 09:32:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 20:22:17
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Cover } from '../../../cover'
import { flexStyle } from '../../../flex'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import { memoStyles } from './styles'

import type { Props } from './types'

function Mono({ text, cover, name, nameCn, onLinkPress }: Props) {
  const styles = memoStyles()

  /**
   * {HOST_BGM_STATIC}/r/400/pic/crt/l/fc/77/114888_crt_hd3gG.jpg ->
   * {HOST_BGM_STATIC}/pic/crt/g/fc/77/114888_crt_hd3gG.jpg
   */
  const gCover =
    typeof cover === 'string' ? cover.replace(/\/r\/\d+/g, '').replace(/\/(l|m)\//g, '/g/') : ''
  const bottom = (nameCn === text ? name : nameCn) || ''

  return (
    <View style={styles.wrap}>
      <Touchable animate style={stl(flexStyle(), styles.body)} onPress={onLinkPress}>
        <Cover src={gCover} size={48} radius />
        <View style={_.ml.sm}>
          <Text style={styles.top} size={11} bold numberOfLines={2}>
            {text}
          </Text>
          {!!bottom && bottom !== text && (
            <View style={_.mt.xs}>
              <Text style={styles.bottom} type='sub' size={10} bold numberOfLines={1}>
                {bottom}
              </Text>
            </View>
          )}
        </View>
      </Touchable>
    </View>
  )
}

export default observer(Mono)
