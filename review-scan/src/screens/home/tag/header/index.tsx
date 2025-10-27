/*
 * @Author: czy0729
 * @Date: 2022-07-30 11:02:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 03:44:44
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPLIT } from '@constants'
import { Ctx } from '../types'
import { DATA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { tag } = $.params
  return (
    <HeaderV2
      title={tag ? `${$.typeCn} · ${tag}` : `${$.typeCn}标签`}
      alias='用户标签'
      hm={$.hm}
      headerRight={() => (
        <HeaderV2Popover
          data={[...DATA, TEXT_MENU_SPLIT, ...$.toolBar]}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('用户标签.右上角菜单', {
                key: title
              })
            } else {
              $.onToolBar(title)
            }
          }}
        />
      )}
    />
  )
}

export default ob(Header)
