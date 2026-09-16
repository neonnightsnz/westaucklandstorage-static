import { defineConfig } from "astro/config";

export default defineConfig({
  site: 'https://westaucklandstorage.co.nz',
  trailingSlash: 'always',
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
