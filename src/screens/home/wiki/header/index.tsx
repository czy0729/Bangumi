/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:45:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:51:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <HeaderV2
      title={$.params?.name ? `${$.params.name}的修订历史` : '修订历史'}
      alias='修订历史'
      hm={$.hm}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === '浏览器查看') {
              open($.url)

              t('修订历史.右上角菜单', {
                key: title
              })
            }
          }}
        />
      )}
    />
  )
}

export default observer(Header)
