/*
 * @Author: czy0729
 * @Date: 2025-05-02 19:39:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:43
 */
import React from 'react'
import { Button } from '@components'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function SubmitBtn({ canSubmit, loading, onSubmit }) {
  return useObserver(() => {
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
  })
}

export default SubmitBtn
