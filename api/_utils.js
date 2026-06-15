export function serverError(res, err, publicMessage = "An unexpected error occurred. Please try again.") {
  // Always log the full error server-side
  console.error("[API Error]", err?.message ?? err);
  // Return a safe generic message to the client
  return res.status(500).json({ success: false, error: publicMessage });
}
