/*
 * @Author: czy0729
 * @Date: 2021-01-21 16:01:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-14 18:34:54
 */
import React from 'react'
import CompProgress from '@ant-design/react-native/lib/progress'
import { ob } from '@utils/decorators'
import { IMG_WIDTH } from '@constants'
import { _ } from '@stores'

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
  },
  layout: {
    width: _.window.width - 2 * _.wind - IMG_WIDTH - _._wind
  }
}))
