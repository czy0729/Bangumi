/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 07:52:06
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { SectionTitle, PreventTouchPlaceholder } from '@_'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectType } from '@types'
import IconHidden from '../icon/hidden'
import IconGame from '../icon/game'
import { TITLE_TAGS } from '../ds'
import RecSegement from './rec-segment'
import Block from './block'
import Typerank from './typerank'
import { exist } from './typerank/utils'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    subjectId,
    subjectType,
    showTags,
    subjectTagsExpand,
    subjectTagsRec,
    rank,
    focusOrigin,
    tag,
    tags,
    animeTags,
    hentaiTags,
    gameTags,
    mangaTags,
    wenkuTags,
    onSwitchBlock
  }) => {
    rerender('Subject.Tags.Main')

    const elTags = (
      <>
        {tags.map(({ name, count }, index) => {
          const isSelected = tag.includes(name)
          const showTyperank = !!rank && subjectTagsRec
          return (
            <Touchable
              key={index}
              animate
              scale={0.9}
              onPress={() => {
                if (
                  showTyperank &&
                  exist(MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectType), name)
                ) {
                  t('条目.跳转', {
                    to: 'Typerank',
                    from: TITLE_TAGS,
                    subjectId
                  })

                  navigation.push('Typerank', {
                    type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectType),
                    tag: name,
                    subjectId
                  })
                  return
                }

                t('条目.跳转', {
                  to: 'Tag',
                  from: TITLE_TAGS,
                  subjectId
                })

                navigation.push('Tag', {
                  type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectType),
                  tag: name
                })
              }}
            >
              <Flex style={stl(styles.item, isSelected && styles.selected)}>
                <Text
                  type={_.select('desc', isSelected ? 'main' : 'desc')}
                  size={13}
                  bold
                >
                  {name}
                </Text>
                {showTyperank ? (
                  <Typerank tag={name} />
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
        <Block path='Anime' tags={animeTags} />
        <Block path='Hentai' tags={hentaiTags} />
        <Block path='Game' tags={gameTags} />
        <Block path='Manga' tags={mangaTags} />
        <Block path='Wenku' tags={wenkuTags} />
      </>
    )

    const show = showTags && !!tags.length
    return (
      <View
        style={stl(_.mt.lg, showTags ? styles.container : _.short, !show && _.mb.md)}
      >
        <SectionTitle
          style={_.container.wind}
          right={
            showTags ? (
              <>
                {!focusOrigin && <IconGame />}
                {!!rank && <RecSegement />}
              </>
            ) : (
              <IconHidden name={TITLE_TAGS} value='showTags' />
            )
          }
          icon={!showTags && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTags')}
        >
          {TITLE_TAGS}
        </SectionTitle>
        {show && (
          <>
            {subjectTagsExpand ? (
              <View style={_.container.windMtSm}>
                <Flex wrap='wrap'>{elTags}</Flex>
                <Heatmap id='条目.跳转' from={TITLE_TAGS} />
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
            <Touchable onPress={() => systemStore.switchSetting('subjectTagsExpand')}>
              <Flex justify='center'>
                <Iconfont
                  name={
                    subjectTagsExpand
                      ? 'md-keyboard-arrow-up'
                      : 'md-keyboard-arrow-down'
                  }
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
