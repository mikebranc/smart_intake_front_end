# Smart Intake Application

This project is a smart intake application that allows users to set up intake form templates and complete them over the phone. It combines a Next.js frontend with a FastAPI backend, leveraging Twilio, Langchain, and OpenAI to provide an intelligent, voice-based form completion experience.

🔗 [Demo](https://drive.google.com/file/d/1OS5fySWRzfcBmNQKfG8dr0uR5Ryydpm2/view?usp=drive_link)
<br/>
🔗 [Backend Repository](https://github.com/mikebranc/smart_intake_backend)

## Features

- Create and manage intake form templates
- Voice-based form completion over the phone
- AI-powered conversation flow using OpenAI and Langchain (done in backend)
- View and manage form responses
- Integration with Twilio for phone call handling (done in backend)

## Application Flow

1. **Form Templates Management** (`app/templates/page.tsx`)
   - View a list of existing form templates
   - Create new templates
   - Edit existing templates
   - Set a template as current for use in phone calls

2. **New Template Creation** (`app/templates/new/page.tsx`)
   - Interface for creating a new form template

3. **Template Details** (`app/templates/[id]/page.tsx`)
   - View and edit details of a specific form template

4. **Form Responses** (`app/responses/page.tsx`)
   - View a list of all form responses
   - Access detailed information for each response

5. **Response Details** (`app/responses/[id]/page.tsx`)
   - View detailed information about a specific form response
   - See the associated conversation thread and messages

6. **Live Chat** (`app/live-chat/page.tsx`)
   - Development tool for viewing real-time updates of ongoing phone conversations

## Key Components

- `FormTemplatesTableComponent`: Displays a table of form templates with options to edit, delete, and set as current.
- `FormTemplateDetailPageComponent`: Handles the creation and editing of form templates.
- `FormResponsesTableComponent`: Shows a table of form responses.
- `FormDetailsPageComponent`: Displays detailed information about a form response, including the conversation thread.
- `ConversationSectionComponent`: Renders the conversation thread between the user and the AI assistant.

## Backend Integration

The FastAPI backend handles:
- Twilio integration for phone calls
- AI processing using OpenAI and Langchain
- Storage and retrieval of form templates and responses

## Getting Started

To run this project locally:

1. Clone this repository
2. Install dependencies: `npm install`
3. Set up your environment variables:
   - Create a `.env.local` file in the root directory
   - Add `NEXT_PUBLIC_BACKEND_URL=<your_backend_url>` to the file
4. Run the development server: `npm run dev`

Make sure to also set up and run the backend server. Refer to the [backend repository](https://github.com/mikebranc/smart_intake_backend) for instructions.

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL`: The URL of your FastAPI backend service.

## Future Improvements

- Add user authentication and authorization
- Implement a dashboard for managing multiple intake form templates
- Enhance the AI model for more accurate and context-aware responses
- Improve error handling and provide better user feedback
- Implement real-time updates using WebSockets instead of polling


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
