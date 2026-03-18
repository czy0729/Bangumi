/*
 * @Author: czy0729
 * @Date: 2024-04-29 22:36:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:35:28
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { MODEL_RATING_STATUS } from '@constants'
import { COMPONENT, STATUS_DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function StatusSegement() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { filterStatus } = $.state
  const isAnime = $.action === '看'

  const memoData = useMemo(
    () => (isAnime ? STATUS_DS : STATUS_DS.map(item => item.replace('看', $.action))),
    [$, isAnime]
  )

  const handleSelect = useCallback(
    (title: string) => {
      $.filterStatus(isAnime ? title : title.replace($.action, '看'))
    },
    [$, isAnime]
  )

  return (
    <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont
          name='md-filter-list'
          size={22}
          color={filterStatus ? _.colorMain : _.colorIcon}
        />
        {!!filterStatus && (
          <Text style={_.ml.xs} type='main' size={13} bold>
            {filterStatus ? MODEL_RATING_STATUS.getLabel(filterStatus).replace('看', $.action) : ''}
          </Text>
        )}
      </Flex>
    </Popover>
  )
}

export default observer(StatusSegement)
