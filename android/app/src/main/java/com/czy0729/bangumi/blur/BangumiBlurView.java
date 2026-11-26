package com.czy0729.bangumi.blur;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.view.ViewGroup;

/**
 * 模糊层: 不持有 bitmap, 只从 {@link BangumiBlurRootView} 的共享采样里按自身位置裁剪绘制
 *
 * 多个实例共享同一份抓取与同一份模糊结果, 所以开销与实例数无关;
 * 层级依赖由使用方保证: 模糊层必须在它要装饰的面板之下。
 */
public class BangumiBlurView extends ViewGroup {

  private String blurNode = "";
  private float radius = 10f;
  private int overlayColor = Color.TRANSPARENT;
  private BangumiBlurRootView root;

  public BangumiBlurView(Context context) {
    super(context);
  }

  /** JS 侧 blurNode prop: 关联的根节点名称 */
  public void setBlurNode(String name) {
    String next = name == null ? "" : name;
    if (next.equals(blurNode)) return;

    blurNode = next;
    refreshRoot();
  }

  /** JS 侧 radius prop (0~25) */
  public void setRadius(float value) {
    float next = Math.max(0f, Math.min(value, 25f));
    if (next == radius) return;

    radius = next;
    invalidate();
  }

  /** JS 侧 overlayColor prop (ARGB) */
  public void setOverlayColor(int color) {
    if (color == overlayColor) return;

    overlayColor = color;
    invalidate();
  }

  void refreshRoot() {
    BangumiBlurRootView next = BangumiBlurRootView.findNode(blurNode);
    if (next == root) {
      invalidate();
      return;
    }

    if (root != null) root.unregisterConsumer(this);
    root = next;
    if (root != null) root.registerConsumer(this);
    invalidate();
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
    refreshRoot();
  }

  @Override
  protected void onDetachedFromWindow() {
    if (root != null) {
      root.unregisterConsumer(this);
      root = null;
    }
    super.onDetachedFromWindow();
  }

  /** 同 BangumiBlurRootView: 布局交给 RN 下发, 这里不自行 measure/layout 子层 */
  @Override
  protected void onLayout(boolean changed, int l, int t, int r, int b) {}

  /** 同 BangumiBlurRootView: 终止 requestLayout 向上传播 */
  @Override
  public void requestLayout() {}

  @Override
  protected void dispatchDraw(Canvas canvas) {
    // 根节点可能晚于本视图挂载, 命不中时补一次绑定 (HashMap 查找, 可忽略)
    if (root == null && !blurNode.isEmpty()) refreshRoot();

    // 抓取期间不绘制自身, 避免自糊与叠加色被重复采样
    if (root != null && !root.isCapturing()) {
      if (radius > 0f) root.drawBlurredFor(this, canvas, radius);

      if (Color.alpha(overlayColor) > 0) {
        canvas.save();
        canvas.clipRect(0, 0, getWidth(), getHeight());
        canvas.drawColor(overlayColor);
        canvas.restore();
      }
    }

    super.dispatchDraw(canvas);
  }
}
