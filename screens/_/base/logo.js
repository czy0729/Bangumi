/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-02 15:18:07
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function Logo() {
  return (
    <Touchable onPress={_.toggleMode}>
      <Iconfont
        size={32}
        name='logo'
        color={_.select(_.colorTitle, _.colorDesc)}
      />
    </Touchable>
  )
}

export default observer(Logo)
