package com.czy0729.bangumi.blur;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * 模糊节点根容器 (见 BangumiBlurRootView)
 *
 * 用 ViewGroupManager: 这是承载整页内容的容器, SimpleViewManager 在挂载子视图时会 ClassCastException
 */
public class BangumiBlurRootViewManager extends ViewGroupManager<BangumiBlurRootView> {

  /** JS 端 requireNativeComponent 用的名字 */
  public static final String REACT_CLASS = "BangumiBlurRootView";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  protected BangumiBlurRootView createViewInstance(@NonNull ThemedReactContext reactContext) {
    return new BangumiBlurRootView(reactContext);
  }

  /** 节点名称, 与 BangumiBlurView 的 blurNode 配对 */
  @ReactProp(name = "name")
  public void setName(BangumiBlurRootView view, String name) {
    view.setNodeName(name);
  }
}
