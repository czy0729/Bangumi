/*
 * @Author: czy0729
 * @Date: 2020-05-03 13:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:30:35
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { IconTouchable, Popover } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconGo from '@tinygrail/_/icon-go'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT, DATA, DATA_ICO } from './ds'
import { styles } from './styles'

function Right({ $ }: Ctx) {
  if ($.state.editing) {
    return (
      <Flex>
        <IconTouchable
          style={_.mr.xs}
          name='md-close'
          color={_.colorTinygrailPlain}
          onPress={$.toggleBatchEdit}
        />
        <IconTouchable
          name='md-check'
          color={_.colorTinygrailPlain}
          onPress={() => {
            switch ($.state.batchAction) {
              case '批量献祭':
                $.doBatchSacrifice()
                break

              case '批量出售':
                $.doBatchSacrifice(true)
                break

              case '批量挂卖单':
                $.doBatchAsk()
                break

              case '批量分享':
                $.doBatchShare()
                break

              default:
                break
            }
          }}
        />
      </Flex>
    )
  }

  const { title } = TABS[$.state.page]
  return (
    <Flex>
      <IconGo $={$} />
      {title !== '圣殿' && (
        <Popover
          style={styles.icon}
          data={title === 'ICO' ? DATA_ICO : DATA}
          onSelect={key => {
            t('我的持仓.右上角菜单', {
              key
            })

            $.toggleBatchEdit(key)
          }}
        >
          <Iconfont name='md-menu-open' color={_.colorTinygrailPlain} />
        </Popover>
      )}
    </Flex>
  )
}

export default ob(Right, COMPONENT)
