export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-paper-border mt-20">
      <div className="max-w-content mx-auto px-6 py-8 text-center text-sm text-paper-muted">
        <p>
          © {year} Qianshi·Luo
        </p>
        <p className="mt-1 text-xs">
          最后更新：{year} 年 {new Date().getMonth() + 1} 月
        </p>
      </div>
    </footer>
  )
}
