import { FC, useState } from 'react';

const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    try {
      throw new Error('Ошибка в кнопке!');
    } catch (error) {
      setHasError(true);
      console.error(error);
    }
  };

  if (hasError) {
    throw new Error('Ошибка в кнопке!');
  }

  return (
    <div className="mt-auto flex justify-end pr-10 pulse">
      <button
        className="hover:cursor-pointer bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mb-5"
        onClick={handleClick}
      >
        Вызвать ошибку
      </button>
    </div>
  );
};

export default ErrorButton;
