/*
 * @Author: czy0729
 * @Date: 2024-08-09 07:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 08:53:01
 */
import React from 'react'
import { Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function All(props, { $ }: Ctx) {
  return (
    <Touchable style={styles.touch} onPress={$.onToggleExpand}>
      <Iconfont
        name={$.state.expand ? 'md-radio-button-on' : 'md-radio-button-off'}
        size={15}
        color={_.colorDesc}
      />
    </Touchable>
  )
}

export default obc(All)

const styles = _.create({
  touch: {
    padding: 4,
    marginLeft: _.sm
  }
})
