/*
 * @Author: czy0729
 * @Date: 2019-03-18 05:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 12:00:00
 */
import { observer } from 'mobx-react'
import { ActivityIndicator, Component, Flex, Modal, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { r } from '@utils/dev'
import { StarGroup } from '../star-group'
import CommentInput from './comment-input'
import { useManageModal } from './hooks'
import Status from './status'
import Submit from './submit'
import Tags from './tags'
import TagsInput from './tags-input'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ManageModalProps } from './types'
export type { ManageModalProps }

/** 条目收藏管理弹窗 */
export const ManageModal = observer(
  ({
    visible = false,
    disabled = false,
    subjectId = 0,
    title = '',
    desc = '',
    status = '',
    action = '看',
    onSubmit = () => undefined,
    onClose = () => undefined,
    onAutoCompleteEps,
    flipOnSubmit = false
  }: ManageModalProps) => {
    r(COMPONENT)

    const styles = memoStyles()
    const {
      loading,
      focus,
      commentChanged,
      rating,
      tags,
      fetching,
      showTags,
      showUserTags,
      comment,
      commentHistory,
      status: stateStatus,
      privacy,
      submitting,
      flipLabel,
      flipKey,
      type,
      handleClose,
      handleChangeRating,
      handleChangeTags,
      handleChangeStatus,
      handleToggleTag,
      handleTogglePrivacy,
      handleFetchTags,
      handleToggleTagsRecent,
      handleToggleTagsUser,
      handleFocus,
      handleBlur,
      handleSubmit,
      handleSubmitEditing,
      handleForwardRef,
      handleCommentChange,
      handleShowHistory
    } = useManageModal({
      visible,
      subjectId,
      status,
      action,
      onSubmit,
      onClose,
      onAutoCompleteEps,
      flipOnSubmit
    })

    return (
      <Component id='base-manage-modal'>
        <Modal
          style={styles.modal}
          visible={visible}
          title={title}
          focus={focus}
          maskClosable={!commentChanged}
          onClose={handleClose}
        >
          <Text style={_.mt.sm} type='sub' size={13} numberOfLines={1} align='center'>
            {desc}
          </Text>
          <Flex style={styles.container} justify='center'>
            {loading ? (
              <ActivityIndicator size='small' />
            ) : (
              <Flex style={styles.content} direction='column'>
                <StarGroup value={rating} onChange={handleChangeRating} />
                <TagsInput
                  tags={tags}
                  onChangeText={handleChangeTags}
                  onSubmitEditing={handleSubmitEditing}
                />
                <Flex style={styles.tags}>
                  <Tags
                    subjectId={subjectId}
                    tags={tags}
                    type={type}
                    fetching={fetching}
                    showTags={showTags}
                    showUserTags={showUserTags}
                    onFetchTags={handleFetchTags}
                    onToggleTag={handleToggleTag}
                    onToggleTagsRecent={handleToggleTagsRecent}
                    onToggleTagsUser={handleToggleTagsUser}
                  />
                </Flex>
                <CommentInput
                  forwardRef={handleForwardRef}
                  comment={HTMLDecode(comment || '')}
                  commentHistory={commentHistory}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChangeText={handleCommentChange}
                  onShowHistory={handleShowHistory}
                />
                <Status status={stateStatus} action={action} onSelect={handleChangeStatus} />
                <Submit
                  disabled={disabled || submitting}
                  flipLabel={flipLabel}
                  flipKey={flipKey}
                  privacy={privacy}
                  onSubmit={handleSubmit}
                  onTogglePrivacy={handleTogglePrivacy}
                />
              </Flex>
            )}
          </Flex>
        </Modal>
      </Component>
    )
  }
)

export default ManageModal
