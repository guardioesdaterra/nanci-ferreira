export interface Expertise {
  title: string
  description: string
  icon: string
}

export interface Organization {
  name: string
  role: string
  description: string
  link?: string
  icon: string
  color: string
}

export interface Project {
  title: string
  category: string
  description: string
  impact: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  type: 'personal' | 'cultural' | 'political' | 'award' | 'education'
}

export interface OdsObjective {
  number: number
  description: string
  color: string
}

export interface LeadershipHighlight {
  title: string
  subtitle: string
  description: string
  year: string
  type: 'march' | 'cultural' | 'community' | 'political' | 'environmental' | 'education'
  icon: string
  color: string
}

export interface GuardioesDaTerra {
  name: string
  type: string
  description: string
  sede: string
  link?: string
  ong: {
    name: string
    fullName: string
    type: string
    description: string
    link?: string
  }
  activities: string[]
}

export interface CulturePoint {
  name: string
  type: string
  badge?: string
  relation: string
  description: string
  link?: string
  handle?: string
  since?: string
  featured?: boolean
  icon: string
  color: string
  activities?: string[]
  event?: {
    name: string
    description: string
    participations: string[]
  }
}

export interface KintalDaDita {
  name: string
  location: string
  type: string
  description: string
  link?: string
  historicSite: {
    name: string
    description: string
    features: string[]
  }
  museum: {
    description: string
    collections: string[]
  }
  agroecology: string[]
  workshops: string[]
}

export interface AgroecologyTraining {
  title: string
  description: string
  activities: string[]
  currentCourse: {
    name: string
    institution: string
    role: string
  }
}

export interface Event {
  name: string;
  icon: string;
}

export interface Tourism {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  linkLabel: string;
}

export interface LineageFigure {
  relation: string
  name: string
  title: string
  description: string
  icon: string
  color: string
}

export interface MethodPillar {
  title: string
  description: string
  icon: string
  color: string
}

export interface Pedagogy {
  title: string
  badge: string
  description: string
  weeklyCommitment: string
  pillars: MethodPillar[]
  fronts: {
    formal: {
      title: string
      description: string
      spaces: string[]
      icon: string
    }
    nonFormal: {
      title: string
      description: string
      spaces: string[]
      icon: string
    }
  }
  accessibility: {
    title: string
    description: string
    items: string[]
  }
}

export interface Territory {
  title: string
  badge: string
  description: string
  frontier: {
    title: string
    description: string
    features: string[]
  }
  ancestralFuture: {
    title: string
    description: string
    quote: string
    quoteAuthor: string
  }
  landmarks: string[]
}

export interface NanciData {
  personal: {
    name: string
    nickname: string
    age: number
    location: string
    title: string
    bio: string
    quote: string
    lineageTitle: string
  }
  lineage: {
    title: string
    badge: string
    description: string
    figures: LineageFigure[]
    transmission: string[]
  }
  pedagogy: Pedagogy
  territory: Territory
  guardioesDaTerra: GuardioesDaTerra
  kintalDaDita: KintalDaDita
  culturePoints: CulturePoint[]
  regionalCulture: string[]
  agroecology: AgroecologyTraining
  expertise: Expertise[]
  organizations: Organization[]
  projects: Project[]
  timeline: TimelineEvent[]
  ods: OdsObjective[]
  leadership: {
    title: string
    highlights: LeadershipHighlight[]
  }
  activism: string[]
  folkCulture: string[]
  events: Event[]
  tourism: Tourism
}

