/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 10:25:34
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

function Header(_props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.name ? `${$.params.name}的制作人员` : '更多制作人员'}
      alias='制作人员'
      hm={[$.url, 'Persons']}
      headerTitleStyle={styles.title}
      headerRight={() => (
        <HeaderComp.Popover
          data={DATA}
          onSelect={key => {
            if (key === TEXT_MENU_BROWSER) {
              open($.url)

              t('制作人员.右上角菜单', {
                key
              })
            }
          }}
        >
          <Heatmap id='制作人员.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
