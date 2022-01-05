/*
 * @Author: czy0729
 * @Date: 2022-01-05 03:52:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-05 03:53:16
 */
import React from 'react'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconMenu() {
  return <Iconfont name='md-menu' color={_.colorTitle} />
}

export default ob(IconMenu)
