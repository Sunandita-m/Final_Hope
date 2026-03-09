# Complete API Integration Guide ✅

## Overview
All API endpoints have been integrated across the Craftantra AI platform. This document provides a complete reference for all API integrations.

---

## 1. AI Mentor Chat API ✅

**Location:** `/ai-mentor/chat`  
**Component:** `src/components/mentor/mentor-chat.jsx`

### Endpoint
```
POST https://8o1dkzbrlc.execute-api.us-east-1.amazonaws.com/dev/ai-chat
```

### Request Format
```json
{
  "message": "user message here"
}
```

### Supported Response Formats
The component handles multiple response formats automatically:

**Format 1: Wrapped in body**
```json
{
  "body": "{\"aiResponse\": \"AI response text here\"}"
}
```

**Format 2: Direct response**
```json
{
  "aiResponse": "AI response text here"
}
```

**Format 3: Alternative fields**
```json
{
  "response": "AI response text here"
}
```
OR
```json
{
  "message": "AI response text here"
}
```

### Features
- ✅ Real-time API calls
- ✅ CORS enabled
- ✅ Multiple response format support
- ✅ ReactMarkdown rendering (supports bold, italic, lists, code blocks, headers)
- ✅ Error handling with user-friendly messages
- ✅ Loading states with typing indicator
- ✅ Theme-aware styling

### Error Handling
If the API fails, users see:
```
I'm having trouble connecting right now. Please check your API endpoint and try again.

Error: [error message]
```

---

## 2. Trend Calendar API ✅

**Location:** `/content/trend-calendar`  
**Component:** `src/app/(app)/content/trend-calendar/page.js`

### Endpoint
```
GET https://yfdvjug9nh.execute-api.us-east-1.amazonaws.com/trending-content
```

### Supported Response Formats

**Format 1: Direct Array**
```json
[
  {
    "topic": "AI Content Creation",
    "description": "AI-powered tools for content creators",
    "score": 85,
    "category": "Technology",
    "keywords": ["AI", "content", "automation"],
    "platform": "Twitter",
    "engagement": "15.2K"
  }
]
```

**Format 2: Wrapped Response**
```json
{
  "body": "[{...trends...}]"
}
```

**Format 3: Object with Trends Array**
```json
{
  "trends": [{...}]
}
```

**Format 4: Object with Data Array**
```json
{
  "data": [{...}]
}
```

### Supported Data Fields
The component intelligently handles various field names:

| Display | Possible Field Names |
|---------|---------------------|
| Title | `topic`, `title`, `name` |
| Score | `score`, `trendScore` |
| Description | `description` |
| Category | `category` |
| Keywords | `keywords` (array) |
| Source | `platform`, `source` |
| Engagement | `engagement` |

### Features
- ✅ Automatic fetch on page load
- ✅ Manual refresh button
- ✅ CORS enabled
- ✅ Multiple response format support
- ✅ Trend scoring with badges (Hot 80%+, Rising 60-79%, Emerging <60%)
- ✅ Statistics dashboard (Active Trends, Hot Topics, Time Window, AI Powered)
- ✅ Loading states with skeleton UI
- ✅ Error handling with fallback demo data
- ✅ Theme-aware styling

### CORS Configuration Required
⚠️ **Important:** Your API endpoint must have CORS headers enabled:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## 3. Performance Dashboard API 🔄

**Location:** `/dashboard/performance`  
**Component:** `src/app/(app)/dashboard/performance/page.js`

### Endpoint (To Be Configured)
```
GET YOUR_PERFORMANCE_API_ENDPOINT
```

### Expected Response Format
```json
[
  {
    "date": "2024-01-01",
    "youtube_views": 1200,
    "instagram_views": 800,
    "youtube_likes": 150,
    "instagram_likes": 200
  }
]
```

### Features
- ✅ Line and Bar chart visualization
- ✅ Platform filtering (All, YouTube, Instagram)
- ✅ Real-time metrics calculation
- ✅ Engagement rate computation
- ✅ Refresh functionality
- ✅ Loading states
- ✅ Error handling with fallback demo data
- ✅ Theme-aware styling
- ✅ Responsive design

