/*
 * @Author: czy0729
 * @Date: 2025-12-17 01:39:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 02:19:13
 */
import React, { useCallback, useEffect, useState } from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Notice } from '@_'
import { _ } from '@stores'
import { findRelationPath } from './utils'
import { memoStyles } from './styles'

import type { RelateMap } from '../../../types'

function BFS({ map }: { map: RelateMap }) {
  const [startId, setStartId] = useState<string | number>(0)
  const [endId, setEndId] = useState<string | number>(0)
  const [desc, setDesc] = useState('')

  const handlePress = useCallback(
    (id: string | number) => {
      if (id === startId) {
        setStartId(0)
        return
      }

      if (id === endId) {
        setEndId(0)
        return
      }

      if (!startId) {
        setStartId(id)
        return
      }

      setEndId(id)
    },
    [endId, startId]
  )

  useEffect(() => {
    if (startId && endId) {
      const { pathDescription } = findRelationPath(startId, endId, map.node, map.relate)
      setDesc(pathDescription)
    } else {
      setDesc('')
    }
  }, [endId, map, startId])

  return useObserver(() => {
    const styles = memoStyles()

    let { node } = map
    if (startId && endId) node = node.filter(item => item.id === startId || item.id === endId)

    return (
      <>
        {!!desc && <Notice style={_.mt.md}>{desc}</Notice>}
        <Flex style={_.mt.md} direction='column' align='start'>
          {node.map(item => (
            <Touchable key={item.id} style={styles.item} onPress={() => handlePress(item.id)}>
              <Flex>
                {startId === item.id && (
                  <Text style={_.mr.xs} type='primary' size={11}>
                    起点
                  </Text>
                )}
                {endId === item.id && (
                  <Text style={_.mr.xs} type='warning' size={11}>
                    终点
                  </Text>
                )}
                <Text type='sub' size={11}>
                  {item.nameCN || item.name}{' '}
                  {!!item.date && (
                    <Text type='icon' size={9} lineHeight={11}>
                      {item.date.slice(0, 7)}
                    </Text>
                  )}
                </Text>
              </Flex>
            </Touchable>
          ))}
        </Flex>
      </>
    )
  })
}

export default BFS
