/*
 * @Author: czy0729
 * @Date: 2026-11-20 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-20 12:00:00
 *
 * 更新评分 (按钮内显示进度)
 */
import { observer } from 'mobx-react'
import { ActivityIndicator, Button, Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT_UPDATE } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Update() {
  const { $ } = useStore<Ctx>(COMPONENT_UPDATE)

  const { fetching, current, total } = $.state.progress
  const percent = total ? Math.min(100, Math.round((current / total) * 100)) : 0

  return (
    <Button
      style={styles.btn}
      styleText={_.fontSize12}
      type='plain'
      bold
      onPress={fetching ? undefined : $.fetchSubjectsQueue}
      extra={
        fetching ? (
          <Flex justify='center'>
            <ActivityIndicator style={styles.loading} color='rgb(128, 128, 128)' />
            <Text style={styles.percent} size={12} align='center' bold noWrap>
              {/* OSS 批量阶段还没有进度, 只显示菊花, 避免长时间停在 0% */}
              {current > 0 ? `${percent}%` : ''}
            </Text>
          </Flex>
        ) : null
      }
    >
      {fetching ? '' : '更新评分'}
    </Button>
  )
}

export default observer(Update)
