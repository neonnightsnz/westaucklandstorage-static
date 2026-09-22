import { defineConfig } from 'vitest/config';

// The suite covers the blog data pipeline: the shape of src/data/blogPosts.json,
// slug uniqueness, and the curated -> shipped transform run by build:blog.
export default defineConfig({
  test: {
    include: ['test/**/*.test.mjs'],
    environment: 'node',
  },
});
