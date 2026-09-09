/*
 * @Author: czy0729
 * @Date: 2025-03-14 07:47:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 14:00:52
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, ScrollView } from '@components'
import { BlurView, Tag } from '@_'
import { _, useStore } from '@stores'
import { desc } from '@utils'
import Stats from '../stats'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Summary() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { showStats, data } = $.state
  if (!showStats) return null

  const { list } = data
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
    <View style={styles.summary}>
      <BlurView style={styles.blur}>
        <ScrollView style={styles.row} horizontal>
          <Flex>
            {Object.entries(v)
              .sort((a: any[], b: any[]) => desc(a[1], b[1]))
              .map(item => (
                <Tag key={item[0]} style={_.mr.sm} value={`${item[0]} (${item[1]})`} />
              ))}
          </Flex>
        </ScrollView>
        <ScrollView style={styles.row} horizontal>
          <Flex>
            {Object.entries(b)
              .sort((a: any[], b: any[]) => desc(a[1], b[1]))
              .map(item => (
                <Tag key={item[0]} style={_.mr.sm} value={`${item[0]} (${item[1]})`} />
              ))}
          </Flex>
        </ScrollView>
        <View style={styles.row}>
          <Stats />
        </View>
      </BlurView>
    </View>
  )
}

export default observer(Summary)
