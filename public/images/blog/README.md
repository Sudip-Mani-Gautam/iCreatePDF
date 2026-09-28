# Blog Images Directory

All images for blog posts should be stored in this directory:
`public/images/blog/`

### File Naming Convention
- **Cover Images**: Name the cover image to match the blog post slug:
  - Example: `how-to-merge-pdf-files-online-free.webp`
  - Reference in `src/config/blog-posts.ts`:
    ```typescript
    coverImage: '/images/blog/how-to-merge-pdf-files-online-free.webp'
    ```
- **Inline Article Images**:
  - Example: `how-to-merge-pdf-files-online-free-step-1.webp`
  - Reference in markdown content:
    ```markdown
    ![Step 1 Screenshot](/images/blog/how-to-merge-pdf-files-online-free-step-1.webp)
    ```

### Recommended Dimensions & Formats
- Format: `.webp`, `.jpg`, or `.png` (WebP recommended for fast load speeds)
- Aspect ratio: `16:9` or `1200 x 630 px` for optimal social cards and responsive display.
