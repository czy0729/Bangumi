/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:40:30
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { SectionTitle, PreventTouchPlaceholder } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HENTAI_TAGS } from '@utils/subject/hentai'
import { pick } from '@utils/subject/onair'
import { MODEL_SUBJECT_TYPE } from '@constants'
import IconHidden from '../icon/hidden'
import IconGame from '../icon/game'
import { DEFAULT_PROPS } from './ds'

let _expand = false

export default memo(
  ({
    navigation,
    styles,
    subjectId,
    subjectType,
    showTags,
    tag,
    tags,
    animeTags,
    hentaiTags,
    onSwitchBlock
  }) => {
    global.rerender('Subject.Tags.Main')

    const [expand, setExpand] = useState(_expand)
    const onExpand = useCallback(() => {
      setExpand(!expand)
      _expand = !expand
    }, [expand])

    const onAirText = pick(subjectId)
    const elTags = (
      <>
        {!!onAirText && (
          <Flex style={!expand && styles.onair}>
            <Text style={_.mr.sm} size={13} type='sub' bold>
              {onAirText}
            </Text>
            <View style={styles.split} />
          </Flex>
        )}
        {tags.map(({ name, count }, index) => {
          const isSelected = tag.includes(name)
          // if (!isSelected && tags.length > 10 && count < 8) return null

          return (
            <Touchable
              key={index}
              style={[styles.item, isSelected && styles.selected]}
              onPress={() => {
                t('条目.跳转', {
                  to: 'Tag',
                  from: '标签',
                  subjectId
                })

                navigation.push('Tag', {
                  type: MODEL_SUBJECT_TYPE.getLabel(subjectType),
                  tag: name
                })
              }}
            >
              <Flex>
                <Text
                  type={_.select('desc', isSelected ? 'main' : 'desc')}
                  size={13}
                  bold={isSelected}
                >
                  {name}
                </Text>
                <Text
                  style={_.ml.xs}
                  type={_.select('sub', isSelected ? 'main' : 'desc')}
                  size={13}
                  bold={isSelected}
                >
                  {count}
                </Text>
              </Flex>
            </Touchable>
          )
        })}
        {!!animeTags && (
          <>
            <View style={[!expand && _.mt.xs, styles.split]} />
            <Text style={[!expand && _.mt.xxs, _.mr.sm]} size={13} type='sub'>
              内容
            </Text>
            {animeTags.split(' ').map(item => (
              <Touchable
                key={item}
                style={styles.item}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Anime',
                    from: '标签',
                    subjectId
                  })
                  navigation.push('Anime', {
                    _tags: [item]
                  })
                }}
              >
                <Text size={13}>{item}</Text>
              </Touchable>
            ))}
          </>
        )}
        {!!hentaiTags.length && (
          <>
            <View style={styles.split} />
            <Text style={_.mr.sm} size={13} type='sub'>
              内容
            </Text>
            {hentaiTags.map(item => (
              <Touchable
                key={item}
                style={styles.item}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Hentai',
                    from: '标签',
                    subjectId
                  })
                  navigation.push('Hentai', {
                    _tags: [item]
                  })
                }}
              >
                <Text size={13}>{HENTAI_TAGS[item]}</Text>
              </Touchable>
            ))}
          </>
        )}
      </>
    )
    const show = showTags && !!tags.length
    return (
      <View style={[_.mt.lg, showTags ? styles.container : _.short, !show && _.mb.md]}>
        <SectionTitle
          style={_.container.wind}
          right={showTags ? <IconGame /> : <IconHidden name='标签' value='showTags' />}
          icon={!showTags && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTags')}
        >
          标签
        </SectionTitle>
        {show && (
          <>
            {expand ? (
              <View style={[_.container.wind, _.mt.sm]}>
                <Flex wrap='wrap'>{elTags}</Flex>
                <Heatmap id='条目.跳转' from='标签' />
              </View>
            ) : (
              <ScrollView
                style={_.mt.md}
                contentContainerStyle={_.container.wind}
                horizontal
              >
                {elTags}
              </ScrollView>
            )}
          </>
        )}
        {show && (
          <View style={styles.more}>
            <Touchable onPress={onExpand}>
              <Flex justify='center'>
                <Iconfont
                  name={expand ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
                  size={_.device(24, 32)}
                />
              </Flex>
            </Touchable>
          </View>
        )}
        <PreventTouchPlaceholder />
      </View>
    )
  },
  DEFAULT_PROPS
)
