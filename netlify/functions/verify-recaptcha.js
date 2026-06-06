export async function handler(event, context) {
  const { token } = JSON.parse(event.body);

  const secret = "YOUR_SECRET_KEY";

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `secret=${secret}&response=${token}`
  });

  const data = await response.json();

  // Basic scoring check (v3 returns score 0.0 - 1.0)
  if (data.success && data.score > 0.5) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({ success: false })
    };
  }
}