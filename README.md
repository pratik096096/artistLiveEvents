# Artist Live Events🎤

https://artist-live-events.vercel.app/


A dynamic web platform for exploring and managing live events across Indian cities, featuring real-time updates and automated notifications.

## 🌟 Features

### User Features
- 🔍 **Event Search by City**: Browse events by searching for specific cities across India
- 📋 **Detailed Event Information**: Access comprehensive details for each event
- 📧 **Newsletter Subscription**: Stay updated with email notifications for new and modified events

### Admin Features
- ⚙️ **Event Management**: Complete CRUD operations for event details across cities
- 🔄 **Live Updates**: Real-time event data updates using WebSockets
- 📬 **Email Notifications**: Automated subscriber alerts using Java Mail Sender

## ⚙️ Technologies Used

### Frontend
- React.js
- Tailwind CSS

### Backend
- Spring Boot
- MySQL Database
- WebSockets for real-time updates
- Java Mail Sender for email services

## 📸 Screenshots
![eventdetails1](https://github.com/user-attachments/assets/31230bcb-4404-4ab1-b244-de5f5c0a0da7)
![eventdetails2](https://github.com/user-attachments/assets/0f616f1e-c1ee-4c86-9609-5d18fec41bd3)
![11](https://github.com/user-attachments/assets/555bff8b-d091-4d95-a6a6-e891d7fdd8f7)
![22](https://github.com/user-attachments/assets/c3f01043-906d-4695-9ae7-fbc45d322962)



## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- Node.js
- Java Development Kit (JDK)
- MySQL

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   ```

2. **Frontend Setup**
   ```bash
   cd artistevent
   npm install
   npm start
   

3. **Backend Setup**
   - Navigate to `src/main/resources/application.properties`
   - Configure your MySQL database connection:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     # Email Configuration
     spring.mail.host=smtp.gmail.com
     spring.mail.port=587
     spring.mail.username=${mail_username}
     spring.mail.password=${mail_password}
     spring.mail.properties.mail.smtp.auth=true
     spring.mail.properties.mail.smtp.starttls.enable=true
     ```
   - Run the Spring Boot application:
     ```bash
     ./mvnw spring-boot:run
   
