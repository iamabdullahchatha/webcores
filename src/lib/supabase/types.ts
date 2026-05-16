/**
 * Supabase Database types.
 *
 * Hand-authored to match supabase/migrations/0001_initial_schema.sql.
 * Keep in sync when the schema changes.
 *
 * Generation alternative: `supabase gen types typescript --project-id <id> > types.ts`
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Timestamps = {
  created_at: string;
  updated_at: string;
};

type Profile = Timestamps & {
  id: string;
  email: string;
  full_name: string;
  role: "owner" | "admin" | "editor";
  avatar_url: string | null;
  is_active: boolean;
  invite_token: string | null;
  invited_by: string | null;
};

type LoginHistory = {
  id: string;
  user_id: string | null;
  email: string | null;
  logged_in_at: string;
  ip_address: string | null;
  user_agent: string | null;
  success: boolean;
  failure_reason: string | null;
};

type BlogPost = Timestamps & {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  author_id: string | null;
  status: "draft" | "published";
  published_at: string | null;
  reading_time_min: number | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
};

type SiteSettings = Timestamps & {
  id: string;
  site_name: string | null;
  phone_uae: string | null;
  phone_uk: string | null;
  email: string | null;
  whatsapp_url: string | null;
  address_line1: string | null;
  address_line2: string | null;
  social_linkedin: string | null;
  social_facebook: string | null;
  logo_url: string | null;
  logo_alt: string | null;
};

type HomeHero = Timestamps & {
  id: string;
  badge_label: string | null;
  badge_flag: string | null;
  heading_line1: string | null;
  heading_line2: string | null;
  subtitle: string | null;
  cta_primary_text: string | null;
  cta_primary_href: string | null;
  cta_secondary_text: string | null;
  cta_secondary_href: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
};

type HomeStat = Timestamps & {
  id: string;
  value: string;
  label: string;
  icon_name: string | null;
  color: string | null;
  bg: string | null;
  sort_order: number;
};

type Service = Timestamps & {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  tag: string | null;
  metric: string | null;
  icon_name: string | null;
  color: string | null;
  bg: string | null;
  image_url: string | null;
  image_alt: string | null;
  href: string | null;
  cta_text: string | null;
  sort_order: number;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
};

type ServicePageContent = Timestamps & {
  id: string;
  service_slug: string;
  section_type:
    | "hero"
    | "overview"
    | "features"
    | "process"
    | "deliverables"
    | "tech_stack"
    | "stats"
    | "testimonials"
    | "faqs"
    | "cta";
  heading: string | null;
  subheading: string | null;
  body: string | null;
  data_json: Json | null;
  sort_order: number;
  is_visible: boolean;
};

type ProcessStep = Timestamps & {
  id: string;
  number: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  color: string | null;
  sort_order: number;
};

type PortfolioItem = Timestamps & {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  gradient_from: string | null;
  gradient_to: string | null;
  metric: string | null;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
};

type Testimonial = Timestamps & {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  stars: number;
  avatar_url: string | null;
  page_scope: string;
  sort_order: number;
  is_active: boolean;
};

type Faq = Timestamps & {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  page_scope: string;
  sort_order: number;
  is_active: boolean;
};

type WhyChooseUs = Timestamps & {
  id: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  color: string | null;
  bg: string | null;
  sort_order: number;
};

type TrustLogo = Timestamps & {
  id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
  is_active: boolean;
};

type GlobalRegion = Timestamps & {
  id: string;
  name: string;
  flag: string;
  sort_order: number;
};

type MediaLibrary = Timestamps & {
  id: string;
  file_path: string;
  public_url: string;
  alt_text: string | null;
  mime_type: string | null;
  file_size_kb: number | null;
  bucket: string;
  uploaded_by: string | null;
};

type PageSeoOverride = {
  id: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  updated_at: string;
};

type PageView = {
  id: string;
  page_path: string;
  session_id: string;
  referrer: string | null;
  user_agent: string | null;
  country_code: string | null;
  viewed_at: string;
};

/**
 * Row / Insert / Update split.
 *
 * Insert: omit fields with DB defaults (id, created_at, updated_at,
 * is_active, sort_order, etc.) so callers don't have to supply them.
 *
 * Update: every field optional.
 */
type Table<Row, InsertOmit extends keyof Row = never> = {
  Row: Row;
  Insert: Omit<Row, "id" | "created_at" | "updated_at" | InsertOmit> &
    Partial<Pick<Row, Extract<"id" | "created_at" | "updated_at" | InsertOmit, keyof Row>>>;
  Update: Partial<Row>;
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<Profile, "is_active">;
      login_history: {
        Row: LoginHistory;
        Insert: Omit<LoginHistory, "id" | "logged_in_at"> &
          Partial<Pick<LoginHistory, "id" | "logged_in_at">>;
        Update: Partial<LoginHistory>;
      };
      blog_posts: Table<BlogPost, "status">;
      site_settings: Table<SiteSettings>;
      home_hero: Table<HomeHero>;
      home_stats: Table<HomeStat, "sort_order">;
      services: Table<Service, "sort_order" | "is_active">;
      service_page_content: Table<ServicePageContent, "sort_order" | "is_visible">;
      process_steps: Table<ProcessStep, "sort_order">;
      portfolio_items: Table<PortfolioItem, "sort_order" | "is_active">;
      testimonials: Table<Testimonial, "stars" | "page_scope" | "sort_order" | "is_active">;
      faqs: Table<Faq, "page_scope" | "sort_order" | "is_active">;
      why_choose_us: Table<WhyChooseUs, "sort_order">;
      trust_logos: Table<TrustLogo, "sort_order" | "is_active">;
      global_regions: Table<GlobalRegion, "sort_order">;
      media_library: Table<MediaLibrary, "bucket">;
      page_seo_overrides: {
        Row: PageSeoOverride;
        Insert: Omit<PageSeoOverride, "updated_at"> & Partial<Pick<PageSeoOverride, "updated_at">>;
        Update: Partial<PageSeoOverride>;
      };
      page_views: {
        Row: PageView;
        Insert: Omit<PageView, "id" | "viewed_at"> & Partial<Pick<PageView, "id" | "viewed_at">>;
        Update: Partial<PageView>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_cms_user: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
};
