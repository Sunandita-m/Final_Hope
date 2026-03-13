export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
  const redirectUri = `${baseUrl}/api/auth/youtube/callback`;
  
  const scope = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}&` +
    `access_type=offline&` +
    `prompt=consent`;
  
  return Response.redirect(authUrl);
}
