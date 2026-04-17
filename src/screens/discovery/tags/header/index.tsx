/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:53:37
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { URL_SPA } from '@constants'
import RecSegement from '../component/rec-segment'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { _loaded, rec } = $.state

  const handleHeaderRight = useCallback(
    () => (
      <>
        {!!_loaded && <RecSegement value={rec} onValueChange={$.onValueChange} />}
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
    ),
    [$, _loaded, rec]
  )

  return (
    <HeaderV2
      title='标签'
      alias='标签索引'
      hm={$.hm}
      headerTitleAlign='left'
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
