/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:21:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-13 18:35:55
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='搜索'
      hm={[$.url, 'Search']}
      headerRight={() => (
        <Flex>
          {systemStore.setting.s2t && (
            <Touchable style={styles.touch} onPress={$.onT2S}>
              <Text bold>简</Text>
            </Touchable>
          )}
          <HeaderComp.Popover
            data={['浏览器查看']}
            onSelect={key => {
              if (key === '浏览器查看') {
                t('搜索.右上角菜单', { key })

                open($.url)
              }
            }}
          >
            <Heatmap id='搜索.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
