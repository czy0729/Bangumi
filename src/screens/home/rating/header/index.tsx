/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 18:12:04
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { userStore } from '@stores'
import Filter from '../filter'
import { Ctx } from '../types'
import { styles } from './styles'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title={$.params?.name || '用户评分'}
      headerTitleAlign='left'
      headerTitleStyle={styles.title}
      alias='用户评分'
      hm={[$.url, 'Rating']}
      headerRight={() => (
        <Flex>
          {userStore.isLogin && <Filter $={$} />}
          <CompHeader.Popover
            data={['浏览器查看']}
            onSelect={key => {
              if (key === '浏览器查看') {
                t('用户评分.右上角菜单', { key })
                open($.url)
              }
            }}
          >
            <Heatmap id='用户评分.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
