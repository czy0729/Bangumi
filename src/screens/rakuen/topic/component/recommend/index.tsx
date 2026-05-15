/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-15 22:41:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet, Flex, Loading, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Recommend() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { recommendVisible, recommendLoading, recommendTopics } = $.state
  const { list, pagination } = recommendTopics
  const { page, pageTotal } = pagination
  const hasMore = page < pageTotal

  return (
    <>
      <IconTouchable style={styles.icon} size={18} name='icon-series' onPress={$.showRecommend} />
      <ActionSheet show={recommendVisible} title='相似帖子' height={680} onClose={$.hideRecommend}>
        <Flex style={styles.list} direction='column' justify='center'>
          {!!list.length ? (
            <>
              {list.map(item => (
                <Item key={item.id} {...item} navigation={navigation} onClose={$.hideRecommend} />
              ))}
              {hasMore && (
                <Touchable style={styles.loadMore} onPress={$.fetchRecommendTopics}>
                  <Flex justify='center'>
                    {recommendLoading ? (
                      <Loading.Medium />
                    ) : (
                      <Text type='sub' size={13}>
                        加载更多
                      </Text>
                    )}
                  </Flex>
                </Touchable>
              )}
            </>
          ) : recommendLoading ? (
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
              $.hideRecommend()

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

export default observer(Recommend)
