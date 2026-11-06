// Finds images in src/assets by file name (any of png/jpg/jpeg/webp/svg), so a
// missing photo shows a placeholder instead of breaking the build.
const files = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' });

export function asset(name) {
  const key = Object.keys(files).find((p) => p.split('/').pop().replace(/\.[^.]+$/, '') === name);
  return key ? files[key] : null;
}