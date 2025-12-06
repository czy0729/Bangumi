/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-07 04:43:17
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <HeaderV2
      title={$.params.title}
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(
                `${HOST}/subject/${$.params.subjectId}/${
                  $.params.path === '关联' ? 'relations' : 'offprints'
                }`
              )

              t('照片墙.右上角菜单', {
                key: title
              })
            }
          }}
        />
      )}
    />
  ))
}

export default Header
