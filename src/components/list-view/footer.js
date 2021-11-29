/*
 * @Author: czy0729
 * @Date: 2021-11-30 03:43:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 04:05:48
 */
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _, systemStore } from '@stores'
import { randomSpeech } from '@constants/speech'
import { Flex } from '../flex'
import { Mesume } from '../mesume'
import { Text } from '../text'
import { RefreshState } from './ds'

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
    case RefreshState.Idle:
      return <View style={styles.container} />

    case RefreshState.Failure:
      return (
        <TouchableOpacity
          onPress={() => {
            if (length === 0) {
              if (onHeaderRefresh) onHeaderRefresh(RefreshState.HeaderRefreshing)
            } else if (onFooterRefresh) {
              onFooterRefresh(RefreshState.FooterRefreshing)
            }
          }}
        >
          {footerFailureComponent || (
            <View style={styles.container}>
              <Text
                style={styles.text}
                type={footerTextType}
                size={13}
                lineHeight={15}
                align='center'
              >
                {footerFailureText}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )

    case RefreshState.EmptyData:
      return (
        <TouchableOpacity
          onPress={() => {
            if (onHeaderRefresh) {
              onHeaderRefresh(RefreshState.HeaderRefreshing)
            }
          }}
        >
          {footerEmptyDataComponent || (
            <Flex style={styles.empty} direction='column' justify='center'>
              {showMesume && <Mesume size={80} />}
              <Text
                style={[styles.text, _.mt.sm]}
                type={footerTextType}
                size={13}
                lineHeight={15}
                align='center'
              >
                {footerEmptyDataText}
              </Text>
            </Flex>
          )}
        </TouchableOpacity>
      )

    case RefreshState.FooterRefreshing:
      return (
        footerRefreshingComponent || (
          <Flex style={styles.noMore} justify='center' direction='column'>
            <ActivityIndicator size='small' />
            <Text
              style={[styles.text, _.mt.sm]}
              type={footerTextType}
              align='center'
              size={13}
              lineHeight={15}
            >
              {footerRefreshingText}
            </Text>
          </Flex>
        )
      )

    case RefreshState.NoMoreData:
      return (
        footerNoMoreDataComponent ||
        (showMesume ? (
          <Flex style={styles.noMore} justify='center' direction='column'>
            <Mesume size={80} />
            {systemStore.setting.speech && (
              <Text
                style={[styles.text, _.mt.sm]}
                type={footerTextType}
                align='center'
                size={13}
                lineHeight={15}
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

const styles = _.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: _.lg
  },
  text: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    ..._.fontSize(14)
  },
  empty: {
    minHeight: 240
  },
  noMore: {
    padding: 8
  }
})
