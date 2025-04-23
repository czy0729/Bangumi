/*
 * @Author: czy0729
 * @Date: 2020-03-19 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:14:51
 */
import React, { useCallback } from 'react'
import { useStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import Content from './content'
import { COMPONENT } from './ds'

function ContentWrap() {
  const { $, navigation } = useStore<Ctx>()
  const onLinkPress = useCallback(
    (href: string, passProps = {}) => {
      appNavigate(href, navigation, passProps, {
        id: '帖子.跳转',
        data: {
          from: '#1',
          topicId: $.topicId
        }
      })
    },
    [$.topicId, navigation]
  )

  return (
    <Content
      topicId={$.topicId}
      title={$.title}
      html={$.html}
      isEp={$.isEp}
      id={$.topic?.id}
      formhash={$.topic?.formhash}
      likeType={$.topic?.likeType}
      translateResult={$.state.translateResult.slice()}
      doTranslate={$.doTranslate}
      onLinkPress={onLinkPress}
    />
  )
}

export default ob(ContentWrap, COMPONENT)
