import { BatIcon } from './icons/Bat';

const LoadingFallback = () => {
  return (
    <>
      <BatIcon
        className='size-12 animate-fly absolute top-[15%] -left-[100%]'
        style={{ animationDelay: '0s' }}
      />
      <BatIcon
        className='size-12 animate-fly absolute bottom-[15%] -left-[100%]'
        style={{ animationDelay: '3s' }}
      />

      <div className='flex flex-col items-center gap-24 z-10'>
        <img src='assets/images/logo-devathon-translucent.png' alt='Logo' />
        <div className='flex gap-3'>
          <span
            className='size-4 bg-orange-500 rounded-full animate-bounce'
            style={{ animationDelay: '0s' }}
          />
          <span
            className='size-4 bg-orange-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          />
          <span
            className='size-4 bg-orange-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </>
  );
};

export default LoadingFallback;
