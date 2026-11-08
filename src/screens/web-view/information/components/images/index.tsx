/*
 * @Author: czy0729
 * @Date: 2023-12-23 11:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:00:00
 *
 * 说明页配图
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { _ } from '@stores'
import { memoStyles } from './styles'

import type { Props } from './types'

function Images({ data }: Props) {
  if (!data.length) return null

  const styles = memoStyles()

  return (
    <>
      {data.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.image}>
          <Image src={item} autoSize={_.window.width - _.wind * 2 - 2} placeholder={false} />
        </View>
      ))}
    </>
  )
}

export default observer(Images)
