package com.czy0729.bangumi.blur;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.RenderEffect;
import android.graphics.RenderNode;
import android.graphics.Shader;
import android.os.Build;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.WeakHashMap;

/**
 * 模糊节点根容器: 持有整页内容的一份 1/8 采样, 供多个 {@link BangumiBlurView} 共享
 *
 * 刷新链路是这类实现最容易做成"定死的假模糊"的地方, 这里固定为:
 *  - Choreographer 每帧比较 {@code getDrawingTime()}, 只有内容真的重绘过才重新抓取
 *  - 每次抓取 {@code captureVersion++}, 模糊结果按 (radius) 缓存并在抓取时整体失效
 *  - 抓取时 {@code isCapturing = true}, 各 BlurView 的 dispatchDraw 短路, 避免自糊/递归
 */
public class BangumiBlurRootView extends ViewGroup {

  /** 采样缩放: 与 react-native-realtimeblurview 的 DEFAULT_SCALE_FACTOR 保持一致 */
  private static final float DOWNSCALE = 8f;

  /** 模糊半径上限, 与现库 / RenderEffect 的可用范围对齐 */
  private static final float MAX_RADIUS = 25f;

  /** 命名节点表, BlurView 通过 name 反查; 弱引用避免页面销毁后泄漏 */
  private static final Map<String, WeakReference<BangumiBlurRootView>> NODES = new HashMap<>();

  private final Canvas captureCanvas = new Canvas();
  private final Paint bitmapPaint = new Paint(Paint.FILTER_BITMAP_FLAG);
  private final Map<Float, Bitmap> blurBitmaps = new HashMap<>();
  /** 值类型为 RenderNode, 只在 API 31+ 的 Api31 里强转, 避免旧版本类校验加载不到该类 */
  private final Map<Float, Object> blurNodes = new HashMap<>();
  private final Map<BangumiBlurView, Boolean> consumers = new WeakHashMap<>();
  private final int[] viewLocation = new int[2];
  private final int[] rootLocation = new int[2];
  private final Rect srcRect = new Rect();
  private final Rect dstRect = new Rect();

  private Bitmap capture;
  private float scaleX = 1f;
  private float scaleY = 1f;
  private boolean capturing = false;
  private int captureVersion = 0;
  private long lastDrawingTime = -1;
  private String nodeName = "";

  public BangumiBlurRootView(Context context) {
    super(context);
  }

  /** JS 侧 name prop */
  public void setNodeName(String name) {
    String next = name == null ? "" : name;
    if (next.equals(nodeName)) return;

    unregisterNode();
    nodeName = next;
    if (isAttachedToWindow()) registerNode();
    bindConsumers();
  }

