/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:27:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 01:30:40
 */
import React from 'react'
import { Track } from '@components'
import { LoginNotice } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Extra(props, { $, navigation }: Ctx) {
  return (
    <>
      <Track title='首页' hm={$.hm} />
      <LoginNotice navigation={navigation} />
    </>
  )
}

export default obc(Extra, COMPONENT)
