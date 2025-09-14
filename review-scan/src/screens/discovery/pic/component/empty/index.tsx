/*
 * @Author: czy0729
 * @Date: 2025-06-10 17:43:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-28 00:32:26
 */
import React from 'react'
import { Divider, Flex, Text, Touchable } from '@components'
import { _, monoStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Pagination from '../pagination'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Empty({ showPagination = true }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const noResult = !$.list.length
    return (
      <>
        <Flex style={noResult && styles.container} direction='column' justify='center'>
          {noResult && (
            <Text style={_.mt.md} type='sub' size={16} bold>
              没有相关数据
            </Text>
          )}
          {!!$.keywords.length && (
            <>
              <Divider style={_.mt.lg} />
              <Text style={_.mt.md} type='sub' size={13}>
                可尝试搜索
              </Text>
              {$.keywords
                .filter(item => {
                  if (!item || item.length > 16 || item.includes('/')) return false

                  return !/^第.*(季|期)$/.test(item)
                })
                .filter((_, index) => index < 8)
                .map(item => {
                  const picTotal = monoStore.picTotal(item)
                  const textType = picTotal === 0 ? 'icon' : 'desc'
                  return (
                    <Touchable
                      key={item}
                      style={_.mt.md}
                      onPress={() => {
                        navigation.push('Pic', {
                          monoId: $.params.monoId,
                          name: item
                        })
                      }}
                    >
                      <Text type={textType} size={13}>
                        <Text type={textType} size={13} underline>
                          {item}
                        </Text>
                        {picTotal !== undefined ? ` (${picTotal > 99 ? '99+' : picTotal})` : ''}
                      </Text>
                    </Touchable>
                  )
                })}
            </>
          )}
        </Flex>
        {showPagination && <Pagination />}
      </>
    )
  })
}

export default Empty
