/*
 * @Author: czy0729
 * @Date: 2022-04-24 15:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 07:50:23
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Cover } from '@_'
import { _ } from '@stores'
import { copy } from '@utils'
import { memo, obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import Column from './column'
import ColumnBgm from './column-bgm'
import ColumnSelect from './column-select'
import Btn from './btn'
import {
  useSelectStatus,
  useSelectEp,
  useSelectScore,
  useSelectComment,
  getSelectEp,
  getSelectScore,
  getSelectComment
} from './utils'

const BILIBILI_STATUS = {
  1: '想看',
  2: '在看',
  3: '看过'
}

const defaultProps = {
  navigation: {},
  styles: {},
  item: {},
  review: {},
  collection: {},
  hideWatched: false,
  hideSame: false,
  onBottom: Function.prototype,
  onSubmit: Function.prototype
}

const Item = memo(
  ({
    navigation,
    styles,
    item,
    review,
    collection,
    hideWatched,
    hideSame,
    onBottom,
    onSubmit
  }) => {
    const { subjectId } = item
    const isSubject = !!subjectId
    const progress =
      item.progress.replace('看到', '').replace('第', '').split(' ')?.[0] || ''

    // hooks
    const [loading, setLoading] = useState(false)
    const [selectStatus, setSelectStatus] = useSelectStatus(
      item.status,
      collection?.status
    )
    const [selectEp, setSelectEp] = useSelectEp(progress, collection?.ep_status)
    const [selectScore, setSelectScore] = useSelectScore(
      review?.score,
      collection?.rating
    )
    const [selectComment, setSelectComment] = useSelectComment(
      review?.content,
      collection?.comment
    )

    // 隐藏已看过
    if (hideWatched && collection?.status === 'collect') {
      return null
    }

    // 隐藏进度一致
    const bili = {
      status: BILIBILI_STATUS[item.status] || '',
      ep: progress || '',
      score: review?.score || '',
      comment: review?.content || ''
    }
    const bgm = {
      status: MODEL_COLLECTION_STATUS.getLabel(collection?.status) || '',
      ep: collection?.ep_status && `${collection.ep_status}话`,
      score: collection?.rating || '',
      comment: collection?.comment || ''
    }
    if (
      hideSame &&
      bili.status == bgm.status &&
      bili.ep == bgm.ep &&
      bili.score == bgm.score &&
      bili.comment == bgm.comment
    ) {
      return null
    }

    // 若提交确认用的值
    const next = {
      status: BILIBILI_STATUS[item.status],
      ep: getSelectEp(progress, collection?.ep_status).value,
      score: getSelectScore(review?.score, collection?.rating).value,
      comment: getSelectComment(review?.content, collection?.comment).value
    }
    return (
      <Flex style={styles.item} align='start'>
        <Cover
          src={item.cover}
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
          radius
          onPress={() => {
            if (!isSubject) return

            navigation.push('Subject', {
              subjectId,
              _image: item.cover,
              _cn: item.title.replace('（僅限港澳台地區）', '')
            })
          }}
        />
        <Flex.Item>
          <Flex style={styles.body} direction='column' align='start'>
            <Text bold numberOfLines={2}>
              {item.title}
            </Text>
            <Flex style={_.mt.md} align='start'>
              {/* side */}
              <View>
                <Column text=' ' type='sub' />
                <Column style={_.mt.md} text='状态' type='sub' />
                <Column style={_.mt.md} text='进度' type='sub' />
                <Column style={_.mt.md} text='评分' type='sub' />
                <Column style={_.mt.md} text='点评' type='sub' />
              </View>

              {/* bilibili */}
              <Flex.Item style={_.ml.md}>
                <Column text='bilibili' type='sub' />
                <Column style={_.mt.md} text={bili.status} />
                <Column style={_.mt.md} text={bili.ep} />
                <Column style={_.mt.md} text={bili.score} />
                <Column
                  style={_.mt.md}
                  text={bili.comment}
                  onPress={() => {
                    if (!review?.content) return
                    copy(review?.content)
                    info('已复制')
                  }}
                />
              </Flex.Item>

              {/* bgm */}
              <Flex.Item style={_.ml.md} flex={1.5}>
                <Column text='bgm' type='sub' />
                {isSubject ? (
                  <>
                    <ColumnBgm
                      select={selectStatus}
                      text={bgm.status}
                      next={next.status}
                    />
                    <ColumnBgm select={selectEp} text={bgm.ep} next={`${next.ep}话`} />
                    <ColumnBgm
                      select={selectScore}
                      text={bgm.score}
                      next={next.score}
                    />
                    <ColumnBgm
                      select={selectComment}
                      text={bgm.comment}
                      next={next.comment}
                    />
                  </>
                ) : (
                  <Column style={_.mt.md} text='未找到条目' />
                )}
              </Flex.Item>

              {/* selectors */}
              {isSubject && (
                <View style={styles.selectors}>
                  <Column text='选择' type='sub' />
                  <ColumnSelect
                    select={selectStatus}
                    disabled={!next.status}
                    onPress={setSelectStatus}
                  />
                  <ColumnSelect
                    select={selectEp}
                    disabled={next.ep === ''}
                    onPress={setSelectEp}
                  />
                  <ColumnSelect
                    select={selectScore}
                    disabled={!next.score}
                    onPress={setSelectScore}
                  />
                  <ColumnSelect
                    select={selectComment}
                    disabled={!next.comment}
                    onPress={setSelectComment}
                  />
                </View>
              )}
            </Flex>

            {/* toolbar */}
            <View style={styles.toolbar}>
              <Flex style={_.mt.md}>
                <Flex.Item>
                  <Flex>
                    <Btn
                      text='搜索'
                      onPress={() => {
                        navigation.push('Search', {
                          type: '动画',
                          value: item.title.replace('（僅限港澳台地區）', '')
                        })
                      }}
                    />
                    <Btn
                      style={_.ml.sm}
                      text='置底'
                      onPress={() => onBottom(item.id)}
                    />
                  </Flex>
                </Flex.Item>
                {isSubject && (
                  <Btn
                    style={_.ml.md}
                    type='success'
                    disabled={
                      !(selectStatus || selectEp || selectScore || selectComment)
                    }
                    loading={loading}
                    onPress={async () => {
                      const flag = {}

                      const collectionData = {}
                      if (selectStatus) {
                        if (next.status === '想看') {
                          flag.status = true
                          collectionData.status = 'wish'
                        } else if (next.status === '看过') {
                          flag.status = true
                          collectionData.status = 'collect'
                        } else if (next.status === '在看') {
                          flag.status = true
                          collectionData.status = 'do'
                        }
                      }
                      if (selectScore) {
                        flag.score = true
                        collectionData.rating = next.score
                      }
                      if (selectComment) {
                        flag.comment = true
                        collectionData.comment = next.comment
                      }

                      const epData = {}
                      if (selectEp) {
                        flag.ep = true
                        epData.ep = next.ep
                      }

                      setLoading(true)
                      await onSubmit(subjectId, collectionData, epData)
                      setLoading(false)

                      if (flag.status) setSelectStatus(false)
                      if (flag.ep) setSelectEp(false)
                      if (flag.score) setSelectScore(false)
                      if (flag.comment) setSelectComment(false)
                    }}
                  />
                )}
              </Flex>
            </View>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  },
  defaultProps
)

export default obc(({ item }, { $, navigation }) => {
  const { subjectId } = item
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      item={item}
      review={$.review(item.id)}
      collection={$.collection(subjectId)}
      hideWatched={$.state.hideWatched}
      hideSame={$.state.hideSame}
      onBottom={$.onBottom}
      onSubmit={$.onSubmit}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  item: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind,
    paddingVertical: _.md
  },
  body: {
    paddingLeft: _.md
  },
  selectors: {
    width: 48
  },
  toolbar: {
    width: '100%',
    paddingRight: _._wind,
    marginTop: _.sm
  }
}))
