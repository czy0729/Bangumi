/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:33:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-26 04:54:58
 */
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { styles } from './styles'

function Linear() {
  rerender('Home.Grid.Linear')

  if (!_.isDark) return null

  return (
    <LinearGradient
      style={styles.linear}
      colors={[
        `rgba(${_.colorPlainRaw.join()}, 1)`,
        `rgba(${_.colorPlainRaw.join()}, 0.8)`,
        `rgba(${_.colorPlainRaw.join()}, 0.24)`,
        `rgba(${_.colorPlainRaw.join()}, 0)`
      ]}
    />
  )
}

export default ob(Linear)
