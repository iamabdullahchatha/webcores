export default function handler(req, res) {
  console.log("API HIT");

  return res.status(200).json({
    success: true,
    message: "API is working",
  });
}