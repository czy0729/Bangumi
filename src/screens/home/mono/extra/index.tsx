/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 19:25:26
 */
import React from 'react'
import { ob } from '@utils/decorators'
import Favor from '../favor'
import { Ctx } from '../types'
import Extra from './extra'

export default ob(({ $, navigation }: Ctx) => {
  // global.rerender('Mono.Extra')

  return (
    <>
      {$.monoId.includes('character') && $.tinygrail && (
        <Extra
          navigation={navigation}
          monoId={$.monoId}
          canICO={$.canICO}
          icoUsers={$.chara.users}
          doICO={$.doICO}
        />
      )}
      <Favor $={$} />
    </>
  )
})
