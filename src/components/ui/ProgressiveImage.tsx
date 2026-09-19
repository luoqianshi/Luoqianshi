import { useState } from 'react'

interface ProgressiveImageProps {
  src: string
  alt: string
  /** 极小的模糊占位图（data URI），加载完成前显示 */
  lqip?: string
  /** 首屏图片直接加载，其余走 lazy */
  eager?: boolean
  /** 禁用右键 / 拖拽 / 选中，防止证书图被直接保存 */
  guard?: boolean
  /** 叠加防盗水印 */
  watermark?: boolean
  className?: string
  imgClassName?: string
}

/** 渐进式图片：LQIP 模糊占位 -> 真实图片淡入，可选防盗保护 */
export default function ProgressiveImage({
  src,
  alt,
  lqip,
  eager = false,
  guard = false,
  watermark = false,
  className = '',
  imgClassName = '',
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <span
      className={`progressive-img relative block overflow-hidden ${className}`}
      onContextMenu={guard ? (e) => e.preventDefault() : undefined}
    >
      {lqip && !failed && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 block bg-cover bg-center transition-opacity duration-700 ${
            loaded ? 'opacity-0' : 'opacity-100 blur-md scale-105'
          }`}
          style={{ backgroundImage: `url("${lqip}")` }}
        />
      )}
      {failed ? (
        <span className="relative flex h-full w-full items-center justify-center bg-paper-card px-3 text-center text-xs text-paper-muted">
          {alt} · 图片加载失败
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={guard ? false : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`relative block h-full w-full transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${guard ? 'img-guard' : ''} ${imgClassName}`}
        />
      )}
      {watermark && <span aria-hidden="true" className="cert-watermark absolute inset-0 block" />}
    </span>
  )
}