  private final Choreographer.FrameCallback frameCallback = new Choreographer.FrameCallback() {
    @Override
    public void doFrame(long frameTimeNanos) {
      if (!isAttachedToWindow()) return;

      long drawingTime = getDrawingTime();
      if (drawingTime != lastDrawingTime) {
        lastDrawingTime = drawingTime;
        captureOnce();
      }
      Choreographer.getInstance().postFrameCallback(this);
    }
  };

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
    registerNode();
    lastDrawingTime = -1;
    Choreographer.getInstance().postFrameCallback(frameCallback);
  }

  @Override
  protected void onDetachedFromWindow() {
    Choreographer.getInstance().removeFrameCallback(frameCallback);
    unregisterNode();
    releaseCapture();
    super.onDetachedFromWindow();
  }

  @Override
  protected void onSizeChanged(int w, int h, int oldw, int oldh) {
    super.onSizeChanged(w, h, oldw, oldh);
    releaseCapture();
  }

  /**
   * 不覆写 onMeasure / 不在 onLayout 里摆放子层:
   * RN 的布局由 Yoga + updateLayout 逐视图下发, 这里自行 measure/layout 会覆盖页面原有定位
   * (ScrollView / TabView 作为子层时会直接白屏)
   */
  @Override
  protected void onLayout(boolean changed, int l, int t, int r, int b) {}

  /**
   * 与 ReactViewGroup 一致地终止 requestLayout 向上传播
   *
   * 用普通 ViewGroup 且不拦截时, 子层(ScrollView / TabView)的 requestLayout 会冒泡到 Android 根,
   * 触发全量 measure/layout 与 RN 自己的布局互相拉扯, 表现为页面空白/卡死
   */
  @Override
  public void requestLayout() {}

  boolean isCapturing() {
    return capturing;
  }

  private void registerNode() {
    if (nodeName.isEmpty()) return;
    synchronized (NODES) {
      NODES.put(nodeName, new WeakReference<>(this));
    }
  }

  private void unregisterNode() {
    if (nodeName.isEmpty()) return;
    synchronized (NODES) {
      WeakReference<BangumiBlurRootView> ref = NODES.get(nodeName);
      if (ref != null && ref.get() == this) NODES.remove(nodeName);
    }
  }

  static BangumiBlurRootView findNode(String name) {
    if (name == null || name.isEmpty()) return null;
    synchronized (NODES) {
      WeakReference<BangumiBlurRootView> ref = NODES.get(name);
      return ref == null ? null : ref.get();
    }
  }

  void registerConsumer(BangumiBlurView view) {
    consumers.put(view, Boolean.TRUE);
    invalidate();
  }

  void unregisterConsumer(BangumiBlurView view) {
    consumers.remove(view);
  }

  /** 节点重建或 name 变化后, 让旧实例重新绑定 */
  private void bindConsumers() {
    for (BangumiBlurView view : new ArrayList<>(consumers.keySet())) {
      view.refreshRoot();
    }
  }

  private void releaseCapture() {
    // 不主动 recycle: RenderNode 的录制与硬件 display list 可能仍持有旧图引用
    if (capture != null) {
      capture = null;
      captureCanvas.setBitmap(null);
    }
    invalidateBlurCache();
  }

  private void invalidateBlurCache() {
    blurBitmaps.clear();
    blurNodes.clear();
    captureVersion++;
  }

  int getCaptureVersion() {
    return captureVersion;
  }

  private void captureOnce() {
    int width = getWidth();
    int height = getHeight();
    if (width <= 0 || height <= 0) return;

    ensureCapture(width, height);
    if (capture == null) return;

    capturing = true;
    try {
      capture.eraseColor(Color.TRANSPARENT);
      captureCanvas.save();
      captureCanvas.scale(scaleX, scaleY);
      draw(captureCanvas);
      captureCanvas.restore();
    } finally {
      capturing = false;
    }

    invalidateBlurCache();
    for (BangumiBlurView view : new ArrayList<>(consumers.keySet())) {
      view.invalidate();
    }
  }

  private void ensureCapture(int width, int height) {
    int captureWidth = Math.max(1, Math.round(width / DOWNSCALE));
    int captureHeight = Math.max(1, Math.round(height / DOWNSCALE));
    if (capture != null
        && capture.getWidth() == captureWidth
        && capture.getHeight() == captureHeight) {
      return;
    }

    releaseCapture();
    capture = Bitmap.createBitmap(captureWidth, captureHeight, Bitmap.Config.ARGB_8888);
    captureCanvas.setBitmap(capture);
    scaleX = captureWidth / (float) width;
    scaleY = captureHeight / (float) height;
  }

  /** 供 BlurView 调用: 按自身位置从共享采样里裁剪绘制 */
  void drawBlurredFor(BangumiBlurView view, Canvas canvas, float radius) {
    if (capture == null || capturing) return;

    int viewWidth = view.getWidth();
    int viewHeight = view.getHeight();
    if (viewWidth <= 0 || viewHeight <= 0) return;

    view.getLocationOnScreen(viewLocation);
    getLocationOnScreen(rootLocation);

    int left = viewLocation[0] - rootLocation[0];
    int top = viewLocation[1] - rootLocation[1];
    int srcLeft = Math.round(left * scaleX);
    int srcTop = Math.round(top * scaleY);
    int srcRight = Math.round((left + viewWidth) * scaleX);
    int srcBottom = Math.round((top + viewHeight) * scaleY);

    int clampedLeft = clamp(srcLeft, 0, capture.getWidth());
    int clampedTop = clamp(srcTop, 0, capture.getHeight());
    int clampedRight = clamp(srcRight, 0, capture.getWidth());
    int clampedBottom = clamp(srcBottom, 0, capture.getHeight());
    if (clampedRight <= clampedLeft || clampedBottom <= clampedTop) return;

    // 部分离屏时按比例收缩目标区域, 避免拉伸
    float ratioX = viewWidth / (float) Math.max(1, srcRight - srcLeft);
    float ratioY = viewHeight / (float) Math.max(1, srcBottom - srcTop);
    srcRect.set(clampedLeft, clampedTop, clampedRight, clampedBottom);
    dstRect.set(
        Math.round((clampedLeft - srcLeft) * ratioX),
        Math.round((clampedTop - srcTop) * ratioY),
        Math.round((clampedRight - srcLeft) * ratioX),
        Math.round((clampedBottom - srcTop) * ratioY));

    drawBlurred(canvas, srcRect, dstRect, clampRadius(radius));
  }

  private void drawBlurred(Canvas canvas, Rect src, Rect dst, float radius) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
        && Api31.draw(canvas, capture, src, dst, radius, blurNodes)) {
      return;
    }

    Bitmap blurred = getBlurredBitmap(radius);
    if (blurred != null) canvas.drawBitmap(blurred, src, dst, bitmapPaint);
  }

  /**
   * API 31+ 实现: 抓取图挂 RenderEffect, 由 GPU 在绘制时模糊
   *
   * 单独放在内部类里, 避免 API 21~30 的类校验去解析 RenderNode / RenderEffect
   */
  private static final class Api31 {

    static boolean draw(
        Canvas canvas, Bitmap capture, Rect src, Rect dst, float radius, Map<Float, Object> cache) {
      if (capture == null || canvas == null || !canvas.isHardwareAccelerated()) return false;

      RenderNode node = (RenderNode) cache.get(radius);
      if (node == null) {
        node = build(capture, radius);
        cache.put(radius, node);
      }
      if (node == null) return false;

      canvas.save();
      canvas.clipRect(dst);
      canvas.scale(dst.width() / (float) Math.max(1, src.width()),
          dst.height() / (float) Math.max(1, src.height()));
      canvas.translate(-src.left, -src.top);
      canvas.drawRenderNode(node);
      canvas.restore();
      return true;
    }

    private static RenderNode build(Bitmap capture, float radius) {
      RenderNode node = new RenderNode("bangumi-blur");
      node.setPosition(0, 0, capture.getWidth(), capture.getHeight());
      android.graphics.RecordingCanvas recording = node.beginRecording();
      recording.drawBitmap(capture, 0, 0, null);
      node.endRecording();
      node.setRenderEffect(RenderEffect.createBlurEffect(radius, radius, Shader.TileMode.CLAMP));
      return node;
    }
  }

  /** API 31 以下: 1/8 图上的 CPU 三次 box blur, 成本约等于零 */
  private Bitmap getBlurredBitmap(float radius) {
    Bitmap blurred = blurBitmaps.get(radius);
    if (blurred != null) return blurred;
    if (capture == null) return null;

    blurred = capture.copy(Bitmap.Config.ARGB_8888, true);
    if (blurred == null) return null;

    boxBlur(blurred, Math.round(radius));
    blurBitmaps.put(radius, blurred);
    return blurred;
  }

  private static float clampRadius(float radius) {
    if (radius <= 0f) return 0f;
    return Math.min(radius, MAX_RADIUS);
  }

  private static int clamp(int value, int min, int max) {
    return Math.max(min, Math.min(max, value));
  }

  private static void boxBlur(Bitmap bitmap, int radius) {
    int width = bitmap.getWidth();
    int height = bitmap.getHeight();
    if (radius <= 0 || width < 3 || height < 3) return;

    int[] pixels = new int[width * height];
    int[] buffer = new int[width * height];
    bitmap.getPixels(pixels, 0, width, 0, 0, width, height);

    // 三次 box blur 近似高斯
    for (int i = 0; i < 3; i++) {
      blurPass(pixels, buffer, width, height, radius, true);
      blurPass(buffer, pixels, width, height, radius, false);
    }
    bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
  }

  private static void blurPass(
      int[] src, int[] dst, int width, int height, int radius, boolean horizontal) {
    int length = horizontal ? width : height;
    int lines = horizontal ? height : width;
    int window = radius * 2 + 1;

    for (int line = 0; line < lines; line++) {
      int alpha = 0;
      int red = 0;
      int green = 0;
      int blue = 0;

      for (int offset = -radius; offset <= radius; offset++) {
        int index = clamp(offset, 0, length - 1);
        int color = horizontal ? src[line * width + index] : src[index * width + line];
        alpha += (color >>> 24) & 0xFF;
        red += (color >> 16) & 0xFF;
        green += (color >> 8) & 0xFF;
        blue += color & 0xFF;
      }

      for (int i = 0; i < length; i++) {
        int outAlpha = alpha / window;
        int outRed = red / window;
        int outGreen = green / window;
        int outBlue = blue / window;
        int index = horizontal ? line * width + i : i * width + line;
        dst[index] = (outAlpha << 24) | (outRed << 16) | (outGreen << 8) | outBlue;

        int addIndex = clamp(i + radius + 1, 0, length - 1);
        int removeIndex = clamp(i - radius, 0, length - 1);
        int add = horizontal ? src[line * width + addIndex] : src[addIndex * width + line];
        int remove = horizontal ? src[line * width + removeIndex] : src[removeIndex * width + line];
        alpha += ((add >>> 24) & 0xFF) - ((remove >>> 24) & 0xFF);
        red += ((add >> 16) & 0xFF) - ((remove >> 16) & 0xFF);
        green += ((add >> 8) & 0xFF) - ((remove >> 8) & 0xFF);
        blue += (add & 0xFF) - (remove & 0xFF);
      }
    }
  }

}
