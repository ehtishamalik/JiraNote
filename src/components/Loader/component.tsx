import { BallTriangle } from 'react-loader-spinner';
import { LoaderProps } from './types';

export const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <BallTriangle
      height={200}
      width={200}
      radius={5}
      color="#646cff"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={isLoading}
    />
  );
};
