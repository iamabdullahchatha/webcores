import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { SectionShell } from "@/components/admin/ui/SectionShell";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

export const Route = createFileRoute("/admin/settings")({
  component: SiteSettingsPage,
});

type Row = Database["public"]["Tables"]["site_settings"]["Row"];

type Fields = {
  site_name: string;
  phone_uae: string;
  phone_uk: string;
  email: string;
  whatsapp_url: string;
  address_line1: string;
  address_line2: string;
  social_linkedin: string;
  social_facebook: string;
};

const DEFAULTS: Fields = {
  site_name: "Webcore Solutions",
  phone_uae: "+971 50 716 9200",
  phone_uk: "+44 7570 792516",
  email: "info@webcoreuae.com",
  whatsapp_url: "https://wa.me/447570792516",
  address_line1: "Dubai, United Arab Emirates",
  address_line2: "",
  social_linkedin: "https://www.linkedin.com/in/webcore-solutions-939b88408",
  social_facebook: "https://www.facebook.com/profile.php?id=61587249472207",
};

function SiteSettingsPage() {
  const qc = useQueryClient();
  const [fields, setFields] = useState<Fields>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "main")
        .single();

      if (data) {
        const row = data as unknown as Row;
        setFields({
          site_name: row.site_name ?? DEFAULTS.site_name,
          phone_uae: row.phone_uae ?? DEFAULTS.phone_uae,
          phone_uk: row.phone_uk ?? DEFAULTS.phone_uk,
          email: row.email ?? DEFAULTS.email,
          whatsapp_url: row.whatsapp_url ?? DEFAULTS.whatsapp_url,
          address_line1: row.address_line1 ?? DEFAULTS.address_line1,
          address_line2: row.address_line2 ?? "",
          social_linkedin: row.social_linkedin ?? DEFAULTS.social_linkedin,
          social_facebook: row.social_facebook ?? DEFAULTS.social_facebook,
        });
      }
      setLoaded(true);
    })();
  }, []);

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function save() {
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from("site_settings")
        .upsert({
          id: "main",
          site_name: fields.site_name,
          phone_uae: fields.phone_uae,
          phone_uk: fields.phone_uk,
          email: fields.email,
          whatsapp_url: fields.whatsapp_url,
          address_line1: fields.address_line1,
          address_line2: fields.address_line2 || null,
          social_linkedin: fields.social_linkedin,
          social_facebook: fields.social_facebook,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      await qc.invalidateQueries({ queryKey: ["content", "site-settings"] });
      toast.success("Site settings saved.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 glass rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">

      <SectionShell heading="Contact Information" onSave={save} saving={saving}>
        <FormField label="Site Name" htmlFor="site_name">
          <input
            id="site_name"
            type="text"
            className={inputClass}
            value={fields.site_name}
            onChange={set("site_name")}
          />
        </FormField>
        <FormField label="UAE Phone" htmlFor="phone_uae">
          <input
            id="phone_uae"
            type="text"
            className={inputClass}
            value={fields.phone_uae}
            onChange={set("phone_uae")}
          />
        </FormField>
        <FormField label="UK Phone" htmlFor="phone_uk">
          <input
            id="phone_uk"
            type="text"
            className={inputClass}
            value={fields.phone_uk}
            onChange={set("phone_uk")}
          />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            className={inputClass}
            value={fields.email}
            onChange={set("email")}
          />
        </FormField>
        <FormField label="WhatsApp URL" htmlFor="whatsapp_url" hint="Full wa.me link">
          <input
            id="whatsapp_url"
            type="url"
            className={inputClass}
            value={fields.whatsapp_url}
            onChange={set("whatsapp_url")}
          />
        </FormField>
      </SectionShell>

      <SectionShell heading="Address" onSave={save} saving={saving}>
        <FormField label="Address Line 1" htmlFor="address_line1">
          <input
            id="address_line1"
            type="text"
            className={inputClass}
            value={fields.address_line1}
            onChange={set("address_line1")}
          />
        </FormField>
        <FormField label="Address Line 2" htmlFor="address_line2" hint="Optional second line">
          <input
            id="address_line2"
            type="text"
            className={inputClass}
            value={fields.address_line2}
            onChange={set("address_line2")}
            placeholder="(optional)"
          />
        </FormField>
      </SectionShell>

      <SectionShell heading="Social Links" onSave={save} saving={saving}>
        <FormField label="LinkedIn URL" htmlFor="social_linkedin">
          <input
            id="social_linkedin"
            type="url"
            className={inputClass}
            value={fields.social_linkedin}
            onChange={set("social_linkedin")}
          />
        </FormField>
        <FormField label="Facebook URL" htmlFor="social_facebook">
          <input
            id="social_facebook"
            type="url"
            className={inputClass}
            value={fields.social_facebook}
            onChange={set("social_facebook")}
          />
        </FormField>
      </SectionShell>

    </div>
  );
}
