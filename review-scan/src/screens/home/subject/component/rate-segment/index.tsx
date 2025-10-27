/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:10:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:04:56
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT, SCORES_DS } from './ds'
import { styles } from './styles'

function RateSegement() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { filterScores } = $.state
    return (
      <Popover style={styles.touch} data={SCORES_DS} onSelect={$.filterScores}>
        <Flex style={styles.btn} justify='center'>
          <Iconfont
            name='md-menu'
            size={22}
            color={filterScores.length ? _.colorMain : _.colorIcon}
          />
          {!!filterScores.length && (
            <Text style={_.ml.xs} type='main' size={13} bold>
              {filterScores.join('-')}
            </Text>
          )}
        </Flex>
      </Popover>
    )
  })
}

export default RateSegement
