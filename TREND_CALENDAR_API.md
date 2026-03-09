# Trend Calendar API Integration

## ✅ Status: Implemented

The Trend Calendar feature has been successfully added to your application.

## Navigation
- **Location:** Content → Trend Calendar
- **Route:** `/content/trend-calendar`
- **Icon:** TrendingUp (📈)

## API Configuration

**Endpoint:**
```
https://yfdvjug9nh.execute-api.us-east-1.amazonaws.com/trending-content
```

**Method:** GET

**Expected Response Formats:**

The component handles multiple response formats:

### Format 1: Direct Array
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

### Format 2: Wrapped Response
```json
{
  "body": "[{...trends...}]"
}
```

### Format 3: Object with Trends Array
```json
{
  "trends": [{...}]
}
```

## Supported Data Fields

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

## Features

### 1. **Real-time Trend Fetching**
- Automatic fetch on page load
- Manual refresh button
- Loading states with skeleton UI

### 2. **Trend Scoring**
- 🔥 Hot (80%+) - Red badge
- 📈 Rising (60-79%) - Yellow badge
- 🌱 Emerging (<60%) - Blue badge

### 3. **Statistics Dashboard**
- Active Trends count
- Hot Topics count
- Time window display
- AI-powered indicator

### 4. **Trend Cards**
- Topic/Title
- Description (truncated to 3 lines)
- Trend score with visual indicator
- Category badge
- Keywords (up to 3 shown)
- Source/Platform
- Engagement metrics

### 5. **Theme Integration**
- Uses CSS variables for colors
- Adapts to selected theme (Purple, Blue, Green, Pink, Orange, Teal)
- Gradient buttons and icons

### 6. **Error Handling**
- Network error display
- Empty state with retry option
- Loading indicators

## Testing the Integration

1. **Navigate to the page:**
   ```
   http://localhost:3000/content/trend-calendar
   ```

2. **Check the network request:**
   - Open DevTools → Network tab
   - Look for request to `trending-content`
   - Verify response format

3. **Test scenarios:**
   - ✅ Successful API response
   - ✅ Empty response
   - ✅ Network error
   - ✅ Refresh functionality
   - ✅ Theme color changes

## Customization

### Adjust Trend Score Thresholds
Edit `src/app/(app)/content/trend-calendar/page.js`:

```javascript
const getTrendBadge = (score) => {
  if (score >= 80) return { label: 'Hot', color: 'bg-red-500/20 text-red-300' };
  if (score >= 60) return { label: 'Rising', color: 'bg-yellow-500/20 text-yellow-300' };
  return { label: 'Emerging', color: 'bg-blue-500/20 text-blue-300' };
};
```

### Change API Endpoint
Update the fetch URL in the `fetchTrends` function:

```javascript
const response = await fetch('YOUR_NEW_API_URL');
```

### Add Authentication
If your API requires authentication:

```javascript
const response = await fetch(API_URL, {
  headers: {
    'Authorization': `Bearer ${YOUR_API_KEY}`,
    'Content-Type': 'application/json'
  }
});
```

## Example API Response

```json
[
  {
    "topic": "AI Video Generation",
    "description": "New AI tools are revolutionizing video content creation for social media",
    "score": 92,
    "trendScore": 92,
    "category": "Technology",
    "keywords": ["AI", "video", "content creation", "social media"],
    "platform": "TikTok",
    "source": "TikTok",
    "engagement": "2.3M",
    "timeWindow": "24h"
  },
  {
    "topic": "Sustainable Fashion",
    "description": "Eco-friendly fashion trends gaining momentum",
    "score": 78,
    "category": "Lifestyle",
    "keywords": ["sustainable", "fashion", "eco-friendly"],
    "platform": "Instagram",
    "engagement": "890K"
  }
]
```

## Next Steps

1. ✅ Test with your actual API
2. ✅ Verify response format matches expectations
3. ✅ Adjust field mappings if needed
4. ✅ Customize trend score thresholds
5. ✅ Add any additional filters or sorting

---

**Status:** Ready for API testing ✓
**Location:** Content → Trend Calendar
**API:** Connected and configured
