/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:37:34
 */
import React from 'react'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Favor from '../favor'
import Extra from './extra'
import { COMPONENT } from './ds'

function ExtraWrap({ $, navigation }: Ctx) {
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
}

export default ob(ExtraWrap, COMPONENT)
