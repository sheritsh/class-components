import { Component, ErrorInfo, ReactNode } from 'react';
import errorImg from '/error.jpeg';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Ошибка:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Что-то пошло не так
            </h2>
            <p className="text-gray-700 mb-6">
              Пожалуйста, попробуйте перезагрузить страницу
            </p>
            <img
              src={errorImg}
              alt="Ошибка"
              className="mb-6 rounded-lg mx-auto max-w-full h-64 object-cover"
            />
            <button
              onClick={this.handleReload}
              className="hover: cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg
                       transition-colors duration-200 transform hover:scale-105 active:scale-100"
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
