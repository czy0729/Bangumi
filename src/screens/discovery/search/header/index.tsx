/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:21:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:54:07
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import T2S from '../component/t2s'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title='搜索'
      hm={$.hm}
      headerRight={() => (
        <>
          <T2S $={$} />
          <HeaderV2Popover
            data={DATA}
            onSelect={title => {
              if (title === TEXT_MENU_BROWSER) {
                open($.url)

                t('搜索.右上角菜单', {
                  key: title
                })
              }
            }}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
