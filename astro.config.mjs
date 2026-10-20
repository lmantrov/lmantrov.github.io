// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  // Replace <username> and <repo-name> with your actual GitHub username and repository name
  site: 'https://lmantrov.github.io',
//  base: '/lmantrov', // Omit this line or set to '/' only if this is a user page named <username>.github.io

  integrations: [
    starlight({
      title: 'Liudmila Mantrova | Portfolio & CV',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/lmantrov/lmantrov.github.io' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/lmantrov' },
      ],
      sidebar: [
        {
          label: 'Overview',
          items: [
            { label: 'Introduction', link: '/' },
            { label: 'Experience', link: '/cv/' },
          ],
        },
        {
          label: 'Writing Samples',
          items: [{autogenerate: { directory: 'samples' }}],
        },
      ],
      customCss: [
        // Will be used for custom styling or theme tokens later
      ],
    }),
  ],
});
