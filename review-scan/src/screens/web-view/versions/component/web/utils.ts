/*
 * @Author: czy0729
 * @Date: 2023-06-23 04:59:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 17:40:06
 */
import { _ } from '@stores'
import { HTMLTrim } from '@utils'

export function injectedJavaScript() {
  let appStyles = `
    #openInAppBtn,
    .m-doc-comments,
    [class^='trigger-module_container_'],
    [class^='H5DocReader-module_reward_'],
    [class^='H5DocReader-module_actions_'],
    [class^='H5DocReaderBottomBar-module_toolbar_'] {
      display: none !important;
    }
    .ne-image-card-show-title {
      margin-top: 40px !important;
    }
    .ne-image-preview {
      width: ${_.window.width - 2 * _._wind}px !important;
    }
  `
  if (_.isDark) {
    appStyles += `
    body,
    img {
      filter: invert(100%) hue-rotate(180deg) !important;
    }`
  }

  return `
    (function() {
      var resetStyle = document.createElement("style");
      try {
        resetStyle.appendChild(document.createTextNode("${HTMLTrim(appStyles)}"));
      } catch (ex) {}
      document.body.append(resetStyle);
    }());
  `
}
