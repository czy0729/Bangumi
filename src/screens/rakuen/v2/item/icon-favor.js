/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:41:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-02 15:50:16
 */
import React from 'react'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconFavor({ topicId }, { $ }) {
  if (!$.isFavor(topicId)) return null

  return <Iconfont style={styles.icon} size={15} name='md-star' color={_.colorYellow} />
}

export default obc(IconFavor)

const styles = _.create({
  icon: {
    position: 'absolute',
    right: 15,
    bottom: 17
  }
})
