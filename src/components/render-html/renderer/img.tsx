/*
 * @Author: czy0729
 * @Date: 2024-08-14 06:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-25 07:39:48
 */
import React from 'react'
import { _, rakuenStore } from '@stores'
import LinkImage from '../link-image'
import ToggleImage from '../toggle-image'

export function img({ key, src, alt, autoSize, show, onImageFallback }) {
  if (!Number(rakuenStore.setting.autoLoadImageV2 || 0)) {
    return <LinkImage key={key} style={_.mt.xs} src={src || ''} />
  }

  return (
    <ToggleImage
      key={key}
      style={_.mt.xs}
      src={src || ''}
      autoSize={autoSize}
      placeholder={false}
      imageViewer
      show={show}
      onImageFallback={() => onImageFallback(src)}
    />
  )
}
