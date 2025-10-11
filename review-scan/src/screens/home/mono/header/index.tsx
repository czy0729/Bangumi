/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 15:19:13
 */
import React from 'react'
import { Flex, Header as HeaderComp, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { cnjp, copy, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import Extra from '../component/extra'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'
import { styles } from './styles'

function Header({ fixed }) {
  const { $, navigation } = useStore<Ctx>()
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
          <Extra />
          <HeaderV2Popover
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
          />
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
