/*
 * @Author: czy0729
 * @Date: 2022-04-24 15:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 07:09:13
 */
import React from 'react'
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
  collection: {}
}

const Item = memo(({ navigation, styles, item, review, collection }) => {
  const { subjectId } = item
  const isSubject = !!subjectId
  const progress =
    item.progress.replace('看到', '').replace('第', '').split(' ')?.[0] || ''

  const [selectStatus, setSelectStatus] = useSelectStatus(
    item.status,
    collection?.status
  )
  const [selectEp, setSelectEp] = useSelectEp(progress, collection?.ep_status)
  const [selectScore, setSelectScore] = useSelectScore(review?.score, item.rating)
  const [selectComment, setSelectComment] = useSelectComment(
    review?.content,
    collection?.comment
  )

  const nextStatus = BILIBILI_STATUS[item.status]
  const nextEp = getSelectEp(progress, collection?.ep_status).value
  const nextScore = getSelectScore(review?.score, item.rating).value
  const nextComment = getSelectComment(review?.content, collection?.comment).value
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
            subjectId: item.subjectId
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
              <Column style={_.mt.md} text={BILIBILI_STATUS[item.status] || '未收藏'} />
              <Column style={_.mt.md} text={progress} />
              <Column style={_.mt.md} text={review?.score} />
              <Column
                style={_.mt.md}
                text={review?.content}
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
                    text={MODEL_COLLECTION_STATUS.getLabel(collection?.status)}
                    next={nextStatus}
                  />
                  <ColumnBgm
                    select={selectEp}
                    text={collection?.ep_status && `${collection.ep_status}话`}
                    next={`${nextEp}话`}
                  />
                  <ColumnBgm select={selectScore} text={item.rating} next={nextScore} />
                  <ColumnBgm
                    select={selectComment}
                    text={collection?.comment}
                    next={nextComment}
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
                  disabled={!nextStatus}
                  onPress={setSelectStatus}
                />
                <ColumnSelect
                  select={selectEp}
                  disabled={nextEp === ''}
                  onPress={setSelectEp}
                />
                <ColumnSelect
                  select={selectScore}
                  disabled={!nextScore}
                  onPress={setSelectScore}
                />
                <ColumnSelect
                  select={selectComment}
                  disabled={!nextComment}
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
                    onPress={() =>
                      navigation.push('Search', {
                        _type: '动画',
                        _value: item.title
                      })
                    }
                  />
                  <Btn style={_.ml.sm} text='置底' />
                </Flex>
              </Flex.Item>
              {isSubject && (
                <Btn
                  style={_.ml.md}
                  type='success'
                  disabled={!(selectStatus || selectEp || selectScore || selectComment)}
                />
              )}
            </Flex>
          </View>
        </Flex>
      </Flex.Item>
    </Flex>
  )
}, defaultProps)

export default obc(({ item }, { $, navigation }) => {
  const { subjectId } = item
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      item={item}
      review={$.review(item.id)}
      collection={$.collection(subjectId)}
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
