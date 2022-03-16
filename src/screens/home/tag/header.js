/*
 * @Author: czy0729
 * @Date: 2022-03-15 18:36:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:11:07
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function Header(props, { $ }) {
  const { type, tag } = $.params
  return (
    <CompHeader
      title={`${MODEL_SUBJECT_TYPE.getTitle(type)}标签 ${tag}`}
      alias='用户标签'
      hm={[$.url, 'Tag']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('用户标签.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='用户标签.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
