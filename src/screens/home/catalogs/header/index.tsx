/*
 * @Author: czy0729
 * @Date: 2022-03-15 00:48:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:47:29
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title={$.params?.name ? `包含${$.params.name}的目录` : '条目目录'}
      alias='条目目录'
      hm={[$.url, 'SubjectCatalogs']}
      headerTitleStyle={styles.title}
      headerRight={() => (
        <HeaderComp.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('条目目录.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='条目目录.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
