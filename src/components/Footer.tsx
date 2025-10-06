import { sitemapItems } from "@/constants";

export default function Footer() {
  return (
    <footer className="mx-4 md:mx-12 lg:mx-32 pt-10 lg:pt-20 pb-6 lg:pb-6">
      <h2 className="pb-6 lg:pb-14 text-3xl md:text-4xl lg:text-7xl font-semibold">
        Video Proctoring System
      </h2>

      <div className="flex gap-x-28">
        <div className="flex flex-col">
          <h3 className="text-[#6e6e73] mb-2">Sitemap</h3>

          {sitemapItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-xl lg:text-[28px] text-[#333336] hover:text-black font-bold"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col">
          <h3 className="text-[#6e6e73] mb-2">Socials</h3>

          <a
            href="https://github.com/amanranahere/video-proctoring-system"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-xl lg:text-[28px] text-[#333336] hover:text-black font-bold"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/amanrana-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-xl lg:text-[28px] text-[#333336] hover:text-black font-bold"
          >
            Linkedin
          </a>
          <a
            href="mailto:amanranahere@gmail.com"
            aria-label="Email"
            className="text-xl lg:text-[28px] text-[#333336] hover:text-black font-bold"
          >
            Mail
          </a>
        </div>
      </div>

      <hr className="my-6 text-gray-400" />

      <div className="flex flex-col md:flex-row justify-between text-xs lg:text-sm text-[#86868b]">
        <span>© 2025 Video Proctoring System. All rights reserved.</span>

        <div>
          Made by{" "}
          <a
            href="https://amanrana.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black duration-150 transition-colors text-[#333336]"
          >
            Aman_Rana
          </a>
        </div>
      </div>
    </footer>
  );
}
