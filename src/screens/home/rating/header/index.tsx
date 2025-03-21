/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 18:18:59
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import Filter from '../component/filter'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title={$.params?.name || '用户评分'}
      headerTitleAlign='left'
      headerTitleStyle={styles.headerTitleStyle}
      alias='用户评分'
      hm={$.hm}
      headerRight={() => (
        <>
          <Filter $={$} />
          <HeaderV2Popover
            data={DATA}
            onSelect={title => {
              if (title === TEXT_MENU_BROWSER) {
                open($.url)

                t('用户评分.右上角菜单', {
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
