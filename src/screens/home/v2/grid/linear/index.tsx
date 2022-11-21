/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:33:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:32:22
 */
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Linear() {
  global.rerender('Home.Grid.Linear')

  if (!_.isDark) return null

  return (
    <LinearGradient
      style={styles.linear}
      colors={[
        `rgba(${_.colorPlainRaw.join()}, 1)`,
        `rgba(${_.colorPlainRaw.join()}, 0.8)`,
        `rgba(${_.colorPlainRaw.join()}, 0.32)`,
        `rgba(${_.colorPlainRaw.join()}, 0)`
      ]}
    />
  )
}

export default ob(Linear)