export const nanciData: NanciData = {
  personal: {
    name: 'Nanci Ferreira',
    nickname: 'Dita',
    age: 73,
    location: 'Cascata, Águas da Prata - SP',
    title: 'Anciã, Visionária e Guardiã da Terra',
    lineageTitle: 'Herdeira e Transmissora de Saberes Ancestrais',
    bio: `Nanci Ferreira, Dita, é uma força da natureza. Aos 73 anos é erveira, artista e artesã, consolidou-se como referência cultural de sua região. Idealizadora do Kintal da Dita, um espaço de arte e resistência na Cascata, divisa entre MG e SP, ela dedica a vida à defesa da terra e ao resgate de saberes ancestrais.

Dita é a boca e as mãos de duas gerações que a precederam: neta de curandeira e filha de líder comunitário. Da avó herdou as ervas e a escuta; do pai, o senso de comunidade e a coragem de liderar. Essa linhagem não terminou nela — ela a transmite, todos os dias, às crianças e jovens da região.

Em sua jornada percorreu o Brasil e a América do Sul, e hoje é a "Conselheira da Sabedoria" no Ponto de Cultura premiado Guardiões da Terra — a mestra que ensina biólogos e professores.

É voz ativa na luta pela preservação ambiental, cultural e antinuclear, representando diversos coletivos e associações em sua região.`,
    quote: 'O simples é poderoso',
  },

  lineage: {
    title: 'Linha Ancestral',
    badge: 'Herdeira de Saberes',
    description: 'Dita é o elo vivo entre os saberes que recebeu e as gerações que ainda virão. Neta de curandeira, filha de líder comunitário, hoje é a "Conselheira da Sabedoria" que forma biólogos, professores e jovens artesãos.',
    figures: [
      { relation: 'Avó', name: 'A Curandeira', title: 'Mestra das Ervas', description: 'Guardiã das plantas medicinais e curas da Mata Atlântica, parteira renomada da cidade. Deixou a Dita o conhecimento sobre ervas, sementes e o cuidado com o corpo, a espiritualidade e a terra.', icon: 'Leaf', color: 'from-emerald-500 to-green-600' },
      { relation: 'Pai', name: 'O Líder Comunitário', title: 'Sr. Dito Bizorro', description: 'A quem Dita deve o senso de coletivo e a coragem de liderar. Dele herdou a defesa da comunidade e da terra da Cascata.', icon: 'Users', color: 'from-amber-500 to-orange-600' },
      { relation: 'Nanci (Dita)', name: 'A Conselheira', title: 'Mestra de Mestres', description: 'Transmite o que recebeu: forma biólogos, professores e jovens nas práticas de agroecologia, biojoias e saberes tradicionais.', icon: 'Crown', color: 'from-purple-500 to-fuchsia-600' },
    ],
    transmission: [
      'Contação de histórias e narrativa oral',
      'Plantio manual e cuidado com a terra',
      'Criação de biojoias com sementes e fibras',
      'Saberes das ervas e plantas medicinais',
      'Tradições afro-brasileiras e cultura popular',
      'Culinária Tradicional e Cultural',
    ],
  },

  pedagogy: {
    title: 'O Método Dita',
    badge: 'Sala de Aula Viva',
    description: 'A pedagogia de Dita transforma o Kintal e as escolas em salas de aula vivas. Sem muros, aprende-se com a terra e com a memória: tocar a terra, ouvir as histórias, transformar sementes e fibras em arte.',
    weeklyCommitment: 'Uma dedicação contínua e semanal à transmissão dos saberes — na escola e no Kintal da Dita.',
    pillars: [
      { title: 'Narrativa Oral', description: 'Cada planta, cada objeto e cada canto do território carrega uma história. Dita ensina pela palavra viva, pelos causos e pela memória dos antigos.', icon: 'BookOpen', color: 'from-amber-500 to-orange-600' },
      { title: 'Mãos na Terra', description: 'Aprender é plantar. Dita conduz oficinas práticas de agroecologia, da semente ao alimento, onde estudantes tocam, cheiram e cuidam da terra.', icon: 'Sprout', color: 'from-emerald-500 to-green-600' },
      { title: 'Meditação de Biojoias', description: 'Trabalho manual, paciência e gratidão: a transformação de sementes e fibras em biojoias é um exercício de atenção, autoestima e geração de renda.', icon: 'Gem', color: 'from-cyan-500 to-teal-600' },
    ],
    fronts: {
      formal: {
        title: 'Espaços Formais',
        description: 'Escolas, institutos e universidades. Dita compartilha seus saberes com o ensino formal, formando professores, biólogos e estudantes.',
        spaces: ['Escolas da região', 'IF São João da Boa Vista', 'Formação de professores', 'Treinamento de biólogos'],
        icon: 'School',
      },
      nonFormal: {
        title: 'Espaços Não Formais',
        description: 'O Kintal da Dita como sala de aula aberta, onde comunidades e jovens vivem a agroecologia e a arte em contato direto com a terra.',
        spaces: ['Kintal da Dita', 'Ponto de Cultura Guardiões da Terra', 'Oficinas comunitárias', 'Turismo e acolhida de visitantes'],
        icon: 'TentTree',
      },
    },
    accessibility: {
      title: 'Acesso Livre e Comunitário',
      description: 'As oficinas no Kintal e no Ponto de Cultura são gratuitas e abertas à comunidade. Um conhecimento que se democratiza, alinhado aos ODS 4 (Educação) e 10 (Redução das Desigualdades).',
      items: ['Oficinas gratuitas', 'Aberto à comunidade', 'Acolhida de jovens e crianças', 'Respeito à diversidade'],
    },
  },

  territory: {
    title: 'Território de Fronteira',
    badge: 'Futurismo Ancestral',
    description: 'Na divisa entre São Paulo e Minas Gerais, a Cascata é uma encruzilhada de fronteiras — geográficas, históricas e culturais. Dita é a guardiã dessa passagem, a ponte entre o marco da Revolução de 1932 e o futuro climático de 2026.',
    frontier: {
      title: 'Guardiã da Fronteira',
      description: 'Início do famoso Caminho da Fé, Águas da Prata, começou na Cascata. Um bairro tradicional e de resistência, um lugar onde memória e natureza se encontram. Abriga também o Marco da Revolução Constitucionalista de 1932, simbolizando a Paz.',
      features: ['Divisa entre SP e MG', 'Marco da Revolução de 1932', 'Território de Mata Atlântica', 'Encruzilhada de culturas', 'Futurismo Ancestral', 'Meio Ambiente'],
    },
    ancestralFuture: {
      title: 'Futurismo Ancestral',
      description: 'Dita não apenas preserva o passado: ela projeta a sobrevivência do futuro. Pela agroecologia e pelos saberes tradicionais, transforma o legado ancestral em estratégia de vida diante da crise climática.',
      quote: 'O que a terra ensinou aos nossos avós é exatamente o que vai nos salvar amanhã.',
      quoteAuthor: '— Dita',
    },
    landmarks: ['Marco da Revolução de 1932', 'Mata Atlântica preservada', 'Horta e plantas medicinais', 'Kintal da Dita'],
  },

  guardioesDaTerra: {
    name: 'Guardiões da Terra',
    type: 'Ponto de Cultura',
    description: 'Ponto de Cultura dedicado à arte, educação ambiental e a formação em práticas sustentáveis. Atua há mais de 11 anos na preservação cultural e ambiental da região. Neste Ponto de Cultura certificado, Dita é a "Conselheira da Sabedoria" e mestra indicada para a transmissão de saberes tradicionais.',
    sede: 'ONG SOS Águas da Prata',
    link: 'https://www.instagram.com/earthguardians_br/',
    ong: {
      name: 'ONG SOS Águas da Prata',
      fullName: 'Serviço de Obras Sociais de Águas da Prata',
      type: 'Pontão de Cultura em Credenciamento',
      description: 'Organização de assistência social existente desde 1968, promovendo ações de cidadania, cultura e meio ambiente.',
      link: 'https://aguasdapratasos.wixstudio.com/2025',
    },
    activities: [
      'Oficinas semanais de Agroecologia',
      'Oficinas semanais de Biojoias e Artesanato',
      'Oficinas de Música e Audiovisual',
      'Formação em Saberes Tradicionais',
      'Transmissão de saberes em escolas e no Kintal',
      'Preservação e difusão de saberes ancestrais',
    ],
  },

  kintalDaDita: {
    name: 'Kintal da Dita',
    location: 'Cascata, Águas da Prata - SP',
    type: 'Espaço Educativo, Coletivo Artístico e Agroecológico',
    description: 'Sala de aula viva aberta à comunidade. Espaço de arte, memória e resistência que oferece contação de histórias, cursos, oficinas de arte, agroecologia e conhecimentos tradicionais — gratuitos e acessíveis a todos.',
    link: 'https://www.instagram.com/nanciferreira_oficial',
    historicSite: {
      name: 'Marco da Revolta de 32',
      description: 'O Kintal está situado próximo ao obelisco, Marco da Revolução Constitucionalista de 1932, fronteira histórica entre São Paulo e Minas Gerais.',
      features: [
        'Caminhada com histórias até o Obelisco',
        'Mapas e documentos da disputa SP x MG',
        'Acervo documental da época',
        'Artefatos e objetos históricos',
      ],
    },
    museum: {
      description: 'Museu artístico com obras e artesanatos feitos com matérias-primas naturais da Mata Atlântica.',
      collections: [
        'Biojoias artesanais',
        'Artesanato em materiais naturais',
        'Obras de arte local',
        'Acervo de cultura popular',
      ],
    },
    agroecology: [
      'Horta',
      'Plantas medicinais',
      'Sementes',
      'Práticas de permacultura',
    ],
    workshops: [
      'Contação de histórias',
      'Oficinas de Biojoias',
      'Artesanato sustentável',
      'Cursos de agroecologia',
      'Saberes tradicionais',
      'Formação de jovens artesãos',
    ],
  },

  culturePoints: [
    {
      name: 'Guardiões da Terra',
      type: 'Ponto de Cultura Premiado',
      relation: 'O espaço mais conectado à trajetória de Dita',
      description: 'Ponto de Cultura dedicado à arte, educação ambiental e formação em práticas sustentáveis. Atua há mais de 11 anos na preservação cultural e ambiental da região, onde Dita é a "Conselheira da Sabedoria" e mestra na transmissão de saberes tradicionais.',
      link: 'https://www.instagram.com/earthguardians_br/',
      handle: '@earthguardians_br',
      featured: true,
      icon: 'Users',
      color: 'from-emerald-500 to-green-600',
      activities: [
        'Oficinas de Agroecologia',
        'Biojoias e Artesanato',
        'Música e Audiovisual',
        'Formação em Saberes Tradicionais',
      ],
    },
    {
      name: 'SOS Águas da Prata',
      type: 'ONG de Assistência Social e Arte',
      relation: 'Conectada à Dita desde 1970',
      description: 'Serviço de Obras Sociais de Águas da Prata, existente desde 1968, que sedia o Ponto de Cultura Guardiões da Terra. Com mais de meio século de atuação, une assistência social, cidadania, cultura e meio ambiente.',
      link: 'https://aguasdapratasos.wixstudio.com/2025',
      handle: 'SOS Águas da Prata',
      since: 'Desde 1970',
      icon: 'HandHeart',
      color: 'from-cyan-500 to-sky-600',
      activities: [
        'Assistência social',
        'Ações de cidadania',
        'Cultura e meio ambiente',
      ],
    },
    {
      name: 'ONG Casa da Árvore',
      type: 'ONG Cultural Premiada',
      relation: 'Reconhecida nos Editais PNAB e PROAC',
      description: 'Instituição cultural reconhecida e premiada nos editais do PNAB (Política Nacional Aldir Blanc) e do PROAC, dedicada à valorização da cultura e da infância no território.',
      since: 'PNAB · PROAC',
      icon: 'TreePine',
      color: 'from-amber-500 to-orange-600',
      activities: [
        'Cultura e infância',
        'Formação cultural',
        'Ações premiadas',
      ],
    },
    {
      name: 'Culturando na Montanha',
      type: 'Ponto de Cultura Premiado',
      badge: 'Convidada Ilustre',
      relation: 'Dita participa como convidada ilustre de suas atividades',
      description: 'Ponto de Cultura premiado, referência na valorização da cultura, da arte e da natureza de montanha. Dita participa de suas atividades como convidada ilustre, levando biojoias, arte e agroecologia entre as serras.',
      link: 'https://www.instagram.com/culturandonamontanha/',
      handle: '@culturandonamontanha',
      icon: 'Mountain',
      color: 'from-purple-500 to-indigo-600',
      event: {
        name: 'Encontro das Montanhas',
        description: 'Dita marcou presença no Encontro das Montanhas, um dos grandes eventos do Culturando na Montanha, celebrando a cultura de montanha com arte, memória e partilha de saberes.',
        participations: [
          'Biojoias artesanais',
          'Apresentações artísticas',
          'Diálogos em rodas de conversa',
        ],
      },
    },
  ],

  regionalCulture: [
    'São José do Rio Pardo',
    'Caconde',
    'Vargem Grande do Sul',
    'São João da Boa Vista',
    'Outras manifestações da região',
  ],

  agroecology: {
    title: 'Agroecologia Aplicada',
    description: 'Nanci atua no aconselhamento e treinamento de biólogos e professores em práticas de agroecologia e arte, compartilhando décadas de conhecimento tradicional.',
    activities: [
      'Treinamento de biólogos em práticas tradicionais',
      'Treinamento de professores em agroecologia',
      'Consultoria em plantio sustentável',
      'Transmissão de saberes ancestrais',
    ],
    currentCourse: {
      name: 'Curso para Mulheres',
      institution: 'IF São João da Boa Vista',
      role: 'Aluna e Facilitadora',
    },
  },

  expertise: [
    { title: 'Erveira', description: 'Herdeira dos saberes das plantas medicinais e curas da Mata Atlântica, transmitidos pela avó curandeira.', icon: 'Leaf' },
    { title: 'Artesã de Biojoias', description: 'Criação de joias e artesanatos com matérias-primas naturais da Mata Atlântica. Ensina a técnica às novas gerações.', icon: 'Gem' },
    { title: 'Sabedoria Tradicional', description: 'Conselheira da Sabedoria. Treina biólogos, professores e artistas em saberes tradicionais diversos.', icon: 'Shovel' },
  ],

  organizations: [
    { name: 'Guardiões da Terra', role: 'Líder e Oficineira', description: 'Coletivo Ponto de Cultura ligado à ONG internacional Earth Guardians, que oferece suporte a jovens ativistas do mundo inteiro. Arte, educação ambiental e formação há 11+ anos.', link: 'https://www.instagram.com/earthguardians_br/', icon: 'Globe', color: 'from-emerald-600/30 to-green-700/30' },
    { name: 'ONG SOS Águas da Prata', role: 'Pontão de Cultura', description: 'Serviço de Obras Sociais que sedia o Ponto de Cultura Guardiões da Terra.', link: 'https://aguasdapratasos.wixstudio.com/2025', icon: 'Building', color: 'from-cyan-600/30 to-blue-700/30' },
    { name: 'Kintal da Dita', role: 'Guardiã e Artesã', description: 'Coletivo artístico e agroecológico aberto à comunidade. Contação de histórias, oficinas de arte, cursos de agroecologia e saberes tradicionais.', icon: 'Leaf', color: 'from-amber-600/30 to-orange-700/30' },
    { name: 'Associação Sociocultural da Estação da Cascata', role: 'Co-fundadora', description: 'Coofundado com Malala, renomada diretora, para o desenvolvimento humano e cultural da Cascata.', icon: 'Users', color: 'from-rose-600/30 to-red-700/30' },
    { name: 'Bhumisparsha School', role: 'Parceira', description: 'Escola de música, audiovisual e arte que provê estrutura técnica para shows e eventos do SOS e Guardiões da Terra.', link: 'https://www.bhumisparshaschool.org/', icon: 'Music', color: 'from-purple-600/30 to-indigo-700/30' },
    { name: 'Earth Guardians', role: 'Parceira Internacional', description: 'ONG internacional que oferece suporte a jovens ativistas do mundo inteiro.', link: 'https://www.earthguardians.org/', icon: 'Globe', color: 'from-teal-600/30 to-emerald-700/30' },
    { name: 'Culturando na Montanha', role: 'Parceira', description: 'Ponto de Cultura premiado em São Tomé das Letras. Intervenções artísticas, shows e oficinas em eventos culturais.', link: 'https://www.instagram.com/culturandonamontanha/', icon: 'Mountain', color: 'from-teal-600/30 to-cyan-700/30' },
    { name: 'Baque Mulher', role: 'Figura Ilustre', description: 'Maracatu interestadual celebrando a força das mulheres negras.', link: 'https://www.instagram.com/baquemulhersjbv/', icon: 'Heart', color: 'from-pink-600/30 to-rose-700/30' },
    { name: 'IF São João da Boa Vista', role: 'Aluna e Facilitadora', description: 'Curso para mulheres em agroecologia e práticas sustentáveis.', link: 'https://www.sbv.ifsp.edu.br/', icon: 'GraduationCap', color: 'from-green-600/30 to-emerald-700/30' },
    { name: 'Conselho do Idoso', role: 'Conselheira', description: 'Defesa dos direitos da população idosa em Águas da Prata.', icon: 'Users', color: 'from-blue-600/30 to-sky-700/30' },
    { name: 'Movimento Antinuclear', role: 'Ativista', description: 'Luta ambiental contra exploração nuclear na região.', link: 'https://www.instagram.com/terraviva_aguarara/', icon: 'Shield', color: 'from-red-600/30 to-orange-700/30' },
  ],

  projects: [
    { title: 'Guardiões da Terra', category: 'Pontão de Cultura', description: 'Ponto de Cultura em credenciamento sediado na ONG SOS Águas da Prata. Educação ambiental, arte e formação de jovens.', impact: 'Mais de 11 anos de atuação cultural e ambiental.' },
    { title: 'Kintal da Dita', category: 'Coletivo Cultural', description: 'Espaço artístico, agroecológico e museu tradicional no Marco da Revolta de 32.', impact: 'Preservação histórica e cultural da região.' },
    { title: 'Oficinas de Biojoias', category: 'Artesanato', description: 'Formação em criação de joias com sementes, fibras e materiais naturais da Mata Atlântica.', impact: 'Geração de renda e valorização de recursos locais.' },
    { title: 'Prata Ativa', category: 'Documentário', description: 'Co-direção do documentário sobre água e mineração no Planalto Alcalino (2024).', impact: 'Conscientização sobre recursos hídricos.' },
    { title: 'Virada Climática', category: 'Evento', description: 'Organização do evento anual de conscientização ambiental e cultural.', impact: 'Mobilização regional desde 2024.' },
  ],

  timeline: [
    { year: '1951', title: 'Nascimento', description: 'Nasce em Cascata, comunidade rural de Águas da Prata.', type: 'personal' },
    { year: '1970s', title: 'Jornada Hippie', description: 'Anos viajando pela Bahia, Amazônia, Peru e Sul do Brasil.', type: 'personal' },
    { year: '2013', title: 'Guardiões da Terra', description: 'Inicia liderança no Ponto de Cultura.', type: 'cultural' },
    { year: '2024', title: 'Documentário Prata Ativa', description: 'Co-direção do filme sobre água e mineração.', type: 'cultural' },
    { year: '2024', title: 'Premiação Cultural', description: 'Paulo Gustavo/Aldir Blanc pelo trabalho no Ponto de Cultura.', type: 'award' },
    { year: '2025', title: 'Curso IF', description: 'Aluna e facilitadora no curso para mulheres do IF São João da Boa Vista.', type: 'education' },
    { year: '2025', title: 'Marcha das Mulheres Negras', description: 'Participação como liderança anciã.', type: 'political' },
  ],

  ods: [
    { number: 4, description: 'Educação de qualidade - oficinas e transmissão de saberes', color: '#C5192D' },
    { number: 5, description: 'Igualdade de gênero - curso para mulheres IF e Marcha', color: '#FF3A21' },
    { number: 8, description: 'Trabalho decente - biojoias e artesanato', color: '#A21942' },
    { number: 10, description: 'Redução das desigualdades - oficinas gratuitas e acessíveis', color: '#DD1367' },
    { number: 11, description: 'Comunidades sustentáveis - Kintal da Dita', color: '#FD9D24' },
    { number: 13, description: 'Ação climática - Futurismo Ancestral e agroecologia', color: '#3F7E44' },
    { number: 15, description: 'Vida terrestre - preservação Mata Atlântica', color: '#56C02B' },
  ],

  leadership: {
    title: 'Conselheira da Sabedoria',
    highlights: [
      { title: 'Conselheira da Sabedoria', subtitle: 'Ponto de Cultura Guardiões da Terra', description: 'Título concedido pelo Ponto de Cultura premiado que reconhece Dita como mestra de mestres, aquela que forma biólogos, professores e artistas.', year: 'Atual', type: 'cultural', icon: 'Crown', color: 'from-amber-500 to-yellow-600' },
      { title: 'Marcha das Mulheres Negras 2025', subtitle: 'Liderança Anciã', description: 'Representando mulheres negras do interior paulista em Brasília, provando representação comunitária e ancestralidade.', year: '2025', type: 'march', icon: 'Users', color: 'from-purple-500 to-pink-600' },
      { title: 'Reconhecimento Comunitário', subtitle: 'Liderança Local', description: 'Sua atuação é reconhecida por lideranças locais e representações da comunidade da Cascata e de Águas da Prata.', year: 'Atual', type: 'community', icon: 'HeartHandshake', color: 'from-rose-500 to-red-600' },
      { title: 'Formadora em Agroecologia', subtitle: 'Mestra de Mestres', description: 'Treinamento de biólogos e professores em práticas sustentáveis e saberes tradicionais.', year: 'Atual', type: 'education', icon: 'GraduationCap', color: 'from-emerald-500 to-green-600' },
      { title: 'Mestra Indicada', subtitle: 'Institucional', description: 'Nomeada e reconhecida por um Ponto de Cultura certificado como transmissora de saberes tradicionais.', year: 'Atual', type: 'political', icon: 'School', color: 'from-sky-500 to-blue-600' },
      { title: 'Kintal da Dita', subtitle: 'Guardiã', description: 'Preservação do Marco da Revolta de 32 e museu artístico, território de memória e resistência.', year: 'Atual', type: 'cultural', icon: 'Music', color: 'from-cyan-500 to-teal-600' },
    ],
  },

  activism: ['Agroecologia', 'Pautas Feministas', 'Movimento Antinuclear', 'Recursos Hídricos', 'Direitos dos Idosos'],

  folkCulture: ['Congo', 'Folia de Reis', 'Dança de São Gonçalo', 'Maracatu', 'Tradições Afro-brasileiras'],

  events: [
    { name: 'Virada Climática 2024/2025', icon: 'Calendar' },
    { name: 'Marcha das Mulheres Negras 2025', icon: 'Users' },
    { name: 'Curso IF São João da Boa Vista', icon: 'GraduationCap' },
    { name: 'Oficinas de Biojoias', icon: 'Gem' },
    { name: 'Festivais Regionais', icon: 'Music' },
  ],
  tourism: {
    title: 'Prata Expedições',
    subtitle: 'Guia Local',
    description: 'Guia turística com conhecimento histórico, social e ambiental da região.',
    link: 'https://prataexpedicoes.com.br/',
    linkLabel: 'Conhecer roteiros',
  },
}

export const galleryImages = Array.from({ length: 80 }, (_, i) => ({
  src: getImagePath(`/dita (${i + 10}).webp`),
  alt: `Dita foto ${i + 10}`,
}))

export function getImagePath(path: string): string {
  const base = import.meta.env.BASE_URL
  if (path.startsWith(base)) {
    return path
  }
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`
}
