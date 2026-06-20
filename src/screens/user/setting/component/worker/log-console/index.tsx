/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 04:57:38
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { formatTime } from './utils'
import { LEVEL_COLORS, LEVEL_PREFIX } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

/** 日志控制台 */
function LogConsole({ title, logs }: Props) {
  const styles = memoStyles()

  return (
    <View style={styles.container}>
      {/* 标题栏 */}
      <View style={styles.header}>
        <Text size={11} type='sub' bold>
          {title}
        </Text>
        <Text size={10} type='sub'>
          {logs.length} 条
        </Text>
      </View>

      {/* 日志内容 */}
      <View style={[styles.content, !logs.length && styles.empty]}>
        {logs.length ? (
          logs.reverse().map(log => (
            <View key={`${log.time}|${log.message}`} style={styles.row}>
              {/* 时间 */}
              <Text style={styles.time} size={10}>
                {formatTime(log.time)}
              </Text>

              {/* 等级前缀 */}
              <Text
                style={{
                  color: LEVEL_COLORS[log.level as keyof typeof LEVEL_COLORS],
                  ...styles.level
                }}
                size={10}
              >
                {LEVEL_PREFIX[log.level as keyof typeof LEVEL_PREFIX]}
              </Text>

              {/* 消息 */}
              <Text style={styles.message} size={10} numberOfLines={2} ellipsizeMode='middle'>
                {log.message.replace(/代理/g, '服务')}
              </Text>
            </View>
          ))
        ) : (
          <Text type='sub' size={10}>
            暂无日志
          </Text>
        )}
      </View>
    </View>
  )
}

export default observer(LogConsole)
