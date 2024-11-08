/*
 * @Author: czy0729
 * @Date: 2020-03-19 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 11:41:23
 */
import React, { useCallback } from 'react'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Content from './content'
import { COMPONENT } from './ds'

function ContentWrap(_props, { $, navigation }: Ctx) {
  const onLinkPress = useCallback(
    (href, passProps = {}) => {
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

export default obc(ContentWrap, COMPONENT)
