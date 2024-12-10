/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:20:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:29:24
 */
import React from 'react'
import { Flex, Header as HeaderComp, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { copy, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import Favor from '../component/favor'
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
      title={$.title}
      alias='日志'
      hm={$.hm}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <Flex style={styles.headerRight}>
          <Favor $={$} />
          <HeaderV2Popover
            data={DATA}
            onSelect={title => {
              switch (title) {
                case TEXT_MENU_BROWSER:
                  open($.url)
                  break

                case TEXT_MENU_COPY_LINK:
                  copy($.url, '已复制链接')
                  break

                case TEXT_MENU_COPY_SHARE:
                  copy(`【链接】${$.title} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
                  break

                default:
                  break
              }

              t('日志.右上角菜单', {
                key: title
              })
            }}
          />
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
