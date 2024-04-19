/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 16:47:09
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.name ? `${$.params.name}的制作人员` : '更多制作人员'}
      alias='制作人员'
      hm={[$.url, 'Persons']}
      headerTitleStyle={styles.title}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('制作人员.右上角菜单', { key })
              open($.url)
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
