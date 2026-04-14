/*
 * @Author: czy0729
 * @Date: 2023-06-11 15:57:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 14:37:33
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { uiStore, useStore } from '@stores'
import { desc, feedback, getType, similar } from '@utils'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Sub({ name, relates, action }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  let len = 0
  let count = 0

  return (
    <Flex style={styles.sub} wrap='wrap'>
      {relates
        .slice()
        .sort((a, b) => {
          const mName = name || ''
          const aName = $.relates(a)?.name || ''
          if (aName.includes(mName) || mName.includes(aName)) return -1

          const bName = $.relates(b)?.name || ''
          if (bName.includes(mName) || mName.includes(bName)) return 1

          return desc(similar(mName, aName), similar(mName, bName))
        })
        .map(item => {
          if ((len >= 28 && count >= 3) || count >= 4) return null

          const subject = $.relates(item)
          const type = Number(subject?.type)
          if (!subject || (type != 1 && type != 2 && type != 3)) return null

          len += subject.name.length
          count += 1

          const status = MODEL_COLLECTION_STATUS.getLabel(subject.type)
          return (
            <Flex key={subject.id} style={styles.item} direction='column' align='start'>
              <Text
                size={10}
                lineHeight={13}
                numberOfLines={1}
                onPress={() => {
                  uiStore.showPopableSubject({
                    subjectId: subject.id
                  })
                  feedback(true)
                }}
              >
                {!!status && (
                  <Text size={10} type={getType(status)} lineHeight={13}>
                    {`${status.replace('看', action)} `}
                  </Text>
                )}
                {subject.name}
              </Text>
            </Flex>
          )
        })}
    </Flex>
  )
}

export default observer(Sub)
