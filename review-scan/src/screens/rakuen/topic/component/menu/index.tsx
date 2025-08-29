/*
 * @Author: czy0729
 * @Date: 2025-02-07 06:15:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-07 06:27:18
 */
import React from 'react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { copy, getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, DATA, TEXT_COPY, TEXT_REPORT, TEXT_SHARE, TEXT_SPA } from './ds'
import { styles } from './styles'

function Menu() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2Popover
      style={styles.menu}
      data={[`帖子 · ${$.topicId}`, ...DATA]}
      onSelect={key => {
        switch (key) {
          case TEXT_SPA:
            open(
              `${URL_SPA}/${getSPAParams('Topic', {
                topicId: $.topicId
              })}`
            )
            break

          case TEXT_COPY:
            copy($.url, '已复制链接')
            break

          case TEXT_SHARE:
            copy(`【链接】${$.title} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
            break

          case TEXT_REPORT:
            open(`${HOST}/group/forum`)
            break

          default:
            open($.url)
            break
        }

        t('帖子.右上角菜单', {
          key: key.includes('帖子') ? '浏览器查看' : key
        })
      }}
    />
  )
}

export default ob(Menu, COMPONENT)
