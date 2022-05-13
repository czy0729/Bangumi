/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-14 07:00:43
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function BtnBookNext({ subjectId, epStatus, volStatus }, { $ }) {
  return (
    <Touchable
      style={styles.touch}
      onPress={() => $.doUpdateNext(subjectId, epStatus, volStatus)}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
      </Flex>
    </Touchable>
  )
}

export default obc(BtnBookNext)

const styles = _.create({
  touch: {
    marginLeft: _.device(0, 4),
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 34,
    height: 34
  },
  icon: {
    marginBottom: -1
  }
})
