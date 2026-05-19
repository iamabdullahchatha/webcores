/**
 * Validates fields against rules.
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validate(body, rules) {
  const errors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const raw = body[field];
    const val = typeof raw === "string" ? raw.trim() : raw;
    if (rule.required && (val === undefined || val === null || val === "")) {
      errors[field] = rule.requiredMsg ?? `${field} is required`;
      continue;
    }
    if (!rule.required && (val === undefined || val === null || val === "")) continue;
    if (rule.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      errors[field] = "Must be a valid email address";
    }
    if (rule.type === "uuid" && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val)) {
      errors[field] = "Must be a valid UUID";
    }
    if (rule.minLen && String(val).length < rule.minLen) {
      errors[field] = `Must be at least ${rule.minLen} characters`;
    }
    if (rule.maxLen && String(val).length > rule.maxLen) {
      errors[field] = `Must be at most ${rule.maxLen} characters`;
    }
    if (rule.pattern && !rule.pattern.test(val)) {
      errors[field] = rule.patternMsg ?? "Invalid format";
    }
    if (rule.oneOf && !rule.oneOf.includes(val)) {
      errors[field] = `Must be one of: ${rule.oneOf.join(", ")}`;
    }
  }
  return Object.keys(errors).length ? { valid: false, errors } : { valid: true, errors: {} };
}
