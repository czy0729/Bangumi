/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:46:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 05:31:45
 */
import React from 'react'
import { IconTouchable } from '@_'
import { tinygrailStore, _ } from '@stores'
import { confirm } from '@utils'
import { obc } from '@utils/decorators'
import Popover from '../../popover'
import StockPreview from '../../stock-preview'
import { styles } from './styles'
import { Props } from './types'

function Control(props: Props) {
  const {
    _subject,
    _subjectId,
    _relation,
    id,
    type,
    monoId,
    event,
    showMenu,
    state,
    end,
    withoutFeedback,
    onAuctionCancel = () => {}
  } = props
  const isICO = !!end
  const isAuction = type === 'auction'

  let auctionText = '竞拍中'
  if (type === 'auction') {
    if (state === 1) {
      auctionText = '成功'
    } else if (state === 2) {
      auctionText = '失败'
    }
  }
  const auctioning = auctionText === '竞拍中'

  return (
    <>
      {isAuction && auctioning && (
        <IconTouchable
          style={styles.auctionCancel}
          name='md-close'
          color={_.colorTinygrailPlain}
          size={18}
          withoutFeedback={withoutFeedback}
          onPress={() => {
            confirm('周六取消需要收取手续费, 确定取消?', () => onAuctionCancel(id))
          }}
        />
      )}
      {!isAuction && <StockPreview {...props} style={styles.stockPreview} _loaded />}
      {showMenu && !isICO && (
        <Popover
          event={event}
          id={monoId || id}
          relation={_relation}
          subject={_subject}
          subjectId={_subjectId}
          onCollect={tinygrailStore.toggleCollect}
        />
      )}
    </>
  )
}

export default obc(Control)
