/*
 * @Author: czy0729
 * @Date: 2025-12-15 13:25:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 21:59:53
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Image, Touchable } from '@components'
import { _ } from '@stores'
import { info, stl } from '@utils'
import { xhrCustom } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { HOST_DOGE } from '@constants'
import { GROUP_THUMB_MAP } from '@assets/images'
import { styles } from './styles'

import type { Props as IconRelationProps } from './types'
import type { SubjectId } from '@types'

export type { IconRelationProps }

const cacheMap = new Map<SubjectId, number>()

export const IconRelation = ({ style, subjectId, name }: IconRelationProps) => {
  const navigation = useNavigation()

  const handlePress = useCallback(async () => {
    let nodeId = cacheMap.get(subjectId)

    if (!nodeId) {
      try {
        const nodeRes = await xhrCustom({
          url: `${HOST_DOGE}/bangumi-link/node/${Math.floor(Number(subjectId) / 1000)}/${subjectId}`
        })
        nodeId = Number(nodeRes._response)
        cacheMap.set(subjectId, nodeId)
      } catch (error) {}
    }

    if (nodeId) {
      navigation.push('SubjectLink', {
        nodeId,
        _subjectId: subjectId,
        _name: name
      })
    } else {
      info('该条目没有足够的数据构建关系图')
    }
  }, [name, navigation, subjectId])

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
