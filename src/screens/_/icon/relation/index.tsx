/*
 * @Author: czy0729
 * @Date: 2025-12-15 13:25:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 21:39:54
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { info, stl } from '@utils'
import { useNavigation } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { getNodeId } from './utils'
import { styles } from './styles'

import type { Props as IconRelationProps } from './types'
export type { IconRelationProps }

export const IconRelation = ({ style, subjectId, type, name }: IconRelationProps) => {
  const navigation = useNavigation()

  const handlePress = useCallback(async () => {
    const result = await getNodeId(subjectId)

    if (!result) {
      info('该条目没有足够的数据构建关系图')
      return
    }

    navigation.push('SubjectLink', {
      nodeId: result.nodeId,
      extra: result.extra,
      type,
      _subjectId: subjectId,
      _name: name
    })
  }, [name, navigation, subjectId, type])

  return useObserver(() => (
    <Touchable style={stl(styles.touch, style)} onPress={handlePress}>
      <Image
        src={GROUP_THUMB_MAP[_.select('relation_0', 'relation')]}
        size={18}
        resizeMode='contain'
        placeholder={false}
        skeleton={false}
      />
    </Touchable>
  ))
}

export default IconRelation
