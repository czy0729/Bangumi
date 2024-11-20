/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:39:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:15:08
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Expand() {
  const { $ } = useStore<Ctx>()
  // const { s, subject, r } = $.relation
  return (
    <Flex style={_.mt.sm} justify='center'>
      {/* {!!subject && (
        <>
          <Touchable
            style={_.mr.sm}
            onPress={() => {
              navigation.push('Subject', {
                subjectId: s
              })
            }}
          >
            <Text type='tinygrailText' size={13}>
              [{subject}]
            </Text>
          </Touchable>
          <Touchable
            style={_.mr.sm}
            onPress={() => {
              navigation.push('TinygrailRelation', {
                ids: r,
                name: `${subject} (${r.length})`
              })
            }}
          >
            <Iconfont name='md-compare-arrows' color={_.colorTinygrailPlain} />
          </Touchable>
        </>
      )} */}
      <Touchable onPress={$.toggleCover}>
        <Flex style={styles.expand} justify='center'>
          <Iconfont
            name={$.state.showCover ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
            color={_.colorTinygrailText}
          />
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default ob(Expand)
