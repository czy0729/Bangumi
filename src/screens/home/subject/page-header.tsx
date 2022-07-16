/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-16 08:15:35
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { copy, cnjp, open, info } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import HeaderTitle from './header-title'
import IconShare from './icon/share'

function Header({ fixed }, { $, navigation }) {
  const color = _.isDark || !fixed ? '#fff' : '#000'
  return (
    <CompHeader
      mode='transition'
      statusBarEventsType='Subject'
      fixed={fixed}
      title='条目'
      hm={[$.url, 'Subject']}
      headerTitle={<HeaderTitle $={$} />}
      headerRight={() => (
        <Flex>
          <IconShare $={$} navigation={navigation} color={color} />
          <CompHeader.Popover
            data={[`浏览器打开 · ${$.subjectId}`, '复制链接', '复制分享', '重置布局']}
            color={color}
            onSelect={key => {
              t('条目.右上角菜单', {
                subjectId: $.subjectId,
                key
              })

              setTimeout(() => {
                switch (key) {
                  case '复制链接':
                    copy($.url, '已复制链接')
                    break

                  case '复制分享':
                    copy(
                      `【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`,
                      '已复制分享文案'
                    )
                    break

                  case '重置布局':
                    systemStore.resetSubjectLayout()
                    info('已重置')
                    break

                  default:
                    open($.url)
                    break
                }
              }, 0)
            }}
          >
            <Heatmap id='条目.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
