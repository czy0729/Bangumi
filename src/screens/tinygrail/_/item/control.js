/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:46:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-06 05:24:52
 */
import React from 'react'
import { Alert } from 'react-native'
import { Text, Touchable } from '@components'
import { tinygrailStore, _ } from '@stores'
import { obc } from '@utils/decorators'
import Popover from '../popover'
import StockPreview from '../stock-preview'

function Control(props) {
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
    users,
    withoutFeedback,
    onAuctionCancel
  } = props
  const isICO = users !== undefined
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
        <Touchable
          style={styles.auctionCancel}
          withoutFeedback={withoutFeedback}
          onPress={() =>
            Alert.alert('警告', '周六取消需要收取手续费, 确定取消?', [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: () => onAuctionCancel(id)
              }
            ])
          }
        >
          <Text type='tinygrailText'>[取消]</Text>
        </Touchable>
      )}
      {!isAuction && (
        <StockPreview {...props} style={styles.stockPreview} _loaded />
      )}
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

const styles = _.create({
  auctionCancel: {
    paddingVertical: _.md,
    paddingLeft: _.md
  },
  stockPreview: {
    marginRight: -12
  }
})
