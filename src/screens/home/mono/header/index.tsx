/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 03:03:04
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { IconWordCloud } from '@_'
import { cnjp, copy, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import Extra from '../component/extra'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

function Header({ fixed }, { $, navigation }: Ctx) {
  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title='人物'
      domTitle={$.jp || $.cn}
      hm={[$.url, 'Mono']}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <Flex style={styles.headerRight}>
          <IconWordCloud
            onPress={() => {
              navigation.push('WordCloud', {
                monoId: $.monoId
              })

              t('人物.跳转', {
                to: 'WordCloud',
                monoId: $.monoId
              })
            }}
          />
          <Extra $={$} navigation={navigation} />
          <HeaderComp.Popover
            data={DATA}
            onSelect={key => {
              switch (key) {
                case TEXT_MENU_BROWSER:
                  open($.url)
                  break

                case TEXT_MENU_COPY_LINK:
                  copy($.url, '已复制链接')
                  break

                case TEXT_MENU_COPY_SHARE:
                  copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
                  break

                default:
                  break
              }

              t('人物.右上角菜单', {
                key
              })
            }}
          >
            <Heatmap id='人物.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
