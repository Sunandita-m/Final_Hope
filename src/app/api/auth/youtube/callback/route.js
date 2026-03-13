export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  
  if (error) {
    return Response.redirect('/dashboard/performance?youtube=error');
  }
  
  if (!code) {
    return Response.redirect('/dashboard/performance?youtube=missing_code');
  }
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    const redirectUri = `${baseUrl}/api/auth/youtube/callback`;
    
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
    }
    
    const tokens = await tokenResponse.json();
    
    // Store tokens in localStorage via redirect with token data
    // In production, you'd store this in a database associated with the user
    const tokenData = encodeURIComponent(JSON.stringify({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
      expires_at: Date.now() + (tokens.expires_in * 1000)
    }));
    
    return Response.redirect(`/dashboard/performance?youtube=connected&tokens=${tokenData}`);
  } catch (error) {
    console.error('YouTube OAuth error:', error);
    return Response.redirect('/dashboard/performance?youtube=error');
  }
}
