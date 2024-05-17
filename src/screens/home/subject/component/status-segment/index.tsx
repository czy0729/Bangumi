/*
 * @Author: czy0729
 * @Date: 2024-04-29 22:36:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 05:04:49
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
  const isAnime = $.action === '看'
  const data = isAnime ? STATUS_DS : STATUS_DS.map(item => item.replace('看', $.action))
  return (
    <Popover
      style={styles.touch}
      data={data}
      onSelect={label => {
        $.filterStatus(isAnime ? label : label.replace($.action, '看'))
      }}
    >
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

export default obc(StatusSegement, COMPONENT)
