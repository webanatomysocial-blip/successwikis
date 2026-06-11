import dynamic from 'next/dynamic';

export const eventModuleMap = {
  Episode1: dynamic(() => import('../events/Episode1')),
};
