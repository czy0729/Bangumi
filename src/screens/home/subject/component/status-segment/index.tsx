/*
 * @Author: czy0729
 * @Date: 2024-04-29 22:36:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-30 00:28:58
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_RATING_STATUS } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, STATUS_DS } from './ds'
import { styles } from './styles'

function StatusSegement(props, { $ }: Ctx) {
  const { filterStatus } = $.state
  return (
    <Popover style={styles.touch} data={STATUS_DS} onSelect={$.filterStatus}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont
          name='md-filter-list'
          size={22}
          color={filterStatus ? _.colorMain : _.colorIcon}
        />
        {!!filterStatus && (
          <Text style={_.ml.xs} type='main' size={13} bold>
            {filterStatus ? MODEL_RATING_STATUS.getLabel(filterStatus) : ''}
          </Text>
        )}
      </Flex>
    </Popover>
  )
}

export default obc(StatusSegement, COMPONENT)
