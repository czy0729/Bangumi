/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:45:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 20:46:48
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title={$.params?.name ? `${$.params.name}的修订历史` : '修订历史'}
      alias='修订历史'
      hm={[$.url, 'SubjectWiki']}
      headerTitleStyle={styles.title}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('修订历史.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='修订历史.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
