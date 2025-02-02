import { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-l-transparent border-b-transparent"></div>
          <p className="text-gray-600 font-semibold animate-pulse">
            Загрузка...
          </p>
        </div>
      </div>
    );
  }
}
