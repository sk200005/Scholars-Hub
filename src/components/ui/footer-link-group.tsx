import Link from "next/link"
import { colors } from "@/lib/constants/colors"

interface FooterLinkGroupProps {
  title: string
  links: string[]
}

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-100">
        {title}
      </h3>
      <nav className="mt-4 flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            className="transition-colors text-slate-400 hover:text-white"
          >
            {link}
          </Link>
        ))}
      </nav>
    </div>
  )
}
