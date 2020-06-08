/*
 * @Author: czy0729
 * @Date: 2020-05-03 13:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 00:47:34
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Iconfont } from '@components'
import { Popover, IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import IconGo from '../_/icon-go'

const data = ['批量献祭']

function IconRight({ $ }) {
  const { page, editing } = $.state
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
          onPress={$.doBatchSacrifice}
        />
      </>
    )
  }

  return (
    <>
      <IconGo $={$} />
      {page === 0 && (
        <Popover
          style={styles.icon}
          data={data}
          onSelect={key => {
            t('我的持仓.右上角菜单', {
              key
            })

            switch (key) {
              case '批量献祭':
                $.toggleBatchEdit()
                break
              default:
                break
            }
          }}
        >
          <Iconfont name='list' size={20} color={_.colorTinygrailPlain} />
        </Popover>
      )}
    </>
  )
}

export default observer(IconRight)

const styles = StyleSheet.create({
  icon: {
    padding: _.sm,
    paddingLeft: _.xs,
    marginRight: IOS ? -_.sm : 0
  },
  check: {
    marginRight: IOS ? -_.sm : 0,
    marginLeft: _.xs
  }
})
