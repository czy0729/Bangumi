/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 22:53:07
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatTime } from './utils'
import { LEVEL_COLORS, LEVEL_PREFIX, WORKER_TYPE_FILTERS } from './ds'
import { styles } from './styles'

import type { Props } from './types'

/** 日志控制台 */
function LogConsole({ title, logs, showFilters = false, typeFilters }: Props) {
  const filters = typeFilters || WORKER_TYPE_FILTERS
  const defaultActiveTypes = new Set(filters.map((f: { key: string }) => f.key))
  const [activeTypes, setActiveTypes] = useState<Set<string>>(defaultActiveTypes)

  const toggleType = (type: string) => {
    setActiveTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  const filteredLogs = showFilters
    ? logs.filter(log => !log.type || activeTypes.has(log.type))
    : logs

  return (
    <View style={styles.container}>
      {/* 标题栏 */}
      <View style={styles.header}>
        <Text type='sub' size={11} bold>
          {title}
        </Text>
        <View style={styles.filters}>
          {showFilters &&
            filters.map(({ key, label }) => (
              <Touchable key={key} onPress={() => toggleType(key)}>
                <View style={[styles.filterBtn, activeTypes.has(key) && styles.filterBtnActive]}>
                  <Text type={activeTypes.has(key) ? 'main' : 'sub'} size={9} bold>
                    {label}
                  </Text>
                </View>
              </Touchable>
            ))}
          <Text style={_.ml.sm} type='sub' size={10}>
            {filteredLogs.length} 条
          </Text>
        </View>
      </View>

      {/* 日志内容 */}
      <View style={[styles.content, !filteredLogs.length && styles.empty]}>
        {filteredLogs.length ? (
          filteredLogs.reverse().map((log, index) => (
            <View
              key={`${log.time}|${log.message}`}
              style={[styles.row, index === filteredLogs.length - 1 && styles.rowLast]}
            >
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

export { WORKER_TYPE_FILTERS, ECH_TYPE_FILTERS } from './ds'
