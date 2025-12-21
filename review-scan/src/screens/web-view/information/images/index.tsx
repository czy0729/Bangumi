/*
 * @Author: czy0729
 * @Date: 2023-12-23 11:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-23 14:51:29
 */
import React from 'react'
import { View } from 'react-native'
import { Image } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Images({ data }: { data: string[] }) {
  if (!data.length) return null

  const styles = memoStyles()
  return (
    <>
      {data.map(item => (
        <View key={item} style={styles.image}>
          <Image src={item} autoSize={_.window.width - _.wind * 2 - 2} placeholder={false} />
        </View>
      ))}
    </>
  )
}

export default ob(Images)
