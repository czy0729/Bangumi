/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 16:09:22
 */
import React from 'react'
import { Progress as CompProgress } from '@ant-design/react-native'
import { ob } from '@utils/decorators'
import { _ } from '@stores'
import { wrapWidth } from './ds'

function Progress({ epStatus, subject }) {
  const styles = memoStyles()
  const percent = subject.eps_count
    ? (parseInt(epStatus || 0) / parseInt(subject.eps_count)) * 100
    : 0
  return (
    <CompProgress
      style={styles.progress}
      barStyle={styles.bar}
      wrapWidth={wrapWidth}
      percent={percent}
    />
  )
}

export default ob(Progress)

const memoStyles = _.memoStyles(_ => ({
  progress: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 4
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 4,
    borderRadius: 4
  }
}))
