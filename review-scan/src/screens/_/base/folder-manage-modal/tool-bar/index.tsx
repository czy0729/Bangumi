/*
 * @Author: czy0729
 * @Date: 2025-03-17 12:11:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-19 06:27:46
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { SORT_DS } from '../ds'
import { styles } from './styles'
import { Props } from './types'

function ToolBar({ sortType, sortOrder, onSortType }: Props) {
  return (
    <Flex style={styles.toolBar}>
      <Iconfont style={_.mr.sm} name='md-sort' size={16} color={_.colorDesc} />
      {SORT_DS.map(item => {
        const isActive = item.value === sortType
        return (
          <Touchable
            key={item.value}
            style={_.mr.md}
            onPress={() => {
              onSortType(item.value)
            }}
          >
            <Flex>
              <Text style={_.mr.xs} type={isActive ? 'desc' : 'sub'} size={12}>
                {item.label}
              </Text>
              {isActive && (
                <>
                  <Iconfont
                    name='md-arrow-drop-down'
                    color={sortOrder === 'desc' ? _.colorDesc : _.colorIcon}
                    size={20}
                  />
                  <Iconfont
                    style={styles.dropUp}
                    name='md-arrow-drop-up'
                    color={sortOrder === 'asc' ? _.colorDesc : _.colorIcon}
                    size={20}
                  />
                </>
              )}
            </Flex>
          </Touchable>
        )
      })}
    </Flex>
  )
}

export default ToolBar
