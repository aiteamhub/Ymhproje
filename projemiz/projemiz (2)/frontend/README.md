# Healthy Life - Frontend

This is the frontend application for the Healthy Life project, a health management system that helps users track their health metrics and receive personalized recommendations.

## Features

- User authentication (login/register)
- Dashboard with health metrics overview
- Health metrics tracking and visualization
- Personalized health recommendations
- Profile management

## Technologies Used

- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- Chart.js
- Axios

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthy-life.git
cd healthy-life/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_NAME=Healthy Life
REACT_APP_VERSION=1.0.0
```

## Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── store/         # Redux store and slices
  ├── utils/         # Utility functions
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
