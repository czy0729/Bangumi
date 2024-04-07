/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:27:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:23:34
 */
import React from 'react'
import { Track } from '@components'
import { ErrorNotice, LoginNotice } from '@_'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Extra(props, { $, navigation }: Ctx) {
  return (
    <>
      <Track title='首页' hm={$.hm} />
      <ErrorNotice />
      {!STORYBOOK && <LoginNotice navigation={navigation} />}
    </>
  )
}

export default obc(Extra, COMPONENT)
