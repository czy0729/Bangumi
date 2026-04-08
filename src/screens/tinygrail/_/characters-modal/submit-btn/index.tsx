/*
 * @Author: czy0729
 * @Date: 2025-05-02 19:39:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Button } from '@components'
import { memoStyles } from './styles'

function SubmitBtn({ canSubmit, loading, onSubmit }) {
  const styles = memoStyles()

  return (
    <Button
      style={canSubmit ? styles.btn : styles.disabled}
      styleText={styles.text}
      type='bid'
      loading={loading}
      onPress={onSubmit}
    >
      提交
    </Button>
  )
}

export default observer(SubmitBtn)
