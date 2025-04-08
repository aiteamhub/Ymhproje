# Healthy Life Application

A comprehensive health and nutrition analysis platform that helps users track their food consumption, get AI-powered health insights, and access health-related articles.

## Features

- User authentication and profile management
- Food consumption tracking and analysis
- AI-powered health reports and recommendations
- Health and nutrition articles
- Personalized diet analysis
- Risk assessment and health recommendations

## Technical Stack

- Java 17
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- PostgreSQL
- OpenAI API Integration
- Docker & Docker Compose
- Maven

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL 12 or higher
- Docker and Docker Compose (optional)
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthylife.git
cd healthylife
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

3. Build the application:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

Or using Docker:
```bash
docker-compose up -d
```

## API Documentation

The API documentation is available at `/swagger-ui.html` when the application is running.

### Main Endpoints

- `/api/users` - User management
- `/api/food-analysis` - Food analysis and health reports
- `/api/articles` - Health and nutrition articles

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 