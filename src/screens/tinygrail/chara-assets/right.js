/*
 * @Author: czy0729
 * @Date: 2020-05-03 13:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:10:47
 */
import React from 'react'
import { Iconfont } from '@components'
import { Popover, IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import IconGo from '../_/icon-go'

const data = ['批量献祭', '批量出售', '批量挂卖单', '批量分享']
const dataICO = ['批量分享']

function IconRight({ $ }) {
  const { page, editing, batchAction } = $.state
  if (editing) {
    return (
      <>
        <IconTouchable
          name='close'
          size={20}
          color={_.colorTinygrailPlain}
          onPress={$.toggleBatchEdit}
        />
        <IconTouchable
          style={styles.check}
          name='check-simple'
          size={20}
          color={_.colorTinygrailPlain}
          onPress={() => {
            switch (batchAction) {
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
      </>
    )
  }

  return (
    <>
      <IconGo $={$} />
      {(page === 0 || page === 1) && (
        <Popover
          style={styles.icon}
          data={page === 1 ? dataICO : data}
          onSelect={key => {
            t('我的持仓.右上角菜单', {
              key
            })

            $.toggleBatchEdit(key)
          }}
        >
          <Iconfont name='list' size={21} color={_.colorTinygrailPlain} />
        </Popover>
      )}
    </>
  )
}

export default ob(IconRight)

const styles = _.create({
  icon: {
    padding: _.sm,
    paddingTop: _.sm + 1,
    paddingLeft: _.xs,
    marginRight: IOS ? -_.sm : 0
  },
  check: {
    marginRight: IOS ? -_.sm : 0,
    marginLeft: _.xs
  }
})
