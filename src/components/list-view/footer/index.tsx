/*
 * @Author: czy0729
 * @Date: 2021-11-30 03:43:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 01:41:54
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { REFRESH_STATE } from '../ds'
import FooterEmptyData from './empty-data'
import FooterFailure from './failure'
import FooterNoMoreData from './no-more-data'
import FooterRefreshing from './refreshing'
import { styles } from './styles'

export { FooterEmptyData, FooterFailure, FooterNoMoreData, FooterRefreshing }

import type { FooterProps } from './types'

/** 列表底部区域，根据刷新状态展示不同内容 */
function Footer({
  filterText,
  footerEmptyDataComponent,
  footerEmptyDataText,
  footerFailureComponent,
  footerFailureText,
  footerNoMoreDataComponent,
  footerRefreshingComponent,
  footerRefreshingText,
  footerTextType,
  page,
  pageTotal,
  refreshState,
  showMesume
}: FooterProps) {
  switch (refreshState) {
    case REFRESH_STATE.Idle:
      return <View style={styles.container} />

    case REFRESH_STATE.Failure:
      return (
        footerFailureComponent || (
          <FooterFailure text={footerFailureText} textType={footerTextType} />
        )
      )

    case REFRESH_STATE.EmptyData:
      return (
        footerEmptyDataComponent || (
          <FooterEmptyData
            text={footerEmptyDataText}
            showMesume={showMesume}
            textType={footerTextType}
          />
        )
      )

    case REFRESH_STATE.FooterRefreshing:
      return (
        footerRefreshingComponent || (
          <FooterRefreshing
            text={footerRefreshingText}
            page={page}
            pageTotal={pageTotal}
            textType={footerTextType}
          />
        )
      )

    case REFRESH_STATE.NoMoreData:
      return (
        footerNoMoreDataComponent || (
          <FooterNoMoreData
            filterText={filterText}
            showMesume={showMesume}
            textType={footerTextType}
          />
        )
      )

    default:
      return <View style={styles.container} />
  }
}

export default observer(Footer)
