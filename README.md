# Project Title: LearnAI

## Team Name: SmartTutors

### Team Members:
- Vedat Alp Goktepe - vedat.goktepe@mail.utoronto.ca
- ~~Minjun Kim - minjunn.kim@mail.utoronto.ca~~
- ~~Ashwin Mallik - ashwin.mallik@mail.utoronto.ca~~

### Brief Description of the Web Application:
LearnAI is a web application designed to support your learning experience. Users can input their desired topics they wish to learn or improve in, such as data structures or making a website. LearnAI then intelligently makes a simple course to follow that teaches the user about the topic. By teaching concepts in increasing difficulty from low to medium to high, it ensures usability even for topics the user is unfamiliar with.

### Required Elements
- **User Authentication**: Implement secure login and registration for users.
- **Prompt Input**: Allow users to input a topic/topics they want to learn.
- **AI Integration**: Use AI to generate what a collection of content the user can use to learn said topic (e.g. relevant information, images/diagrams, flashcards, quizzes).
- **Responsive Design**: Ensure the application is accessible on various devices (desktop, tablet, mobile).

- **Frontend Framework:**
  - The application will use **[Angular](https://angular.io/)** as the modern frontend framework.
  - It will be a **Single Page Application (SPA)** to ensure a seamless user experience.
  
- **Backend API:**
  - **[Express](https://expressjs.com/)** will be used as the core backend API.
  - **[MongoDB](https://mongodb.com/)** will be used as the database.
  - The API will be designed to be **RESTful** where appropriate to ensure standard communication protocols.

- **Deployment:**
  - The application will be deployed on a **Virtual Machine using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)**.
  - All deployment files, including **CI files for building images**, will be committed to GitHub.
  - The application will be accessible to the general public without any extra steps.

- **Third-party API:**
  - The application will interact with several third-party APIs, including:
    - **[GPT (OpenAI)](https://openai.com/api/)** for AI chat functionality.
  - We will monitor usage limits in the free tier to ensure continuous functionality.

- **OAuth 2.0:**
  - The application will implement **OAuth 2.0** for user authentication and authorization to secure access to the application.

### Additional Requirements
- **Webhook Interaction:**
  - A piece of the application will interact with a webhook by an external service. For example, if a user has connected their phone number to their account, using Twilio webhooks, the application can generate content for their accounts through text messages.

- **Long-running Task:**
  - The application will include functionality that executes a long-running task, such as generating various learning materials (text, diagrams, quizzes, etc.) through, and aggregating the data from third-party APIs such as GPT to provide a comprehensive learning experience. This task could take more than 10 seconds to complete.

### Milestones
- **Alpha Version**:
  - Basic user authentication
  - Prompt input functionality
  - Initial AI-generated content based on user input

- **Beta Version**:
  - Enhanced AI content generation for project requirements
  - User generated course history
  - Responsive design implementation

- **Final Version**:
  - Complete content generation with flashcards and quizzes
  - Complete generation functionality using webhooks
  - Final bug fixes and performance improvements


### Tech Stack
- **Frontend:** [Angular](https://angular.io/)
- **Backend:** [Express](https://expressjs.com/), [Node.js](https://nodejs.org/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Deployment:** [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **AI Integration:** [GPT (OpenAI)](https://openai.com/api/)
- **Authentication:** OAuth 2.0
- **Webhooks:** Twilio
- **OAuth 2.0:**
  - The application will implement **OAuth 2.0** for user authentication and authorization to secure access to the application.

### Final Submission
- Deployed Website: https://utsc-learnai.tech/
- Project Video Demo: https://youtu.be/jR_Xx_NaP8E
