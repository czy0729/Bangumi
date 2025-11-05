/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:46:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:13:41
 */
import React from 'react'
import { Flex } from '@components'
import { IconTouchable } from '@_'
import { _, tinygrailStore } from '@stores'
import { confirm } from '@utils'
import { useObserver } from '@utils/hooks'
import { EVENT, FROZEN_FN } from '@constants'
import TinygrailPopover from '../../popover'
import TinygrailStatus from '../../status'
import TinygrailStockPreview from '../../stock-preview'
import { memoStyles } from './styles'
import { Props } from './types'

function Control(props: Props) {
  return useObserver(() => {
    const styles = memoStyles()
    const {
      id,
      type,
      monoId,
      event = EVENT,
      state,
      end,
      withoutFeedback = false,
      showMenu = true,
      showStatus,
      onAuctionCancel = FROZEN_FN
    } = props

    // 当前的竞拍状态
    const isAuction = type === 'auction'
    let auctionText = '竞拍中'
    if (type === 'auction') {
      if (state === 1) {
        auctionText = '成功'
      } else if (state === 2) {
        auctionText = '失败'
      }
    }

    return (
      <Flex style={styles.control}>
        {isAuction && auctionText === '竞拍中' && (
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
        {!isAuction && (
          <>
            <TinygrailStockPreview {...props} style={styles.stockPreview} _loaded />
            {/* 有 end 代表是 ICO 项 */}
            {showMenu && !end && (
              <TinygrailPopover
                event={event}
                id={monoId || id}
                subject={props._subject}
                subjectId={props._subjectId}
                relation={props._relation}
                onCollect={tinygrailStore.toggleCollect}
              />
            )}
          </>
        )}
        {showStatus && <TinygrailStatus style={styles.status} id={id} />}
      </Flex>
    )
  })
}

export default Control
