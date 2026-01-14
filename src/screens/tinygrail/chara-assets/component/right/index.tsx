/*
 * @Author: czy0729
 * @Date: 2020-05-03 13:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-02 16:24:17
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { IconTouchable, Popover } from '@_'
import { _, tinygrailStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import TinygrailIconGo from '@tinygrail/_/icon-go'
import {
  DATA,
  DATA_ICO,
  TABS,
  TEXT_BATCH_ASKS,
  TEXT_BATCH_ASKS_AVG,
  TEXT_BATCH_ASKS_DEAL_1,
  TEXT_BATCH_ASKS_MINUS_1,
  TEXT_BATCH_ASKS_MINUS_10,
  TEXT_BATCH_ASKS_MULTI_1,
  TEXT_BATCH_ASKS_MULTI_2,
  TEXT_BATCH_SACRIFICE,
  TEXT_BATCH_SALE,
  TEXT_BATCH_SHARE
} from '../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Right({ $ }: Ctx) {
  r(COMPONENT)

  return useObserver(() => {
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
                case TEXT_BATCH_SACRIFICE:
                  $.doBatchSacrifice()
                  break

                case TEXT_BATCH_SALE:
                  $.doBatchSacrifice(true)
                  break

                case TEXT_BATCH_ASKS:
                  $.doBatchAsk()
                  break

                case TEXT_BATCH_ASKS_MINUS_1:
                  $.doBatchAsk(-1)
                  break

                case TEXT_BATCH_ASKS_MINUS_10:
                  $.doBatchAsk(-10)
                  break

                case TEXT_BATCH_ASKS_MULTI_1:
                  $.doBatchAsk(1.1)
                  break

                case TEXT_BATCH_ASKS_MULTI_2:
                  $.doBatchAsk(1.2)
                  break

                case TEXT_BATCH_ASKS_AVG:
                  $.doBatchAsk(100)
                  break

                case TEXT_BATCH_ASKS_DEAL_1:
                  $.doBatchAsk(200)
                  break

                case TEXT_BATCH_SHARE:
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
        <TinygrailIconGo $={$} />
        {title !== '圣殿' && (
          <Popover
            style={styles.icon}
            data={title === 'ICO' ? DATA_ICO : DATA}
            onSelect={key => {
              if (tinygrailStore.checkAuth()) {
                $.toggleBatchEdit(key)

                t('我的持仓.右上角菜单', {
                  key
                })
              }
            }}
          >
            <Iconfont name='md-menu-open' color={_.colorTinygrailPlain} />
          </Popover>
        )}
      </Flex>
    )
  })
}

export default Right
