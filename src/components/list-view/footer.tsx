/*
 * @Author: czy0729
 * @Date: 2021-11-30 03:43:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 08:35:58
 */
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { systemStore } from '@stores'
import { Flex } from '../flex'
import { Mesume } from '../mesume'
import { randomSpeech } from '../mesume/utils'
import { Text } from '../text'
import { REFRESH_STATE } from './ds'
import { foolterStyles as styles } from './styles'

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
  length,
  refreshState,
  showMesume,
  onHeaderRefresh,
  onFooterRefresh
}) {
  switch (refreshState) {
    case REFRESH_STATE.Idle:
      return <View style={styles.container} />

    case REFRESH_STATE.Failure:
      return (
        <TouchableOpacity
          onPress={() => {
            if (length === 0) {
              if (typeof onHeaderRefresh === 'function') {
                onHeaderRefresh(REFRESH_STATE.HeaderRefreshing)
              }
              return
            }

            if (typeof onFooterRefresh === 'function') {
              onFooterRefresh(REFRESH_STATE.FooterRefreshing)
            }
          }}
        >
          {footerFailureComponent || (
            <View style={styles.container}>
              <Text
                style={styles.text}
                type={footerTextType}
                size={13}
                lineHeight={17}
                align='center'
              >
                {footerFailureText}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )

    case REFRESH_STATE.EmptyData:
      return (
        <TouchableOpacity
          onPress={() => {
            if (typeof onHeaderRefresh === 'function') {
              onHeaderRefresh(REFRESH_STATE.HeaderRefreshing)
            }
          }}
        >
          {footerEmptyDataComponent || (
            <Flex style={styles.empty} direction='column' justify='center'>
              {showMesume && <Mesume size={80} />}
              <Text
                style={styles.textMt}
                type={footerTextType}
                size={13}
                lineHeight={17}
                align='center'
              >
                {footerEmptyDataText}
              </Text>
            </Flex>
          )}
        </TouchableOpacity>
      )

    case REFRESH_STATE.FooterRefreshing:
      return (
        footerRefreshingComponent || (
          <Flex style={styles.noMore} justify='center' direction='column'>
            <ActivityIndicator size='small' />
            <Text
              style={styles.textMt}
              type={footerTextType}
              align='center'
              size={13}
              lineHeight={17}
            >
              {footerRefreshingText}
            </Text>
          </Flex>
        )
      )

    case REFRESH_STATE.NoMoreData:
      return (
        footerNoMoreDataComponent ||
        (showMesume ? (
          <Flex style={styles.noMore} justify='center' direction='column'>
            <Mesume size={80} />
            {systemStore.setting.speech && (
              <Text
                style={styles.textMt}
                type={footerTextType}
                align='center'
                size={13}
                lineHeight={17}
              >
                {filterText ? `已过滤${filterText}个敏感条目` : randomSpeech()}
              </Text>
            )}
          </Flex>
        ) : null)
      )

    default:
      return null
  }
}

export default observer(Footer)
