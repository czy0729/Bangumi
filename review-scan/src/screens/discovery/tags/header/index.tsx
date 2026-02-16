/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:10:02
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_SPA } from '@constants'
import RecSegement from '../component/rec-segment'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title='标签'
      alias='标签索引'
      hm={$.hm}
      headerTitleAlign='left'
      headerRight={() => (
        <>
          {!!$.state._loaded && <RecSegement value={$.state.rec} onValueChange={$.onValueChange} />}
          <HeaderV2Popover
            data={DATA}
            onSelect={title => {
              if (title === TEXT_BROWSER) {
                open($.url)
              } else if (title === TEXT_SPA) {
                open(`${URL_SPA}/${getSPAParams('Tags')}`)
              }

              t('标签索引.右上角菜单', {
                key: title
              })
            }}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
