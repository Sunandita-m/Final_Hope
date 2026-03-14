# Cognito Issues and Solutions

## Problems Identified

### 1. **Missing Environment Variables**
**Issue**: The app uses placeholder values for Cognito credentials
```
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_placeholder
NEXT_PUBLIC_COGNITO_CLIENT_ID=placeholder-client-id
```

**Why it fails**: Cognito can't authenticate with placeholder credentials. Real AWS Cognito User Pool ID and Client ID are required.

**Solution**: Create `.env.local` file with real credentials from AWS Cognito console.

---

### 2. **No AWS Cognito User Pool Created**
**Issue**: You haven't created an AWS Cognito User Pool yet

**Why it fails**: Without a User Pool, there are no credentials to use. The app has nowhere to store user data.

**Solution**: Follow the step-by-step guide in `COGNITO_SETUP_GUIDE.md` to create a User Pool.

---

### 3. **No App Client Configuration**
**Issue**: Even if a User Pool exists, you need to create an App Client within it

**Why it fails**: The App Client provides the Client ID that the app uses to communicate with Cognito.

**Solution**: Create an App Client in your User Pool (see `COGNITO_SETUP_GUIDE.md`).

---

### 4. **Poor Error Messaging**
**Issue**: When Cognito isn't configured, users see cryptic errors

**Why it fails**: Users don't know what's wrong or how to fix it

**Solution**: Added helpful warning messages on login/signup pages that explain the issue and point to setup guide.

---

## What I Fixed

### ✅ Improved Cognito Configuration Detection

**Before**:
```javascript
// Would silently use placeholder values
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "us-east-1_placeholder",
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "placeholder-client-id",
};
```

**After**:
```javascript
export function isUserPoolConfigured() {
  const poolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  
  return poolId && 
         clientId && 
         !poolId.includes('placeholder') && 
         !clientId.includes('placeholder');
}
```

Now the app can detect if Cognito is properly configured.

---

### ✅ Added User-Friendly Error Messages

**Login Page** now shows:
```
⚠️ Cognito Not Configured
Please set up AWS Cognito credentials in your .env.local file.
```

**Signup Page** shows the same warning.

---

### ✅ Created Comprehensive Setup Guide

New file: `COGNITO_SETUP_GUIDE.md` includes:
- Step-by-step AWS Cognito User Pool creation
- App Client configuration
- How to get credentials
- Environment variable setup
- Local testing instructions
- Deployment to AWS Amplify
- Troubleshooting section

---

## How to Fix Cognito

### Quick Start (5 minutes)

1. **Go to AWS Cognito Console**
   ```
   https://console.aws.amazon.com/cognito
   ```

2. **Create User Pool**
   - Click "Create user pool"
   - Select "Email" as sign-in option
   - Keep defaults for other settings
   - Click "Create"

3. **Create App Client**
   - Go to "App integration" → "App clients and analytics"
   - Click "Create app client"
   - Name: `craftantra-ai-client`
   - Select "Public client"
   - Enable "ALLOW_USER_PASSWORD_AUTH" and "ALLOW_REFRESH_TOKEN_AUTH"
   - Click "Create"

4. **Get Your Credentials**
   - User Pool ID: Copy from User pool overview
   - Client ID: Copy from App client settings

5. **Create `.env.local`**
   ```env
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
   NEXT_PUBLIC_COGNITO_CLIENT_ID=1234567890abcdefghijklmnop
   ```

6. **Restart Dev Server**
   ```bash
   npm run dev
   ```

7. **Test**
   - Go to http://localhost:3000/signup
   - Create an account
   - Check your email for verification
   - Go to http://localhost:3000/login
   - Sign in with your credentials

---

## Verification Checklist

- [ ] AWS Cognito User Pool created
- [ ] App Client created in User Pool
- [ ] User Pool ID copied to `.env.local`
- [ ] Client ID copied to `.env.local`
- [ ] `.env.local` file is in project root (not in git)
- [ ] Dev server restarted after creating `.env.local`
- [ ] No "Cognito Not Configured" warning on login page
- [ ] Can sign up with email
- [ ] Can verify email
- [ ] Can log in with credentials
- [ ] Redirects to dashboard after login

---

## Common Issues

### "Cognito is not configured"
- Check `.env.local` exists in project root
- Verify `NEXT_PUBLIC_COGNITO_USER_POOL_ID` is set (not placeholder)
- Verify `NEXT_PUBLIC_COGNITO_CLIENT_ID` is set (not placeholder)
- Restart dev server

### "Invalid client id"
- Copy Client ID again from AWS console
- Make sure it's the Client ID, not User Pool ID
- Restart dev server

### "User does not exist"
- Sign up first before trying to log in
- Check email for verification link
- Verify email address matches exactly

### "Password did not conform to policy"
- Use at least 8 characters
- Include uppercase, lowercase, numbers, special characters
- Example: `TestPassword123!`

---

## Files Modified

1. **src/cognitoConfig.js** - Added configuration detection
2. **src/app/login/page.js** - Added error handling and warnings
3. **src/app/signup/page.js** - Added error handling and warnings
4. **COGNITO_SETUP_GUIDE.md** - New comprehensive setup guide
5. **.env.local.example** - Already had template (no changes needed)

---

## Next Steps

1. Follow `COGNITO_SETUP_GUIDE.md` to set up AWS Cognito
2. Create `.env.local` with your credentials
3. Test signup and login locally
4. Deploy to AWS Amplify with environment variables
5. Test signup and login on production

---

## Support

- See `COGNITO_SETUP_GUIDE.md` for detailed instructions
- Check AWS Cognito documentation: https://docs.aws.amazon.com/cognito/
- Review browser console for error messages
- Check `.env.local` file exists and has correct values
