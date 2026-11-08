/*
 * @Author: czy0729
 * @Date: 2023-12-23 11:11:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:00:00
 *
 * 说明页配图 (web)
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { memoStyles } from './styles'

import type { Props } from './types'

function Images({ data }: Props) {
  if (!data.length) return null

  const styles = memoStyles()

  return (
    <>
      {data.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.image}>
          <img src={item} rel='noreferrer' referrerPolicy='no-referrer' alt='' />
        </View>
      ))}
    </>
  )
}

export default observer(Images)
