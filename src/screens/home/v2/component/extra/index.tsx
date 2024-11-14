/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:27:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:14:26
 */
import React from 'react'
import { Track } from '@components'
import { ErrorNotice, LoginNotice } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Extra() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <>
      <Track title='首页' hm={$.hm} />
      <ErrorNotice />
      {!WEB && <LoginNotice navigation={navigation} />}
    </>
  )
}

export default ob(Extra, COMPONENT)
