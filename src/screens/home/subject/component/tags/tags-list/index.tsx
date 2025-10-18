/*
 * @Author: czy0729
 * @Date: 2024-08-04 04:45:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-26 19:53:51
 */
import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { TITLE_TAGS } from '../../../ds'
import Block from '../block'
import Typerank from '../typerank'
import { exist, loadTyperankData } from '../utils'
import { COMPONENT, EXPAND_NUM } from './ds'
import { memoStyles } from './styles'

import type { SubjectType } from '@types'
import type { Ctx } from '../../../types'

function TagList({ showTyperank }: { showTyperank: boolean }) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const [expand, setExpand] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const subjectTypeLabel = MODEL_SUBJECT_TYPE.getLabel<SubjectType>($.subjectType)

  const handleNavigate = useCallback(
    (name: string, isTyperank: boolean) => {
      const isExist = isTyperank && exist(subjectTypeLabel, name)
      const to = isExist ? 'Typerank' : 'Tag'

      // @ts-expect-error
      navigation.push(to, {
        type: subjectTypeLabel,
        tag: name,
        ...(isExist ? { subjectId: $.subjectId } : {})
      })

      t('条目.跳转', {
        from: TITLE_TAGS,
        subjectId: $.subjectId,
        to
      })
    },
    [navigation, subjectTypeLabel, $.subjectId]
  )

  useEffect(() => {
    if (!showTyperank) return

    let mounted = true
    async function init() {
      setLoaded(false)
      await loadTyperankData($.subjectTypeValue)
      if (mounted) setLoaded(true)
    }
    init()

    return () => {
      mounted = false
    }
  }, [showTyperank, $.subjectTypeValue])

  return useObserver(() => {
    const styles = memoStyles()
    const tags = expand ? $.tags : $.tags.slice(0, EXPAND_NUM)

    return (
      <>
        {tags.map(({ name, count, meta }) => {
          const isSelected = $.collection?.tag?.includes?.(name)
          return (
            <Touchable
              key={name}
              animate
              scale={0.9}
              onPress={() => handleNavigate(name, showTyperank)}
            >
              <Flex style={stl(styles.item, isSelected && styles.selected, meta && styles.meta)}>
                <Text type={_.select('desc', isSelected ? 'main' : 'desc')} size={13} bold>
                  {name}
                </Text>
                {showTyperank ? (
                  loaded && <Typerank tag={name} />
                ) : (
                  <Text
                    type={_.select('sub', isSelected ? 'main' : 'sub')}
                    size={12}
                    lineHeight={13}
                    bold
                  >
                    {' '}
                    {count}
                  </Text>
                )}
              </Flex>
            </Touchable>
          )
        })}

        {!expand && $.tags.length > EXPAND_NUM && (
          <Touchable animate scale={0.9} onPress={() => setExpand(true)}>
            <Flex style={styles.item}>
              <Iconfont name='md-more-horiz' size={16} color={_.colorSub} />
            </Flex>
          </Touchable>
        )}

        <Block path='Anime' tags={$.animeTags} />
        <Block path='Game' tags={$.gameTags} />
        <Block path='Manga' tags={$.mangaTags} />
        <Block path='Wenku' tags={$.wenkuTags} />
      </>
    )
  })
}

export default TagList
