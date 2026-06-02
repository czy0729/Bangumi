/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 10:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet, Flex, Loading, Text, Touchable } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { IconTouchable } from '../../icon'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as RecommendTopicProps } from './types'
export type { RecommendTopicProps }

/** 推荐帖子列表 */
export const RecommendTopic = observer(
  ({
    navigation,
    title = '相似帖子',
    visible,
    loading,
    data,
    iconSize = 11,
    footerNoMoreText = '- 到底了 -',
    onShow,
    onHide,
    onLoadMore
  }: RecommendTopicProps) => {
    r(COMPONENT)

    const styles = memoStyles()

    const { list, pagination } = data
    const { page, pageTotal } = pagination
    const hasMore = page < pageTotal

    return (
      <>
        <IconTouchable style={styles.icon} size={iconSize} name='icon-series' onPress={onShow} />
        <ActionSheet show={visible} title={title} height={680} onClose={onHide}>
          <Flex style={styles.list} direction='column' justify={!list.length ? 'center' : 'start'}>
            {!!list.length ? (
              <>
                {list.map(item => (
                  <Item key={item.id} {...item} navigation={navigation} onClose={onHide} />
                ))}
                {hasMore ? (
                  <Touchable style={styles.loadMore} onPress={onLoadMore}>
                    <Flex justify='center'>
                      {loading ? (
                        <Loading.Medium />
                      ) : (
                        <Text type='sub' size={13}>
                          加载更多
                        </Text>
                      )}
                    </Flex>
                  </Touchable>
                ) : (
                  <Flex style={styles.loadMore} justify='center'>
                    <Text type='sub' size={13}>
                      {footerNoMoreText}
                    </Text>
                  </Flex>
                )}
              </>
            ) : loading ? (
              <Flex style={_.mt.md} justify='center'>
                <Loading />
              </Flex>
            ) : (
              <Flex style={_.mt.md} justify='center'>
                <Text type='sub' size={13}>
                  暂无相关帖子
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex style={styles.ft} justify='end'>
            <Text
              type='icon'
              size={11}
              onPress={() => {
                onHide()

                setTimeout(() => {
                  navigation.push('Zone', {
                    userId: 'wataame'
                  })
                }, 320)
              }}
            >
              Powered by ry.mk · @wataame
            </Text>
          </Flex>
        </ActionSheet>
      </>
    )
  }
)

export default RecommendTopic
