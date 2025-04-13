/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:38:10
 */
import React from 'react'
import { IconWordCloud } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
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
      <IconWordCloud
        onPress={() => {
          navigation.push('WordCloud', {
            monoId: $.monoId
          })

          t('人物.跳转', {
            to: 'WordCloud',
            monoId: $.monoId
          })
        }}
      />
      <Favor $={$} />
    </>
  )
}

export default ob(ExtraWrap, COMPONENT)
