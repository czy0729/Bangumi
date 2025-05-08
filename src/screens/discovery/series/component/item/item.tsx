/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:26:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:08:56
 */
import React from 'react'
import { View } from 'react-native'
import { Divider } from '@components'
import { asc } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_OBJECT } from '@constants'
import Subject from '../subject'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

export default memo(
  ({ styles, data = FROZEN_ARRAY, index = 0, subjects = FROZEN_OBJECT }) => {
    if (!data.length) return null

    // 以最小的 subjectId 作为 pid
    const id = Math.min(...(data as number[]))
    const sub = data.filter(item => item !== id)
    return (
      <>
        <View>
          <Subject id={id} section={index} />
          {!!sub.length && (
            <View style={styles.sub}>
              {sub
                .sort((a, b) =>
                  asc(subjects[a]?.date || '9999-99-99', subjects[b]?.date || '9999-99-99')
                )
                .map((item, idx) => (
                  <Subject
                    key={item}
                    style={styles.subItem}
                    id={item}
                    small
                    section={index}
                    index={idx + 1}
                  />
                ))}
            </View>
          )}
        </View>
        <Divider />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)
