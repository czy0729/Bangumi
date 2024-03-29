/*
 * @Author: czy0729
 * @Date: 2023-06-11 15:57:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 11:37:03
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, uiStore } from '@stores'
import { desc, getType, similar } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { Ctx, ListItem } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Sub(
  {
    name,
    relates,
    action
  }: {
    name: ListItem['name']
    relates: ListItem['relates']
    action: string
  },
  { $ }: Ctx
) {
  let len = 0
  let count = 0
  return (
    <Flex style={_.mt.xs} wrap='wrap'>
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
            <Flex key={subject.id} style={styles.sub} direction='column' align='start'>
              <Text
                size={10}
                lineHeight={15}
                numberOfLines={1}
                onPress={() => {
                  uiStore.showPopableSubject({
                    subjectId: subject.id
                  })
                }}
              >
                {!!status && (
                  <Text size={10} type={getType(status)} lineHeight={15}>
                    {`${status.replace('看', action)}  `}
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

export default obc(Sub, COMPONENT)
