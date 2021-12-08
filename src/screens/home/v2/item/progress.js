/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 14:50:11
 */
import React from 'react'
import CompProgress from '@ant-design/react-native/lib/progress'
import { ob } from '@utils/decorators'
import { _ } from '@stores'

function Progress({ epStatus, subject }) {
  const styles = memoStyles()
  const percent = subject.eps_count
    ? (parseInt(epStatus || 0) / parseInt(subject.eps_count)) * 100
    : 0
  return (
    <CompProgress style={styles.progress} barStyle={styles.bar} percent={percent} />
  )
}

export default ob(Progress)

const memoStyles = _.memoStyles(() => ({
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
