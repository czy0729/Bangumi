/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:26:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 00:34:39
 */
import React from 'react'
import { View } from 'react-native'
import { asc } from '@utils'
import { memo } from '@utils/decorators'
import Subject from '../subject'
import { DEFAULT_PROPS } from './ds'

export default memo(({ styles, data, subjects }) => {
  if (!data.length) return null

  // 以最小的subjectId作为pid
  const id = Math.min(...data)
  const sub = data.filter(item => item !== id)
  return (
    <View>
      <Subject id={id} />
      {!!sub.length && (
        <View style={styles.sub}>
          {sub
            .sort((a, b) =>
              asc(subjects[a]?.date || '9999-99-99', subjects[b]?.date || '9999-99-99')
            )
            .map(item => (
              <Subject key={item} style={styles.subItem} id={item} />
            ))}
        </View>
      )}
    </View>
  )
}, DEFAULT_PROPS)
