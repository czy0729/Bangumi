/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 14:49:10
 */
import React from 'react'
import CompProgress from '@ant-design/react-native/lib/progress'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Progress({ epStatus, subject }) {
  const styles = memoStyles()
  const count = subject.eps || subject.eps_count || 0
  const percent = Math.floor(count ? (Number(epStatus || 0) / Number(count)) * 100 : 0)
  return (
    <CompProgress
      style={styles.progress}
      barStyle={styles.bar}
      wrapWidth={styles.layout.width}
      percent={percent}
    />
  )
}

export default ob(Progress)
