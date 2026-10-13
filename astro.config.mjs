import { defineConfig } from "astro/config";

export default defineConfig({
  site: 'https://westaucklandstorage.co.nz',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  redirects: { '/services/contact/': '/contact/' },
  devToolbar: {
    enabled: false,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
