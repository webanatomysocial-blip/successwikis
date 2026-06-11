import dynamic from 'next/dynamic';

export const podModuleMap = {
  // Driven by Purpose
  RaghavFoundationPost: dynamic(() => import('../pod/Driven-by-Purpose/RaghavFoundationPost')),
  ZenithEnergyPost: dynamic(() => import('../pod/Driven-by-Purpose/ZenithEnergyPost')),
  AECSastraPost: dynamic(() => import('../pod/Driven-by-Purpose/AECSastraPost')),
  DesiDipsPost: dynamic(() => import('../pod/Driven-by-Purpose/DesiDipsPost')),

  // The Stage Behind the Story
  SingaraMohanPost: dynamic(() => import('../pod/The-stage-behind-the-story/SingaraMohanPost')),
  JogeeswaraPost: dynamic(() => import('../pod/The-stage-behind-the-story/JogeeswaraPost')),
  ShyamSankeerthGuptaPost: dynamic(() => import('../pod/The-stage-behind-the-story/ShyamSankeerthGuptaPost')),
  KrithikaRoyPost: dynamic(() => import('../pod/The-stage-behind-the-story/KrithikaRoyPost')),
  GopalaKrishnaPost: dynamic(() => import('../pod/The-stage-behind-the-story/GopalaKrishnaPost')),
  YagnakumarMallavarapuPost: dynamic(() => import('../pod/The-stage-behind-the-story/YagnakumarMallavarapuPost')),
  SampathKumarCharandasPost: dynamic(() => import('../pod/The-stage-behind-the-story/SampathKumarCharandasPost')),
  ManojGarlapatiPost: dynamic(() => import('../pod/The-stage-behind-the-story/ManojGarlapatiPost')),
  TariniSaiPost: dynamic(() => import('../pod/The-stage-behind-the-story/TariniSaiPost')),
  SoldierRewiredPost: dynamic(() => import('../pod/The-stage-behind-the-story/SoldierRewiredPost')),
  ManWhoBuildsSchoolsPost: dynamic(() => import('../pod/The-stage-behind-the-story/ManWhoBuildsSchoolsPost')),
  GreenRecykloplastPost: dynamic(() => import('../pod/The-stage-behind-the-story/GreenRecykloplastPost')),
  NexGenSoftwarePost: dynamic(() => import('../pod/The-stage-behind-the-story/NexGenSoftwarePost')),
  WestfieldInternationalPost: dynamic(() => import('../pod/The-stage-behind-the-story/WestfieldInternationalPost')),

  // Founder's Unfiltered
  LeenusInfraPost: dynamic(() => import('../pod/founders-unfiltered/LeenusInfraPost')),
  SindhuReddyPost: dynamic(() => import('../pod/founders-unfiltered/SindhuReddyPost')),
  RaghuBodduPost: dynamic(() => import('../pod/founders-unfiltered/RaghuBodduPost')),
};
