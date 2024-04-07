/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 11:12:25
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { userStore } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Filter from '../component/filter'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER } from './ds'
import { styles } from './styles'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.name || '用户评分'}
      headerTitleAlign='left'
      headerTitleStyle={styles.title}
      alias='用户评分'
      hm={[$.url, 'Rating']}
      headerRight={() => (
        <Flex>
          {userStore.isLogin && <Filter $={$} />}
          <HeaderComp.Popover
            data={DATA}
            onSelect={key => {
              if (key === TEXT_BROWSER) {
                t('用户评分.右上角菜单', { key })
                open($.url)
              }
            }}
          >
            <Heatmap id='用户评分.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
