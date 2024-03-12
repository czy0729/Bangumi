/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 18:06:59
 */
import React from 'react'
import { Flex, Switch, Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import ExpandBtn from '../../expand-btn'
import { styles } from './styles'

function Head(props, { $ }: Ctx) {
  const { showRefine } = $.state
  return (
    <Flex>
      <Flex.Item>
        <Text type='tinygrailPlain' size={13}>
          精炼
        </Text>
      </Flex.Item>
      {showRefine && (
        <>
          <Text type='tinygrailText' size={10} bold>
            二次确认
          </Text>
          <Switch
            style={styles.switch}
            checked={$.state.confirmRefine}
            onChange={$.switchConfirmRefine}
          />
        </>
      )}
      <ExpandBtn show={showRefine} onPress={$.toggleRefine} />
    </Flex>
  )
}

export default obc(Head)
