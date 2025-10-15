/*
 * @Author: czy0729
 * @Date: 2020-03-19 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 17:52:10
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { useStore } from '@stores'
import { appNavigate } from '@utils'
import Content from './content'
import { COMPONENT } from './ds'

import type { AnyObject } from '@types'
import type { Ctx } from '../../../types'

function ContentWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { topicId } = $

    const handleLinkPress = useCallback(
      (href: string, passProps: AnyObject) => {
        appNavigate(href, navigation, passProps, {
          id: '帖子.跳转',
          data: {
            from: '#1',
            topicId
          }
        })
      },
      [topicId]
    )

    return (
      <Content
        topicId={topicId}
        title={$.title}
        html={$.html}
        isEp={$.isEp}
        id={$.topic?.id}
        formhash={$.topic?.formhash}
        likeType={$.topic?.likeType}
        translateResult={$.state.translateResult.slice()}
        doTranslate={$.doTranslate}
        onLinkPress={handleLinkPress}
      />
    )
  })
}

export default ContentWrap
