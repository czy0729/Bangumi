/*
 * @Author: czy0729
 * @Date: 2025-08-06 16:27:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-06 16:28:53
 */
export const COMPONENT = 'WebBrowser'

export const SCRIPTS = {
  injectedViewport: `
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName('head')[0].appendChild(meta);
  `
} as const
