/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 17:36:27
 */
import React from 'react'
import { Flex, Switch, Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import ExpandBtn from '../../expand-btn'
import { styles } from './styles'

function Head(props, { $ }: Ctx) {
  const { showSacrifice } = $.state
  return (
    <Flex>
      <Flex.Item>
        <Text type='tinygrailPlain' size={13}>
          {showSacrifice
            ? $.state.isSale
              ? '出售：出售给英灵殿获得现金'
              : '献祭：转化为固定资产并获得现金道具'
            : '献祭'}
        </Text>
      </Flex.Item>
      {showSacrifice && (
        <Switch style={styles.switch} checked={$.state.isSale} onChange={$.switchIsSale} />
      )}
      <ExpandBtn show={showSacrifice} onPress={$.toggleSacrifice} />
    </Flex>
  )
}

export default obc(Head)
