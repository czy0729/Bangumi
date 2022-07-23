/*
 * @Author: czy0729
 * @Date: 2022-07-23 13:59:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-23 14:00:38
 */
import React from 'react'
import { Katakana, Text } from '@components'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'

function Title({ name, nameCn, comments }) {
  const top = cnjp(nameCn, name)
  const bottom = cnjp(name, nameCn)
  return (
    <>
      {!!(top || bottom) && (
        <Katakana.Provider size={15} numberOfLines={2}>
          <Katakana size={15} bold>
            {top || bottom}
          </Katakana>
          {!!comments && (
            <Text type='main' lineHeight={15}>
              {' '}
              {comments}
            </Text>
          )}
        </Katakana.Provider>
      )}
      {!!bottom && bottom !== top && (
        <Katakana type='sub' size={12} lineHeight={15} numberOfLines={1}>
          {bottom}
        </Katakana>
      )}
    </>
  )
}

export default ob(Title)
