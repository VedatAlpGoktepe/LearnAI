# Project Title: IntelliCart

## Team Name: ShoppingApes

### Team Members:
- Minjun Kim - minjunn.kim@mail.utoronto.ca
- Vedat Alp Goktepe - vedat.goktepe@mail.utoronto.ca
- Ashwin Mallik - ashwin.mallik@mail.utoronto.ca

### Brief Description of the Web Application:
IntelliCart is a web application designed to simplify your shopping experience. Users can input their shopping list or specify a project they wish to undertake, such as baking a cake or building a shed. IntelliCart then intelligently maps out the nearest stores that have the required materials, highlighting the ones with the best prices. This ensures users can efficiently gather everything they need while saving money.

### Required Elements
- **User Authentication**: Implement secure login and registration for users.
- **Prompt Input**: Allow users to input a list of shopping materials they want.
- **AI Integration**: Use AI to generate what elements are needed in a user's build (e.g., what ingredients will be needed to make a cake).
- **Mapping**: Display the locations of the stores on a map.
- **Price Comparison**: Identify the cheapest options for the required materials.
- **Responsive Design**: Ensure the application is accessible on various devices (desktop, tablet, mobile).

- **Frontend Framework:**
  - The application will use **Angular** as the modern frontend framework.
  - It will be a **Single Page Application (SPA)** to ensure a seamless user experience.
  
- **Backend API:**
  - **Express** will be used as the core backend API.
  - The API will be designed to be **RESTful** where appropriate to ensure standard communication protocols.

- **Deployment:**
  - The application will be deployed on a **Virtual Machine using Docker and Docker Compose**.
  - All deployment files, including **CI files for building images**, will be committed to GitHub.
  - The application will be accessible to the general public without any extra steps.

- **Third-party API:**
  - The application will interact with several third-party APIs, including:
    - **Google Maps API** for route planning.
    - **Stripe** for payment processing.
    - **GPT (OpenAI)** for AI chat functionality.
  - We will monitor usage limits in the free tier to ensure continuous functionality.

- **OAuth 2.0:**
  - The application will implement **OAuth 2.0** for user authentication and authorization to secure access to the application.

### Additional Requirements
- **Webhook Interaction:**
  - A piece of the application will interact with a webhook by an external service. For example, Stripe can send webhooks to notify the application of payment events.

- **Real-time Functionality:**
  - The application will include real-time functionality, such as reflecting other user changes without refreshing. This can be achieved using WebSockets or a similar technology to update item availability in real-time.

- **Long-running Task:**
  - The application will include functionality that executes a long-running task, such as processing and aggregating data from multiple third-party APIs to provide comprehensive shopping suggestions and route planning. This task could take more than 10 seconds to complete.

### Milestones
- **Alpha Version**:
  - Basic user authentication
  - Prompt input functionality
  - Initial AI-generated shopping list based on user input
  - Basic map displaying nearest stores

- **Beta Version**:
  - Enhanced AI content generation for project requirements
  - Initial price comparison functionality
  - User dashboard with shopping cart and previous purchases tracking
  - Responsive design implementation

- **Final Version**:
  - Complete mapping with optimized routes and all nearby stores
  - Full price comparison engine with real-time updates
  - Recommender system for additional items
  - User feedback mechanism
  - Final bug fixes and performance improvements
