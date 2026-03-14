# AWS Cognito Setup Guide for Craftantra AI

## Current Issues

1. **Missing Environment Variables** - Cognito credentials are not configured
2. **Placeholder Values** - The app is using placeholder credentials instead of real ones
3. **No User Pool Created** - You need to create an AWS Cognito User Pool first
4. **Missing Client Configuration** - The app client needs proper settings

---

## Step 1: Create AWS Cognito User Pool

### Via AWS Console

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito)
2. Click **Create user pool**
3. Choose **Authentication providers**:
   - ✅ Cognito user pool
   - ✅ Email
4. Click **Next**

### Configure Sign-in Experience

1. **Sign-in options**: Select **Email**
2. **Multi-factor authentication**: Select **No MFA** (for development)
3. Click **Next**

### Configure Security Requirements

1. **Password policy**: Keep defaults or customize
2. **Account recovery**: Select **Email only**
3. Click **Next**

### Configure Sign-up Experience

1. **Self-service sign-up**: ✅ Enable
2. **Attribute verification and user account confirmation**:
   - ✅ Send email message to verify address
3. **Verifying attribute changes**: ✅ Keep as is
4. Click **Next**

### Configure Message Delivery

1. **Email provider**: Select **Send email with Cognito**
2. Click **Next**

### Integrate Your App

1. **User pool name**: `craftantra-ai-pool`
2. Click **Next**

### Review and Create

1. Review all settings
2. Click **Create user pool**

---

## Step 2: Create App Client

1. In your User Pool, go to **App integration** → **App clients and analytics**
2. Click **Create app client**
3. **App client name**: `craftantra-ai-client`
4. **Client type**: Select **Public client**
5. **Authentication flows**:
   - ✅ ALLOW_USER_PASSWORD_AUTH
   - ✅ ALLOW_REFRESH_TOKEN_AUTH
6. Click **Create app client**

---

## Step 3: Get Your Credentials

### Find User Pool ID

1. Go to **User pools** → Your pool name
2. Look for **User pool ID** (format: `us-east-1_XXXXXXXXX`)
3. Copy this value

### Find Client ID

1. Go to **App integration** → **App clients and analytics**
2. Click your app client name
3. Look for **Client ID**
4. Copy this value

---

## Step 4: Configure Environment Variables

### Create `.env.local` File

In your project root, create `.env.local`:

```env
# AWS Cognito Configuration
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
NEXT_PUBLIC_COGNITO_CLIENT_ID=1234567890abcdefghijklmnop

# Google OAuth (optional, for YouTube integration)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace:
- `us-east-1_XXXXXXXXX` with your actual User Pool ID
- `1234567890abcdefghijklmnop` with your actual Client ID

---

## Step 5: Test Locally

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Go to signup page**:
   ```
   http://localhost:3000/signup
   ```

3. **Create a test account**:
   - Email: `test@example.com`
   - Password: `TestPassword123!`
   - Confirm password

4. **Check your email** for verification link

5. **Go to login page**:
   ```
   http://localhost:3000/login
   ```

6. **Sign in** with your test credentials

7. **You should be redirected** to `/dashboard/overview`

---

## Step 6: Deploy to AWS Amplify

### Update Amplify Environment Variables

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Select your app
3. Go to **Deployment settings** → **Environment variables**
4. Add:
   ```
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
   NEXT_PUBLIC_COGNITO_CLIENT_ID=1234567890abcdefghijklmnop
   ```
5. **Redeploy** your app

---

## Troubleshooting

### Issue: "Invalid client id"

**Solution**: 
- Verify Client ID is correct in `.env.local`
- Make sure you're using the **Client ID**, not the User Pool ID
- Restart dev server after changing `.env.local`

### Issue: "User does not exist"

**Solution**:
- Make sure you signed up first before trying to log in
- Check your email for verification link
- Verify the email address matches exactly

### Issue: "Password did not conform to policy"

**Solution**:
- Password must be at least 8 characters
- Include uppercase, lowercase, numbers, and special characters
- Example: `TestPassword123!`

### Issue: "Email already exists"

**Solution**:
- Use a different email address
- Or delete the user from Cognito console and try again

### Issue: "Cognito is not enabled" message

**Solution**:
- Check that `.env.local` file exists in project root
- Verify `NEXT_PUBLIC_COGNITO_USER_POOL_ID` is set (not placeholder)
- Verify `NEXT_PUBLIC_COGNITO_CLIENT_ID` is set (not placeholder)
- Restart dev server: `npm run dev`

---

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use strong passwords** - Minimum 8 characters with mixed case
3. **Enable MFA in production** - Go to User Pool settings
4. **Use HTTPS in production** - Amplify handles this automatically
5. **Rotate credentials regularly** - Create new app clients periodically

---

## Next Steps

After Cognito is working:

1. ✅ Users can sign up and log in
2. ✅ User data is stored in Cognito
3. ✅ Sessions persist across page refreshes
4. ✅ Protected routes work correctly
5. Connect YouTube OAuth for analytics (see `YOUTUBE_OAUTH_SETUP.md`)

---

## Support

For issues:
- Check [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- Review [Cognito User Pool Settings](https://console.aws.amazon.com/cognito)
- Check browser console for error messages
- Verify environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID)`
