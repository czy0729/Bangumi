/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 15:16:51
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_SPLIT } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title={$.params?.name ? `${$.params.name}的作品` : '更多作品'}
      alias='作品'
      hm={$.hm}
      headerRight={() => (
        <HeaderV2Popover
          data={[...DATA, TEXT_MENU_SPLIT, ...$.toolBar]}
          onSelect={title => {
            if (title === '浏览器查看') {
              open($.url)

              t('作品.右上角菜单', {
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

export default ob(Header, COMPONENT)
