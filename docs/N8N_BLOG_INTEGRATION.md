# n8n Blog Integration Guide

## Overview
This guide explains how to integrate n8n with your Burgan Home Services blog to automatically create and publish blog posts.

## Webhook Endpoint
- **URL**: `https://burganhomeservices.com/api/blog/webhook`
- **Method**: `POST`
- **Authentication**: Bearer token in Authorization header

## Setup Instructions

### 1. Set Environment Variable
Add this to your Vercel environment variables:
```
BLOG_WEBHOOK_SECRET=your-secure-random-token-here
```

### 2. n8n Workflow Setup

#### HTTP Request Node Configuration:
- **Method**: POST
- **URL**: `https://burganhomeservices.com/api/blog/webhook`
- **Authentication**: Add Header
  - **Name**: `Authorization`
  - **Value**: `Bearer your-secure-random-token-here`
- **Headers**:
  - **Content-Type**: `application/json`

#### Request Body Structure:
```json
{
  "title": "10 Essential Home Maintenance Tips for Winter",
  "content": "Your blog post content here...",
  "category": "Seasonal Tips",
  "excerpt": "Prepare your home for winter with these essential maintenance tips.",
  "tags": ["winter", "maintenance", "home care"],
  "author": "Burgan Home Services",
  "featured_image_url": "https://example.com/winter-home.jpg",
  "status": "published"
}
```

### 3. Available Categories
- Home Improvement
- Maintenance Tips
- DIY Guides
- Seasonal Tips
- Project Showcases
- Industry News

### 4. Content Formatting
The content field supports basic markdown:
- **Headers**: Use `## Header` for H2, `### Header` for H3
- **Lists**: Use `- Item` for bullet points
- **Paragraphs**: Separate with double line breaks

### 5. Example n8n Workflow Ideas

#### A. RSS Feed to Blog
1. **RSS Feed Read** node to fetch articles
2. **AI Transform** node to rewrite content
3. **HTTP Request** node to post to webhook

#### B. Weekly Tips Generator
1. **Schedule Trigger** (weekly)
2. **OpenAI** node to generate seasonal tips
3. **HTTP Request** node to create blog post

#### C. Project Showcase Automation
1. **Webhook** trigger from project completion
2. **Format** node to structure content
3. **HTTP Request** node to publish showcase

### 6. Testing the Integration

Test endpoint to verify it's working:
```bash
curl https://burganhomeservices.com/api/blog/webhook
```

Test creating a post:
```bash
curl -X POST https://burganhomeservices.com/api/blog/webhook \
  -H "Authorization: Bearer your-secret-token-here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post",
    "content": "This is a test blog post content.",
    "category": "Home Improvement"
  }'
```

### 7. Response Format

#### Success Response:
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": "uuid",
    "slug": "test-blog-post",
    ...
  },
  "url": "https://burganhomeservices.com/blog/test-blog-post"
}
```

#### Error Response:
```json
{
  "error": "Error message",
  "details": "Specific error details"
}
```

### 8. Best Practices

1. **SEO Optimization**: Always include excerpt and meta_description
2. **Images**: Use high-quality, relevant featured images
3. **Tags**: Use 3-5 relevant tags per post
4. **Content Length**: Aim for 500-1500 words for better SEO
5. **Publishing Schedule**: Consistent posting (e.g., weekly) improves SEO

### 9. Advanced Features

#### Draft Posts
Set `"status": "draft"` to save without publishing. You can review and publish later through the admin panel.

#### Custom Slugs
Provide a custom `"slug"` field to override automatic slug generation.

#### SEO Fields
- `meta_description`: Custom SEO description (160 chars max)
- `meta_keywords`: Array of SEO keywords

### 10. Troubleshooting

- **401 Unauthorized**: Check your bearer token
- **400 Bad Request**: Ensure title, content, and category are provided
- **500 Server Error**: Check Supabase connection and database schema

## Support
For issues or questions, contact infoburganhomeservices@gmail.com