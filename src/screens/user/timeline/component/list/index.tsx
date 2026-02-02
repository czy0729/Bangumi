/*
 * @Author: czy0729
 * @Date: 2020-07-21 13:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 15:55:19
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        {$.yearsTimeline.map((item, index) => (
          <View key={item.title}>
            {/* 加入时长 */}
            <View>
              <View style={styles.lineBottom} />
              <View style={styles.nodeYear} />
              <Flex>
                <Text size={18} lineHeight={48} type='title' bold>
                  {item.title}年{' '}
                </Text>
                {index === 0 && (
                  <Text style={_.ml.sm} size={12} bold>
                    加入 Bangumi
                    <Text type='main' size={12} bold>
                      {' '}
                      {$.days}{' '}
                    </Text>
                    天
                  </Text>
                )}
              </Flex>
              <Heatmap id='时间线.跳转' />
            </View>

            {/* 活动列表 */}
            {item.data.map(item => (
              <View key={item.title}>
                {/* 动作 */}
                <View>
                  <View style={styles.line} />
                  <View style={styles.nodeMonth} />
                  <View style={styles.block}>
                    <Text size={18} lineHeight={24} type='title' bold>
                      {parseInt(item.title.slice(5, 7))}月
                    </Text>
                    <Flex>
                      {!!item.actions['看过'] && (
                        <Text style={_.mr.sm} size={13} lineHeight={20} type='sub'>
                          看过{' '}
                          <Text size={13} lineHeight={20} type='main' bold>
                            {item.actions['看过']}{' '}
                          </Text>
                        </Text>
                      )}
                      {!!item.actions['在看'] && (
                        <Text style={_.mr.sm} size={13} lineHeight={20} type='sub'>
                          在看{' '}
                          <Text size={13} lineHeight={20} type='main' bold>
                            {item.actions['在看']}{' '}
                          </Text>
                        </Text>
                      )}
                      {!!item.actions['想看'] && (
                        <Text style={_.mr.sm} size={13} lineHeight={20} type='sub'>
                          想看{' '}
                          <Text size={13} lineHeight={20} type='main' bold>
                            {item.actions['想看']}{' '}
                          </Text>
                        </Text>
                      )}
                      {!!item.actions['搁置'] && (
                        <Text style={_.mr.sm} size={13} lineHeight={20} type='sub'>
                          搁置{' '}
                          <Text size={13} lineHeight={20} type='main' bold>
                            {item.actions['搁置']}{' '}
                          </Text>
                        </Text>
                      )}
                      {!!item.actions['抛弃'] && (
                        <Text style={_.mr.sm} size={13} lineHeight={20} type='sub'>
                          抛弃{' '}
                          <Text size={13} lineHeight={20} type='main' bold>
                            {item.actions['抛弃']}{' '}
                          </Text>
                        </Text>
                      )}
                    </Flex>
                  </View>
                </View>

                {/* 条目节点 */}
                <View>
                  {item.data.map(item => {
                    const splits = item.title.split('-')
                    const label = `${Number(splits[1])}月${Number(splits[2])}日`

                    return (
                      <View key={item.title}>
                        <View>
                          <View style={styles.line} />
                          <Text lineHeight={28} bold>
                            {label}
                          </Text>
                        </View>
                        <View>
                          <View style={styles.line} />
                          {item.data.map(item => (
                            <Item key={item.id} {...item} />
                          ))}
                        </View>
                      </View>
                    )
                  })}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  })
}

export default List
