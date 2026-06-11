import dynamic from 'next/dynamic';

export const blogModuleMap = {
  AmbitionPost: dynamic(() => import('../blogs/AmbitionPost')),
  FearFounderPost: dynamic(() => import('../blogs/FearFounderPost')),
  FiguredOutPost: dynamic(() => import('../blogs/FiguredOutPost')),
  TellStoryPost: dynamic(() => import('../blogs/TellStoryPost')),
};
