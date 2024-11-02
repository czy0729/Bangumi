/*
 * @Author: czy0729
 * @Date: 2024-11-02 08:08:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:51:14
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, Text } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE, SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

const CUT_TYPE = ['标签', '制作人员', '声优', '排名'] as const

function Filter(_props, { $ }: Ctx) {
  if (!$.userId) return null

  const { subjectType, cutType, fetchingCollections } = $.state
  return (
    <Flex style={styles.container} justify='center'>
      <Popover
        style={styles.item}
        data={SUBJECT_TYPE.map(item => item.title)}
        onSelect={$.selectSubjectType}
      >
        <Flex>
          <Text bold>{MODEL_SUBJECT_TYPE.getTitle(subjectType)}</Text>
          {fetchingCollections && (
            <View style={styles.loading}>
              <Loading.Mini />
            </View>
          )}
        </Flex>
      </Popover>
      <Text style={styles.split} bold>
        ·
      </Text>
      <Popover style={styles.item} data={CUT_TYPE} onSelect={$.selectCutType}>
        <Text bold>{cutType}</Text>
      </Popover>
    </Flex>
  )
}

export default obc(Filter, COMPONENT)
