/**
 * Generate a URL-friendly slug from a string
 * Example: "Refresh Body Wash" → "refresh-body-wash"
 */
export function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')       // spaces/underscores → hyphens
    .replace(/[^\w\-]+/g, '')      // remove non-word chars (except hyphens)
    .replace(/\-\-+/g, '-')        // collapse multiple hyphens
    .replace(/^-+/, '')            // trim leading hyphens
    .replace(/-+$/, '');           // trim trailing hyphens
}

/**
 * Ensure slug is unique within a collection
 * If "my-slug" exists, returns "my-slug-2", "my-slug-3", etc.
 */
export function ensureUniqueSlug(slug, existingItems, excludeId = null) {
  const slugs = existingItems
    .filter(item => item.id !== excludeId)
    .map(item => item.slug);

  if (!slugs.includes(slug)) return slug;

  let counter = 2;
  while (slugs.includes(`${slug}-${counter}`)) {
    counter++;
  }
  return `${slug}-${counter}`;
}
