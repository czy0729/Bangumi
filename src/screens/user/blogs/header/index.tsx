/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:34:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:36:29
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { IconBookmarks } from '@_'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <HeaderComp
      title='用户日志'
      hm={[$.url, 'Blogs']}
      headerRight={() => (
        <Flex>
          <IconBookmarks navigation={navigation} />
          <HeaderComp.Popover
            data={['浏览器查看']}
            onSelect={key => {
              if (key === '浏览器查看') {
                t('用户日志.右上角菜单', { key })
                open($.url)
              }
            }}
          >
            <Heatmap id='用户日志.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
