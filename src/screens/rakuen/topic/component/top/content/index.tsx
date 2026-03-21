/*
 * @Author: czy0729
 * @Date: 2020-03-19 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:46:58
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { appNavigate } from '@utils'
import Content from './content'
import { COMPONENT } from './ds'

import type { AnyObject } from '@types'
import type { Ctx } from '../../../types'

function ContentWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
    [navigation, topicId]
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
}

export default observer(ContentWrap)