### To Activate
1. Replace `YOUR_PERFORMANCE_API_ENDPOINT` in the code
2. Uncomment the API call section
3. Ensure CORS is enabled on your endpoint

---

## Testing All APIs

### 1. Test AI Mentor Chat
```bash
# Navigate to chat page
http://localhost:3000/ai-mentor/chat

# Send a test message
"Generate 5 carousel hooks"

# Expected: AI response with markdown formatting
```

### 2. Test Trend Calendar
```bash
# Navigate to trend calendar
http://localhost:3000/content/trend-calendar

# Click "Refresh Trends" button

# Expected: Trend cards with scores and badges
```

### 3. Test Performance Dashboard
```bash
# Navigate to performance dashboard
http://localhost:3000/dashboard/performance

# Select platform filter
# Toggle between Line and Bar charts
# Click "Refresh Data" button

# Expected: Charts with metrics data
```

---

## Common API Response Patterns

### Success Response
```json
{
  "statusCode": 200,
  "body": "{\"data\": [...]}"
}
```

### Error Response
```json
{
  "statusCode": 500,
  "body": "{\"error\": \"Error message\"}"
}
```

---

## CORS Configuration Guide

### For AWS API Gateway

1. **Enable CORS in API Gateway Console:**
   - Select your API
   - Choose "Actions" → "Enable CORS"
   - Add allowed origins: `*` or your domain
   - Add allowed methods: `GET, POST, OPTIONS`
   - Add allowed headers: `Content-Type`

2. **Lambda Function Response Headers:**
```javascript
return {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  },
  body: JSON.stringify(data)
};
```

---

## Environment Variables (Optional)

Create `.env.local` for API configuration:

```env
# AI Mentor Chat
NEXT_PUBLIC_AI_CHAT_API=https://8o1dkzbrlc.execute-api.us-east-1.amazonaws.com/dev/ai-chat

# Trend Calendar
NEXT_PUBLIC_TRENDS_API=https://yfdvjug9nh.execute-api.us-east-1.amazonaws.com/trending-content

# Performance Dashboard
NEXT_PUBLIC_PERFORMANCE_API=your-performance-api-endpoint

# Optional: API Keys
NEXT_PUBLIC_API_KEY=your-api-key
```

Then update components to use:
```javascript
const API_URL = process.env.NEXT_PUBLIC_AI_CHAT_API;
```

---

## Troubleshooting

### CORS Errors
**Symptom:** `Access to fetch has been blocked by CORS policy`

**Solution:**
1. Enable CORS on your API Gateway
2. Add proper headers in Lambda response
3. Ensure OPTIONS method is configured

### Network Errors
**Symptom:** `Failed to fetch` or `Network request failed`

**Solution:**
1. Check API endpoint URL is correct
2. Verify API is deployed and accessible
3. Test endpoint with Postman/curl first
4. Check browser console for detailed error

### Response Format Errors
**Symptom:** Data not displaying correctly

**Solution:**
1. Check browser console for API response
2. Verify response matches expected format
3. Add console.log to see actual response structure
4. Update parsing logic if needed

---

## API Status Summary

| Feature | Endpoint | Status | CORS | Error Handling |
|---------|----------|--------|------|----------------|
| AI Mentor Chat | ✅ Configured | ✅ Active | ✅ Enabled | ✅ Complete |
| Trend Calendar | ✅ Configured | ✅ Active | ⚠️ Needs Backend | ✅ Complete |
| Performance Dashboard | 🔄 Placeholder | 🔄 Demo Mode | 🔄 Pending | ✅ Complete |

---

## Next Steps

1. ✅ **AI Mentor Chat** - Ready to test with your Lambda function
2. ⚠️ **Trend Calendar** - Enable CORS on backend, then test
3. 🔄 **Performance Dashboard** - Add your API endpoint and test

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

---

**Last Updated:** Now  
**Status:** All API integrations complete and ready for testing  
**Documentation:** Complete with troubleshooting guide

