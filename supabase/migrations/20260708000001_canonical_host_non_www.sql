-- Canonical host migration: www.webcoreuae.com -> webcoreuae.com
-- The site's canonical URL format is now https://webcoreuae.com (HTTPS, non-www,
-- no trailing slash). This rewrites every stored content/SEO field that still
-- references the old www host so in-content links no longer hit a redirect.
--
-- Run manually in the Supabase SQL editor (same workflow as the seed files).
-- Idempotent: re-running is a no-op once no www references remain.
-- After running, regenerate the committed fallback: node scripts/generate-seed-fallback.mjs

-- Broken empty markdown links pasted into older posts: [](www.webcoreuae.com)
-- rendered as a relative href and 404'd. Convert to a real absolute link FIRST,
-- before the generic bare-host replace below would rewrite them in place.
update public.blog_posts
set content = replace(content, '[](www.webcoreuae.com)', '[webcoreuae.com](https://webcoreuae.com)')
where content like '%[](www.webcoreuae.com)%';

-- Blog posts: body + SEO fields (absolute www URLs, then bare-host mentions)
update public.blog_posts
set
  content         = replace(replace(content,         'https://www.webcoreuae.com', 'https://webcoreuae.com'), 'www.webcoreuae.com', 'webcoreuae.com'),
  excerpt         = replace(replace(excerpt,         'https://www.webcoreuae.com', 'https://webcoreuae.com'), 'www.webcoreuae.com', 'webcoreuae.com'),
  seo_title       = replace(seo_title,       'www.webcoreuae.com', 'webcoreuae.com'),
  seo_description = replace(seo_description, 'www.webcoreuae.com', 'webcoreuae.com'),
  cover_image_url = replace(cover_image_url, 'https://www.webcoreuae.com', 'https://webcoreuae.com')
where
  content like '%www.webcoreuae.com%'
  or excerpt like '%www.webcoreuae.com%'
  or seo_title like '%www.webcoreuae.com%'
  or seo_description like '%www.webcoreuae.com%'
  or cover_image_url like '%www.webcoreuae.com%';

-- Service page sections (admin-editable, so live rows may have drifted to www)
update public.service_page_content
set
  heading    = replace(heading,    'www.webcoreuae.com', 'webcoreuae.com'),
  subheading = replace(subheading, 'www.webcoreuae.com', 'webcoreuae.com'),
  body       = replace(replace(body, 'https://www.webcoreuae.com', 'https://webcoreuae.com'), 'www.webcoreuae.com', 'webcoreuae.com'),
  data_json  = replace(data_json::text, 'www.webcoreuae.com', 'webcoreuae.com')::jsonb
where
  coalesce(heading, '') like '%www.webcoreuae.com%'
  or coalesce(subheading, '') like '%www.webcoreuae.com%'
  or coalesce(body, '') like '%www.webcoreuae.com%'
  or coalesce(data_json::text, '') like '%www.webcoreuae.com%';

-- Services cards (href / image URLs)
update public.services
set
  href      = replace(href,      'https://www.webcoreuae.com', 'https://webcoreuae.com'),
  image_url = replace(image_url, 'https://www.webcoreuae.com', 'https://webcoreuae.com')
where
  coalesce(href, '') like '%www.webcoreuae.com%'
  or coalesce(image_url, '') like '%www.webcoreuae.com%';
