/*
 * @Author: czy0729
 * @Date: 2022-08-19 11:16:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:25:32
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { getVisualLength } from '@utils'
import RelatedPM from './related-pm'
import ScrollNavButtons from './scroll-nav-buttons'
import { COMPONENT, HM } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'
function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { thread } = $.state
  const threadLength = $.threads?.length
  const listLength = $.pmList?.list?.length

  const handleHeaderRight = useCallback(
    () => (
      <>
        {!!thread && (
          <IconTouchable
            style={_.mr._xs}
            name='md-subdirectory-arrow-right'
            color={_.colorTitle}
            size={18}
            onPress={() => $.onThreadChange('')}
          />
        )}
        {(threadLength >= 2 || listLength >= 8) && (
          <ScrollNavButtons
            onPrevThread={$.onPrevThread}
            onNextThread={$.onNextThread}
            onScrollToTop={$.scrollToTopEnd}
            onScrollToBottom={$.scrollToBottomEnd}
          />
        )}
        <RelatedPM
          navigation={navigation}
          threads={$.threads}
          url={$.url}
          isNewPM={!!$.userId}
          peerUserId={$.pmDetail?.form?.peerUserId}
          peerUserName={$.pmDetail?.form?.peerUserName}
          pmFormhash={$.pmDetail?.form?.formhash}
          pmMsgReceivers={$.pmDetail?.form?.msg_receivers}
          onThreadChange={$.onThreadChange}
        />
      </>
    ),
    [$, listLength, navigation, thread, threadLength]
  )

  return (
    <HeaderV2
      title={$.headerTitle}
      headerTitleStyle={styles.headerTitle}
      headerTitleTextStyle={getVisualLength($.headerTitle) >= 10 && styles.headerTitleText}
      hm={HM}
      headerTitleAlign='left'
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
