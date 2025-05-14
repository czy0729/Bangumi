/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:46:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 16:33:40
 */
import React from 'react'
import { Flex } from '@components'
import { IconTouchable } from '@_'
import { _, tinygrailStore } from '@stores'
import { confirm } from '@utils'
import { ob } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
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
    onAuctionCancel = FROZEN_FN
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
    <Flex style={styles.control}>
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
      {!isAuction && showMenu && !isICO && (
        <Popover
          event={event}
          id={monoId || id}
          relation={_relation}
          subject={_subject}
          subjectId={_subjectId}
          onCollect={tinygrailStore.toggleCollect}
        />
      )}
    </Flex>
  )
}

export default ob(Control)
