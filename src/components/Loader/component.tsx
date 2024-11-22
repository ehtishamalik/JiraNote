import { Oval } from 'react-loader-spinner';
import { LoaderProps } from './types';

export const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <Oval
      height={200}
      width={200}
      secondaryColor="#535bf280"
      color="#646cff"
      ariaLabel="ball-triangle-loading"
      visible={isLoading}
    />
  );
};
