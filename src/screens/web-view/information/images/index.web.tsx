/*
 * @Author: czy0729
 * @Date: 2023-12-23 11:11:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 16:35:12
 */
import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'

function Images({ data = [] }: { data: string[] }) {
  if (!data.length) return null

  return (
    <>
      {data.map(item => (
        <View key={item} style={styles.image}>
          <img src={item} rel='noreferrer' referrerPolicy='no-referrer' alt='' />
        </View>
      ))}
    </>
  )
}

export default Images
