/*
 * @Author: czy0729
 * @Date: 2025-03-14 07:47:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 04:17:03
 */
import React from 'react'
import { Flex, ScrollView } from '@components'
import { Tag } from '@_'
import { _, useStore } from '@stores'
import { desc } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Summary() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { list } = $.state.data
    if (!list.length) return null

    const v: Record<string, number> = {}
    const b: Record<string, number> = {}
    list.forEach(({ u }) => {
      const infos = $.infos(u)
      if (!infos) return

      if (v[infos.v]) {
        v[infos.v] += 1
      } else {
        v[infos.v] = 1
      }

      if (infos.b) {
        const temp = infos.b.split(' (')?.[0]
        if (b[temp]) {
          b[temp] += 1
        } else {
          b[temp] = 1
        }
      }
    })

    return (
      <>
        <ScrollView style={styles.summary} horizontal>
          <Flex>
            {Object.entries(v)
              .sort((a: any[], b: any[]) => desc(a[1], b[1]))
              .map(item => (
                <Tag key={item[0]} style={_.mr.sm} value={`${item[0]} (${item[1]})`} />
              ))}
          </Flex>
        </ScrollView>
        <ScrollView style={styles.summary} horizontal>
          <Flex>
            {Object.entries(b)
              .sort((a: any[], b: any[]) => desc(a[1], b[1]))
              .map(item => (
                <Tag key={item[0]} style={_.mr.sm} value={`${item[0]} (${item[1]})`} />
              ))}
          </Flex>
        </ScrollView>
      </>
    )
  })
}

export default Summary
