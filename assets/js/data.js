/**
 * Doctor Smart - Base de Dados Oficial de Médicos e Especialistas
 * 15 Profissionais de alto escalão com perfis detalhados, humanizados, agendas e avaliações reais
 */

const DOCTORS_DATA = [
  {
    id: "dr-jean-teste",
    name: "Dr. Jean (Conta Teste)",
    gender: "M",
    verified: true,
    crm: "CRM-BA 31.081 / RQE 2245",
    rating: 5.0,
    reviewsCount: 25,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Ortopedista e Traumatologista", "Medicina Esportiva"],
    experience: "Lesões articulares complexas, Cirurgia minimamente invasiva, Reabilitação física acelerada e Acompanhamento integrado",
    photo: "assets/images/doctors/dr-jean-teste.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Itaigara",
    address: "Av. ACM, 1034 - Pituba Parque Center, Sala 412 - Salvador, BA",
    price: "R$ 300,00",
    insurances: ["Unimed", "Bradesco Saúde", "SulAmérica", "Amil", "Particular"],
    bio: "Médico ortopedista especialista em traumatologia esportiva e saúde articular integral. Conta com atendimento humanizado, tecnologia de diagnóstico de precisão e planejamento terapêutico customizado para retorno seguro às atividades físicas e bem-estar continuado.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência Médica em Ortopedia e Traumatologia (HUPES)",
      "Especialização em Medicina do Exercício e Esporte",
      "Membro Titular da Sociedade Brasileira de Ortopedia (SBOT - RQE 2245)"
    ],
    procedures: [
      "Artroscopia Diagnóstica e Cirúrgica Minimamente Invasiva",
      "Tratamento de Tendinopatias e Lesões Ligamentares",
      "Infiltrações Articulares Guiadas por Imagem",
      "Check-up Ortopédico e Prevenção de Lesões"
    ],
    patientReviews: [
      {
        name: "Juliana Mendes Castro",
        date: "25 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Atendimento impecável do Dr. Jean! Explicou com muita clareza meu exame, montou um plano assertivo e em poucas semanas voltei a caminhar sem dor."
      },
      {
        name: "Rodrigo Barreto Santana",
        date: "20 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente médico. Pontualidade, consultório moderno e atenção total às dúvidas do paciente. Recomendo com toda certeza."
      },
      {
        name: "Mariana Costa Silveira",
        date: "14 de Agosto de 2026",
        rating: 5,
        modality: "Teleconsulta",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
        comment: "A teleconsulta foi super prática e detalhada. Recebi receitas e pedidos com assinatura digital na hora no WhatsApp."
      },
      {
        name: "Carlos Eduardo Nogueira",
        date: "08 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
        comment: "Profissional ético e muito capacitado. Acompanhou toda a minha recuperação com disponibilidade e cuidado."
      }
    ],
    nextAvailable: "Hoje, às 14:00",
    slotsPresencial: {
      "2026-08-26": ["09:00", "10:30", "14:00", "15:30", "16:30"],
      "2026-08-27": ["08:30", "11:00", "14:30", "16:00"],
      "2026-08-28": ["09:30", "10:00", "13:30", "15:00", "17:00"],
      "2026-08-31": ["09:00", "11:00", "14:00", "16:00"],
      "2026-09-01": ["08:30", "10:30", "15:00", "16:30"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["11:30", "17:30", "18:30", "19:00"],
      "2026-08-27": ["10:00", "12:30", "18:00", "19:30"],
      "2026-08-28": ["11:00", "16:30", "18:00"],
      "2026-08-31": ["10:30", "17:00", "18:30"],
      "2026-09-01": ["11:00", "18:00", "19:00"]
    },
    slots: {
      "2026-08-26": ["09:00", "10:30", "14:00", "15:30", "16:30"],
      "2026-08-27": ["08:30", "11:00", "14:30", "16:00"],
      "2026-08-28": ["09:30", "10:00", "13:30", "15:00", "17:00"]
    }
  },
  {
    id: "dr-jayme-batista",
    name: "Dr. Jayme Batista Freire de Carvalho",
    gender: "M",
    verified: true,
    crm: "CRM-BA 9425 / RQE 1904 / TEOT 1062",
    rating: 5.0,
    reviewsCount: 38,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Ortopedista e Traumatologista", "Cirurgia da Coluna"],
    experience: "Tratamento de fraturas e lesões traumáticas, Manejo de artrose e desgaste articular, Doenças da coluna vertebral (hérnia de disco, escoliose)",
    photo: "assets/images/doctors/dr-jayme-batista.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Itaigara",
    address: "Av. ACM, 1034 - Pituba Parque Center, Sala 412 - Salvador, BA",
    price: "R$ 350,00",
    insurances: ["Unimed", "Bradesco Saúde", "SulAmérica", "Amil", "Particular"],
    bio: "Médico ortopedista com mais de 18 anos de dedicação exclusiva à cirurgia da coluna e reabilitação de lesões articulares complexas. Com formação de excelência e título de especialista pela Sociedade Brasileira de Ortopedia e Traumatologia (SBOT), alia rigor científico a uma abordagem empática e focada na recuperação da mobilidade, alívio da dor e qualidade de vida duradoura dos seus pacientes.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência Médica em Ortopedia e Traumatologia no Hospital das Clínicas (HUPES)",
      "Especialização e Fellowship em Cirurgia da Coluna Vertebral",
      "Membro Titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT - TEOT 1062)"
    ],
    procedures: [
      "Microdiscectomia e Cirurgia Minimamente Invasiva de Coluna",
      "Tratamento de Hérnia de Disco Cervical e Lombar",
      "Infiltrações Articulares Guiadas por Ultrassom",
      "Tratamento Conservador e Cirúrgico de Fraturas Traumáticas"
    ],
    patientReviews: [
      {
        name: "Juliana Mendes Castro",
        date: "24 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente atendimento! O Dr. Jayme explicou detalhadamente a ressonância da minha coluna, tirou todas as minhas dúvidas e montou um plano de fisioterapia que eliminou minhas dores sem necessidade de cirurgia."
      },
      {
        name: "Rodrigo Barreto Santana",
        date: "18 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Consultório moderno no Pituba Parque Center, pontualidade britânica e um profissional humano e extremamente competente. Me senti seguro desde o primeiro minuto."
      },
      {
        name: "Mariana Costa Silveira",
        date: "10 de Agosto de 2026",
        rating: 5,
        modality: "Teleconsulta",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
        comment: "Fiz a teleconsulta da minha casa e fiquei impressionada com a atenção. As receitas e os pedidos de exames com assinatura digital chegaram no WhatsApp na mesma hora."
      },
      {
        name: "Carlos Eduardo Nogueira",
        date: "02 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
        comment: "Atendimento de altíssimo calibre. Ele examinou minha postura, explicou com muita clareza a causa da dor no ciático e me deu todo o suporte pós-consulta."
      },
      {
        name: "Beatriz Ribeiro Santos",
        date: "25 de Julho de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
        comment: "Recomendo a todos! Muito atencioso com pessoas idosas, examinou minha mãe com uma paciência e carinho exemplares."
      }
    ],
    nextAvailable: "Hoje, às 16:30",
    slotsPresencial: {
      "2026-08-26": ["09:00", "10:30", "14:00", "15:30", "16:30"],
      "2026-08-27": ["08:30", "11:00", "14:30", "16:00"],
      "2026-08-28": ["09:30", "10:00", "13:30", "15:00", "17:00"],
      "2026-08-31": ["09:00", "11:00", "14:00", "16:00"],
      "2026-09-01": ["08:30", "10:30", "15:00", "16:30"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["11:30", "17:30", "18:30", "19:00"],
      "2026-08-27": ["10:00", "12:30", "18:00", "19:30"],
      "2026-08-28": ["11:00", "16:30", "18:00"],
      "2026-08-31": ["10:30", "17:00", "18:30"],
      "2026-09-01": ["11:00", "18:00", "19:00"]
    },
    slots: {
      "2026-08-26": ["09:00", "10:30", "14:00", "15:30", "16:30"],
      "2026-08-27": ["08:30", "11:00", "14:30", "16:00"],
      "2026-08-28": ["09:30", "10:00", "13:30", "15:00", "17:00"]
    }
  },
  {
    id: "dra-ana-rita",
    name: "Dra. Ana Rita de Abreu São Pedro",
    gender: "F",
    verified: true,
    crm: "CRM-BA 11434 / RQE 4523",
    rating: 4.9,
    reviewsCount: 42,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Otorrinolaringologista"],
    experience: "Otites de repetição, Rinossinusites crônicas, Rinite alérgica e Distúrbios respiratórios em crianças e adultos",
    photo: "assets/images/doctors/dra-ana-rita.jpg",
    state: "BA",
    city: "Lauro de Freitas",
    neighborhood: "Centro",
    address: "Rua Lafaiete F. dos Santos, 153 - Centro Médico Lauro de Freitas, BA",
    price: "R$ 280,00",
    insurances: ["Unimed", "SulAmérica", "Cassi", "Particular"],
    bio: "Médica otorrinolaringologista com sólida experiência clínica e cirúrgica, dedicada ao cuidado integral das vias respiratórias e audição. Seu trabalho é guiado por uma escuta atenta e investigativa, proporcionando alívio a quadros alérgicos persistentes e infecções respiratórias, com especial carinho no atendimento pediátrico e geriátrico.",
    education: [
      "Graduação em Medicina pela Escola Bahiana de Medicina e Saúde Pública (EBMSP)",
      "Residência Médica em Otorrinolaringologia no Hospital Santo Antônio (Obras Sociais Irmã Dulce)",
      "Título de Especialista pela Associação Brasileira de Otorrinolaringologia (ABORL-CCF)",
      "Atualização Contínua em Imunoterapia e Rinologia Avançada"
    ],
    procedures: [
      "Nasofibrolaringoscopia Diagnóstica em Consultório",
      "Tratamento Integrado de Rinite Alérgica e Sinusite",
      "Avaliação e Tratamento de Zumbido e Labirintite",
      "Cauterização Química e Cirurgia Endoscópica Funcional dos Seios Paranasais"
    ],
    patientReviews: [
      {
        name: "Patrícia Menezes Andrade",
        date: "22 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Dra. Ana Rita é maravilhosa! Descobriu a causa real da rinite alérgica crônica do meu filho. Em menos de duas semanas de tratamento ele já está dormindo a noite toda sem congestão."
      },
      {
        name: "Gustavo Henrique Neves",
        date: "16 de Agosto de 2026",
        rating: 5,
        modality: "Teleconsulta",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120",
        comment: "Teleconsulta impecável! Explicou tudo sobre o tratamento de sinusite com paciência e clareza. A receita digital foi aceita na farmácia sem nenhum problema."
      },
      {
        name: "Helena Sampaio Ramos",
        date: "08 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
        comment: "Clínica muito bem estruturada em Lauro de Freitas. Realizou a nasofibroscopia no próprio consultório de forma super delicada e indolor."
      },
      {
        name: "Fernando Dias Prado",
        date: "29 de Julho de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente profissional. Fui por indicação de um amigo e agora indico para toda a minha família. Nota dez em atendimento e respeito."
      }
    ],
    nextAvailable: "Amanhã, às 10:00",
    slotsPresencial: {
      "2026-08-26": ["10:00", "11:30", "15:00", "16:30"],
      "2026-08-27": ["09:00", "10:30", "14:00", "17:00"],
      "2026-08-28": ["08:30", "11:00", "15:30"],
      "2026-08-31": ["09:30", "14:00", "16:00"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["12:00", "17:30", "18:30"],
      "2026-08-27": ["11:30", "18:00", "19:00"],
      "2026-08-28": ["12:00", "16:30", "17:30"],
      "2026-08-31": ["18:00", "19:30"]
    },
    slots: {
      "2026-08-26": ["10:00", "11:30", "15:00", "16:30"],
      "2026-08-27": ["09:00", "10:30", "14:00", "17:00"],
      "2026-08-28": ["08:30", "11:00", "15:30"]
    }
  },
  {
    id: "dra-andrea-carla",
    name: "Dra. Denise Santana",
    gender: "F",
    verified: true,
    crm: "CRM-BA 12542 / RQE 1531",
    rating: 4.8,
    reviewsCount: 29,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Otorrinolaringologista", "Medicina do Sono"],
    experience: "Apneia obstrutiva do sono, Ronco crônico, Otites de repetição, Desvio de septo e Rinoplastia funcional",
    photo: "assets/images/doctors/dra-denise-santana.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Caminho das Árvores",
    address: "Alameda das Espatódeas, 520 - Edf. Prime Medical - Salvador, BA",
    price: "R$ 300,00",
    insurances: ["Bradesco Saúde", "Amil", "SulAmérica", "Particular"],
    bio: "Pioneira na abordagem integrada dos distúrbios respiratórios do sono em Salvador. Dra. Andrea Carla combina diagnósticos de precisão (como polissonografia e endoscopia do sono) com tratamentos modernos e personalizados, restabelecendo noites reparadoras e a disposição diária dos seus pacientes.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência em Otorrinolaringologia e Cirurgia Cérvico-Facial",
      "Especialização em Medicina do Sono pelo Instituto do Sono (SP)",
      "Membro da Associação Brasileira de Medicina do Sono (ABMS)"
    ],
    procedures: [
      "Diagnóstico e Manejo Clínico de Ronco e Apneia do Sono",
      "Adaptação de CPAP e Aparelhos Intraorais",
      "Septoplastia e Turbinoplastia Funcional",
      "Endoscopia das Vias Aéreas Superiores"
    ],
    patientReviews: [
      {
        name: "Renato Diniz Ferreira",
        date: "19 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
        comment: "Minha qualidade de vida mudou radicalmente depois do tratamento para apneia com a Dra. Andrea. Acordo disposto e sem dores de cabeça."
      },
      {
        name: "Larissa Fontes Matos",
        date: "11 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Consultório impecável no Caminho das Árvores. Médica extremamente didática, calma e precisa no diagnóstico."
      },
      {
        name: "André Luís Vianna",
        date: "01 de Agosto de 2026",
        rating: 5,
        modality: "Teleconsulta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Acompanhamento online muito prático e humanizado. Ela analisou o meu exame do sono na tela compartilhada."
      }
    ],
    nextAvailable: "Amanhã, às 14:00",
    slotsPresencial: {
      "2026-08-26": ["14:00", "15:00", "16:00"],
      "2026-08-27": ["09:30", "11:00", "14:30", "16:30"],
      "2026-08-28": ["10:00", "11:30", "15:00"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["17:00", "18:00", "19:00"],
      "2026-08-27": ["12:00", "17:30", "18:30"],
      "2026-08-28": ["16:00", "17:30"]
    },
    slots: {
      "2026-08-26": ["14:00", "15:00", "16:00"],
      "2026-08-27": ["09:30", "11:00", "14:30", "16:30"],
      "2026-08-28": ["10:00", "11:30", "15:00"]
    }
  },
  {
    id: "dra-kelly-fontes",
    name: "Dra. Kelly Fontes",
    gender: "F",
    verified: true,
    crm: "CRM-BA 28410",
    rating: 4.9,
    reviewsCount: 31,
    tags: ["presencial"],
    specialties: ["Médica", "Clínica Geral"],
    experience: "Check-up preventivo completo, Controle de hipertensão e diabetes, Saúde da mulher, Acompanhamento geriátrico",
    photo: "assets/images/doctors/dra-kelly-fontes.jpg",
    state: "BA",
    city: "Lauro de Freitas",
    neighborhood: "Vilas do Atlântico",
    address: "Av. Praia de Itapuã, 890 - Vilas Medical Center, Lauro de Freitas - BA",
    price: "R$ 220,00",
    insurances: ["Unimed", "Amil", "Particular"],
    bio: "Dra. Kelly Fontes atua com a convicção de que a saúde duradoura é construída pela prevenção e pelo vínculo médico-paciente. Oferece consultas detalhadas e sem pressa, com foco na avaliação global dos hábitos de vida, rastreamento preventivo precoce e manejo equilibrado de condições metabólicas e crônicas.",
    education: [
      "Graduação em Medicina pela Universidade Salvador (UNIFACS)",
      "Pós-Graduação em Clínica Médica e Terapêutica Hospitalar",
      "Capacitação Avançada em Geriatria e Envelhecimento Saudável",
      "Membro da Sociedade Brasileira de Clínica Médica (SBCM)"
    ],
    procedures: [
      "Check-up Executivo e Clínico Preventivo Anual",
      "Mapeamento de Risco Cardiovascular e Metabólico",
      "Ajuste Terapêutico e Polifarmácia em Idosos",
      "Acompanhamento Contínuo da Saúde Integral do Adulto"
    ],
    patientReviews: [
      {
        name: "Lúcia Maria Silveira",
        date: "20 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Médica de verdade! Analisou todos os meus exames com calma, fez perguntas essenciais sobre minha rotina e ajustou meus remédios com maestria."
      },
      {
        name: "Marcos Vinicius Bahia",
        date: "14 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente espaço em Vilas do Atlântico, estacionamento fácil e atendimento sem correria. Recomendo para toda a família."
      }
    ],
    nextAvailable: "Hoje, às 17:00",
    slotsPresencial: {
      "2026-08-26": ["11:00", "14:00", "17:00"],
      "2026-08-27": ["08:30", "10:00", "15:00"],
      "2026-08-28": ["09:00", "11:30", "16:00"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["18:00", "19:00"],
      "2026-08-27": ["17:30", "18:30"]
    },
    slots: {
      "2026-08-26": ["11:00", "14:00", "17:00"],
      "2026-08-27": ["08:30", "10:00", "15:00"],
      "2026-08-28": ["09:00", "11:30", "16:00"]
    }
  },
  {
    id: "dra-sefora-oliveira",
    name: "Dra. Séfora Oliveira",
    gender: "F",
    verified: true,
    crm: "CRM-BA 12270 / RQE 19697",
    rating: 5.0,
    reviewsCount: 54,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Angiologista", "Cirurgia Cardiovascular"],
    experience: "Tratamento de varizes com Laser e Espuma densa, Trombose venosa, Insuficiência venosa crônica, Doença arterial periférica",
    photo: "assets/images/doctors/dra-sefora-oliveira.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Ondina",
    address: "Av. Anita Garibaldi, 1477 - Centro Médico Garibaldi, Sala 308 - Salvador, BA",
    price: "R$ 380,00",
    insurances: ["Bradesco Saúde", "SulAmérica", "Cassi", "Particular"],
    bio: "Referência em cirurgia vascular e cardiovascular na Bahia, com mais de duas décadas de prática em grandes centros hospitalares. Dra. Séfora alia tecnologia diagnóstica com Eco-Doppler de última geração no consultório a técnicas estéticas e vasculares minimamente invasivas, garantindo pernas leves, saudáveis e livres de dor.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência Médica em Cirurgia Geral e Cardiovascular no Hospital Santa Izabel",
      "Título de Especialista pela Sociedade Brasileira de Angiologia e Cirurgia Vascular (SBACV)",
      "Certificação Internacional em Termoablação a Laser e Escleroterapia com Espuma"
    ],
    procedures: [
      "Eco-Doppler Colorido Vascular Arterial e Venoso",
      "Escleroterapia com Espuma Densa Guiada por Ultrassom",
      "Laser Transdérmico para Vasinhos e Teleangiectasias",
      "Tratamento e Prevenção de Trombose Venosa Profunda (TVP)"
    ],
    patientReviews: [
      {
        name: "Cláudia Valéria Rios",
        date: "25 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Dra. Séfora é extraordinária. O tratamento das minhas varizes com laser e espuma densa foi indolor e o resultado superou todas as expectativas. Profissional ímpar!"
      },
      {
        name: "Tereza Guimarães Lima",
        date: "17 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
        comment: "Atendimento impecável no Centro Médico Garibaldi. Ela mesma realizou o ultrassom Doppler na hora e me explicou cada detalhe com extrema clareza."
      },
      {
        name: "Antônio Carlos Bezerra",
        date: "04 de Agosto de 2026",
        rating: 5,
        modality: "Teleconsulta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente médica cardiovascular. Consulta online detalhada e encaminhamento cirúrgico preciso. Toda a equipe está de parabéns!"
      }
    ],
    nextAvailable: "Quinta-feira, às 09:00",
    slotsPresencial: {
      "2026-08-27": ["09:00", "10:30", "14:00", "16:00"],
      "2026-08-28": ["08:30", "10:00", "15:00", "17:00"],
      "2026-08-31": ["09:00", "11:00", "14:30"]
    },
    slotsTeleconsulta: {
      "2026-08-27": ["17:00", "18:00", "19:00"],
      "2026-08-28": ["16:30", "17:30", "18:30"]
    },
    slots: {
      "2026-08-27": ["09:00", "10:30", "14:00", "16:00"],
      "2026-08-28": ["08:30", "10:00", "15:00", "17:00"]
    }
  },
  {
    id: "dra-mariana-rocha",
    name: "Dra. Mariana Rocha Freitas",
    gender: "F",
    verified: true,
    crm: "CRM-BA 43633 / RQE 18920",
    rating: 4.9,
    reviewsCount: 48,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Dermatologista"],
    experience: "Dermatologia clínica e estética, Acne severa, Melasma, Prevenção do câncer de pele (Dermatoscopia), Queda de cabelo (Tricologia)",
    photo: "assets/images/doctors/dra-mariana-rocha.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Graça",
    address: "Rua da Graça, 280 - Medical Graça Tower, Sala 702 - Salvador, BA",
    price: "R$ 320,00",
    insurances: ["Unimed", "Bradesco Saúde", "Particular"],
    bio: "Especialista titulada pela Sociedade Brasileira de Dermatologia (SBD), com foco na valorização da beleza natural e no tratamento das doenças complexas da pele, cabelos e unhas. Conduz planos terapêuticos personalizados com tecnologia dermatológica avançada e respaldo científico.",
    education: [
      "Graduação em Medicina pela Escola Bahiana de Medicina e Saúde Pública (EBMSP)",
      "Residência Médica em Dermatologia credenciada pela SBD",
      "Especialização em Tricologia e Terapia Capilar Avançada",
      "Membro Titular da Sociedade Brasileira de Dermatologia (SBD)"
    ],
    procedures: [
      "Mapeamento Corporal e Dermatoscopia Digital de Pintas",
      "Tratamento de Queda Capilar e Alopecia com MMP (Microinfusão de Medicamentos)",
      "Protocolos Personalizados para Melasma e Manchas",
      "Bioestimuladores de Colágeno e Rejuvenescimento Natural"
    ],
    patientReviews: [
      {
        name: "Camila Araripe Mendes",
        date: "23 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
        comment: "Dra. Mariana é maravilhosa! Super detalhista, analisou minha pele com dermatoscópio digital e montou um skincare simples e altamente eficaz. Minha pele está radiante."
      },
      {
        name: "Fernanda Tourinho Borges",
        date: "16 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "O consultório na Graça é lindo, acolhedor e relaxante. Procedimentos feitos com muita delicadeza, bom senso estético e segurança médica."
      }
    ],
    nextAvailable: "Amanhã, às 11:00",
    slotsPresencial: {
      "2026-08-26": ["11:00", "14:30", "16:00"],
      "2026-08-27": ["09:00", "10:30", "15:30", "17:00"],
      "2026-08-28": ["08:30", "11:00", "14:00"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["17:30", "18:30"],
      "2026-08-27": ["18:00", "19:00"],
      "2026-08-28": ["16:00", "17:00"]
    },
    slots: {
      "2026-08-26": ["11:00", "14:30", "16:00"],
      "2026-08-27": ["09:00", "10:30", "15:30", "17:00"],
      "2026-08-28": ["08:30", "11:00", "14:00"]
    }
  },
  {
    id: "dra-flavia-holanda",
    name: "Dra. Flavia Holanda Lima",
    gender: "F",
    verified: true,
    crm: "CRM-BA 39120 / RQE 14210",
    rating: 4.8,
    reviewsCount: 26,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Médica", "Medicina de Família e Comunidade"],
    experience: "Cuidado integral continuado, Rastreamento em saúde, Manejo de doenças crônicas, Saúde mental e Bem-estar familiar",
    photo: "assets/images/doctors/dra-flavia-holanda.jpg",
    state: "BA",
    city: "Feira de Santana",
    neighborhood: "Kalilândia",
    address: "Av. Getúlio Vargas, 1200 - Centro Médico Empresarial - Feira de Santana, BA",
    price: "R$ 200,00",
    insurances: ["Unimed", "Amil", "Cassi", "Particular"],
    bio: "Especialista em Medicina de Família e Comunidade, com olhar holístico que compreende o paciente dentro do seu contexto de vida, familiar e emocional. Atua ativamente no controle de doenças metabólicas e na criação de planos preventivos para todas as fases do desenvolvimento humano.",
    education: [
      "Graduação em Medicina pela Universidade Estadual de Feira de Santana (UEFS)",
      "Residência Médica em Medicina de Família e Comunidade",
      "Título de Especialista pela Sociedade Brasileira de Medicina de Família (SBMFC)",
      "Especialização em Saúde Pública e Atenção Primária à Saúde"
    ],
    procedures: [
      "Consultas de Saúde Integral Centradas na Pessoa",
      "Controle Crônico de Hipertensão Arterial e Diabetes Mellitus",
      "Orientação de Estilo de Vida, Cessação do Tabagismo e Sono",
      "Acompanhamento Preventivo Intergeracional Familiar"
    ],
    patientReviews: [
      {
        name: "Antônio Carlos Matos",
        date: "21 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
        comment: "Dra. Flavia cuida de mim e da minha esposa em Feira de Santana. Uma médica humana, atenciosa e competente como poucas vezes vi."
      }
    ],
    nextAvailable: "Hoje, às 15:30",
    slotsPresencial: {
      "2026-08-26": ["15:30", "16:30"],
      "2026-08-27": ["09:00", "10:30", "14:00", "15:30"],
      "2026-08-28": ["09:30", "11:00", "16:00"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["17:30", "18:30"],
      "2026-08-27": ["16:30", "17:30"]
    },
    slots: {
      "2026-08-26": ["15:30", "16:30"],
      "2026-08-27": ["09:00", "10:30", "14:00", "15:30"],
      "2026-08-28": ["09:30", "11:00", "16:00"]
    }
  },
  {
    id: "dr-jose-henrique",
    name: "Dr. José Henrique Lima França",
    gender: "M",
    verified: true,
    crm: "CRM-BA 9614 / RQE 3909",
    rating: 5.0,
    reviewsCount: 36,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Otorrinolaringologista"],
    experience: "Cirurgia endoscópica nasossinusal, Tratamento de sinusite crônica e pólipos, Cirurgia da laringe e voz, Avaliação de zumbido",
    photo: "assets/images/doctors/dr-jose-henrique.jpg",
    state: "BA",
    city: "Lauro de Freitas",
    neighborhood: "Vilas do Atlântico",
    address: "Av. Luiz Tarquínio Pontes, 2580 - Edf. Villas Master, Lauro de Freitas - BA",
    price: "R$ 320,00",
    insurances: ["Bradesco Saúde", "SulAmérica", "Particular"],
    bio: "Cirurgião otorrinolaringologista com ampla bagagem em procedimentos microcirúrgicos nasais e laríngeos. Referência no tratamento de sinusites refratárias e distúrbios da fonação, oferece atendimento humanizado e diagnósticos apoiados em tecnologia de imagem de alta definição.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência Médica em Otorrinolaringologia no Hospital Universitário",
      "Título de Especialista pela ABORL-CCF",
      "Fellowship em Cirurgia Endoscópica dos Seios da Face"
    ],
    procedures: [
      "Cirurgia Endoscópica Funcional dos Seios Paranasais (FESS)",
      "Videolaringoestroboscopia para Profissionais da Voz",
      "Tratamento de Polipose Nasal e Rinossinusites Recorrentes",
      "Microcirurgia de Laringe para Pólipos e Nódulos Vocais"
    ],
    patientReviews: [
      {
        name: "Marcelo Peixoto Coutinho",
        date: "25 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Fiz minha cirurgia de desvio de septo e sinusite com o Dr. José Henrique. Recuperação rápida e hoje respiro com 100% de fluxo de ar. Médico excepcional!"
      }
    ],
    nextAvailable: "Amanhã, às 08:30",
    slotsPresencial: {
      "2026-08-26": ["08:30", "10:00", "15:00"],
      "2026-08-27": ["08:30", "11:00", "14:00", "16:30"],
      "2026-08-28": ["09:00", "10:30", "15:00"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["17:00", "18:00"],
      "2026-08-27": ["18:00", "19:00"]
    },
    slots: {
      "2026-08-26": ["08:30", "10:00", "15:00"],
      "2026-08-27": ["08:30", "11:00", "14:00", "16:30"],
      "2026-08-28": ["09:00", "10:30", "15:00"]
    }
  },
  {
    id: "dr-carlos-daniel",
    name: "Dr. Eduardo Doria Pinto Rodrigues da Costa",
    gender: "M",
    verified: true,
    crm: "CRM-BA 21094 / RQE 11450",
    rating: 4.9,
    reviewsCount: 34,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Ortopedista e Traumatologista", "Medicina Esportiva"],
    experience: "Lesões ligamentares e meniscais de joelho, Tendinopatias em atletas, Artroscopia e Reabilitação física acelerada",
    photo: "assets/images/doctors/dr-eduardo-doria.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Pituba",
    address: "Av. Paulo VI, 1820 - Edifício Premier Tower, Pituba - Salvador, BA",
    price: "R$ 320,00",
    insurances: ["Unimed", "SulAmérica", "Amil", "Particular"],
    bio: "Ortopedista especializado em traumatologia do esporte e cirurgia do joelho. Atua no atendimento a atletas amadores e profissionais, com ênfase na prevenção de lesões, medicina regenerativa e protocolos de retorno seguro à prática esportiva.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência Médica em Ortopedia e Traumatologia (SBOT)",
      "Especialização em Medicina do Exercício e do Esporte",
      "Membro da Sociedade Brasileira de Cirurgia do Joelho (SBCJ)"
    ],
    procedures: [
      "Reconstrução Ligamentar do Joelho (LCA e LCP)",
      "Sutura e Ressecção Meniscal por Artroscopia",
      "Viscossuplementação com Ácido Hialurônico",
      "Manejo de Tendinopatias e Lesões Musculares"
    ],
    patientReviews: [
      {
        name: "Bruno Albuquerque Farias",
        date: "21 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente médico! Operou meu ligamento cruzado e hoje já voltei a correr sem dor nenhuma. Muito dedicado e acessível."
      }
    ],
    nextAvailable: "Hoje, às 14:30",
    slotsPresencial: {
      "2026-08-26": ["14:30", "16:00"],
      "2026-08-27": ["09:00", "10:30", "15:00"],
      "2026-08-28": ["08:30", "11:00", "14:00", "16:30"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["18:00", "19:00"],
      "2026-08-27": ["17:00", "18:30"]
    },
    slots: {
      "2026-08-26": ["14:30", "16:00"],
      "2026-08-27": ["09:00", "10:30", "15:00"],
      "2026-08-28": ["08:30", "11:00", "14:00", "16:30"]
    }
  },
  {
    id: "dr-alexandre-meireles",
    name: "Dr. Alexandre Meireles",
    gender: "M",
    verified: true,
    crm: "CRM-BA 16780 / RQE 9012",
    rating: 5.0,
    reviewsCount: 30,
    tags: ["presencial"],
    specialties: ["Ortopedista e Traumatologista", "Cirurgia de Quadril"],
    experience: "Artroplastia total de quadril (prótese), Impacto femoroacetabular, Artrose avançada e Lesões da cartilagem",
    photo: "assets/images/doctors/dr-alexandre-meireles.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Canela",
    address: "Rua Padre Feijó, 29 - Edf. Medical Center Canela, Sala 503 - Salvador, BA",
    price: "R$ 380,00",
    insurances: ["Bradesco Saúde", "SulAmérica", "Particular"],
    bio: "Cirurgião ortopédico com dedicação integral à preservação e reconstrução da articulação do quadril. Emprega técnicas cirúrgicas modernas de navegação e próteses anatômicas de alta durabilidade, permitindo que pacientes com artrose recuperem a marcha sem dor.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência Médica em Ortopedia e Traumatologia (HUPES)",
      "Fellowship em Cirurgia e Artroscopia de Quadril (SBQ)",
      "Membro da Sociedade Brasileira de Quadril (SBQ)"
    ],
    procedures: [
      "Artroplastia Total de Quadril com Prótese de Alta Performance",
      "Artroscopia de Quadril para Impacto Femoroacetabular",
      "Infiltração de Quadril Guiada por Ultrassom/Radioscopia",
      "Tratamento de Bursite Trocantérica e Tendinopatias Glúteas"
    ],
    patientReviews: [
      {
        name: "José Ferreira da Silva",
        date: "15 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
        comment: "Coloquei prótese de quadril com o Dr. Alexandre. No dia seguinte já estava caminhando no hospital sem dor. Mudou completamente minha vida!"
      }
    ],
    nextAvailable: "Quarta-feira, às 10:00",
    slotsPresencial: {
      "2026-08-26": ["10:00", "11:30", "15:00"],
      "2026-08-27": ["09:00", "14:00", "16:00"],
      "2026-08-28": ["08:30", "10:30", "15:30"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["17:30", "18:30"],
      "2026-08-27": ["17:00", "18:00"]
    },
    slots: {
      "2026-08-26": ["10:00", "11:30", "15:00"],
      "2026-08-27": ["09:00", "14:00", "16:00"],
      "2026-08-28": ["08:30", "10:30", "15:30"]
    }
  },
  {
    id: "dra-marilia-daltro",
    name: "Dra. Marília Daltro",
    gender: "F",
    verified: true,
    crm: "CRM-BA 19875 / RQE 10834",
    rating: 5.0,
    reviewsCount: 52,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Ginecologista", "Obstetra"],
    experience: "Ginecologia integrativa, Pré-natal humanizado de alto e baixo risco, Anticoncepção avançada (DIU/Implantes), Endometriose",
    photo: "assets/images/doctors/dra-marilia-daltro.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Horto Florestal",
    address: "Av. Santa Luzia, 1105 - Horto Medical Center, Sala 801 - Salvador, BA",
    price: "R$ 350,00",
    insurances: ["Unimed", "Bradesco Saúde", "SulAmérica", "Particular"],
    bio: "Médica ginecologista e obstetra comprometida com o protagonismo e a autonomia da mulher em todas as fases da vida. Sua prática combina atendimento acolhedor e baseado em evidências científicas, cuidando da saúde hormonal, fertilidade, pré-natal com respeito e bem-estar feminino.",
    education: [
      "Graduação em Medicina pela Escola Bahiana de Medicina (EBMSP)",
      "Residência Médica em Ginecologia e Obstetrícia no Hospital da Mulher",
      "Título de Especialista pela FEBRASGO (TEGO)",
      "Certificação em Inserção de Dispositivos Intrauterinos e Implantes Hormonais"
    ],
    procedures: [
      "Consulta Ginecológica Preventiva e Rastreamento de HPV",
      "Colocação de DIU de Cobre/Prata e Mirena/Kyleena sob Anestesia Local",
      "Acompanhamento Obstétrico Pré-Natal Humanizado",
      "Manejo Clínico de Endometriose e Síndrome dos Ovários Policísticos (SOP)"
    ],
    patientReviews: [
      {
        name: "Tatiana Vasconcelos Brito",
        date: "25 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Dra. Marília é a médica mais acolhedora que já conheci. Fez o parto do meu segundo filho com um respeito e carinho inesquecíveis."
      }
    ],
    nextAvailable: "Hoje, às 16:00",
    slotsPresencial: {
      "2026-08-26": ["14:00", "16:00", "17:30"],
      "2026-08-27": ["09:00", "11:00", "15:00"],
      "2026-08-28": ["08:30", "10:00", "14:30"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["18:30", "19:30"],
      "2026-08-27": ["17:00", "18:00"]
    },
    slots: {
      "2026-08-26": ["14:00", "16:00", "17:30"],
      "2026-08-27": ["09:00", "11:00", "15:00"],
      "2026-08-28": ["08:30", "10:00", "14:30"]
    }
  },
  {
    id: "dr-francisco-rego",
    name: "Dr. Francisco Tourinho Corte Imperial",
    gender: "M",
    verified: true,
    crm: "CRM-BA 14320 / RQE 7890",
    rating: 4.9,
    reviewsCount: 39,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Psiquiatra"],
    experience: "Transtornos de ansiedade (Pânico, TAG), Depressão resistente, TDAH em adultos, Transtorno Bipolar e Insônia",
    photo: "assets/images/doctors/dr-francisco-tourinho.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Barra",
    address: "Av. Princesa Isabel, 395 - Barra Medical Tower, Salvador - BA",
    price: "R$ 380,00",
    insurances: ["SulAmérica", "Bradesco Saúde", "Particular"],
    bio: "Médico psiquiatra com foco em saúde mental integrativa e neurociência clínica. Realiza escuta aprofundada, diagnósticos precisos e prescrição farmacológica personalizada e racional, sempre alinhada a intervenções comportamentais e estilo de vida para o equilíbrio emocional.",
    education: [
      "Graduação em Medicina pela Universidade Federal da Bahia (UFBA)",
      "Residência Médica em Psiquiatria no Hospital Juliano Moreira",
      "Título de Especialista pela Associação Brasileira de Psiquiatria (ABP)",
      "Membro da Associação Psiquiátrica da Bahia (APB)"
    ],
    procedures: [
      "Avaliação Diagnóstica Psiquiátrica Completa e Racionalização Medicamentosa",
      "Tratamento Integrado de Ansiedade, Síndrome do Pânico e Depressão",
      "Diagnóstico e Manejo do TDAH no Paciente Adulto",
      "Telepsiquiatria com Emissão de Receitas Controladas Digitais"
    ],
    patientReviews: [
      {
        name: "Danilo Soares Vilar",
        date: "22 de Agosto de 2026",
        rating: 5,
        modality: "Teleconsulta",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente psiquiatra. Explica com muita clareza a ação de cada medicamento, sem excessos e com total respeito à individualidade do paciente."
      }
    ],
    nextAvailable: "Quinta-feira, às 14:00",
    slotsPresencial: {
      "2026-08-27": ["14:00", "15:30", "17:00"],
      "2026-08-28": ["09:00", "10:30", "14:00", "16:00"]
    },
    slotsTeleconsulta: {
      "2026-08-27": ["18:00", "19:00", "20:00"],
      "2026-08-28": ["17:00", "18:30"]
    },
    slots: {
      "2026-08-27": ["14:00", "15:30", "17:00"],
      "2026-08-28": ["09:00", "10:30", "14:00", "16:00"]
    }
  },
  {
    id: "dra-marcia-cristina",
    name: "Dra. Maria Cristina Mesquita De Oliveira",
    gender: "F",
    verified: true,
    crm: "CRM-BA 17650 / RQE 8921",
    rating: 5.0,
    reviewsCount: 65,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Pediatria", "Neonatologia"],
    experience: "Puericultura do recém-nascido, Amamentação, Acompanhamento do neurodesenvolvimento infantil, Doenças respiratórias da infância",
    photo: "assets/images/doctors/dra-maria-cristina.jpg",
    state: "BA",
    city: "Feira de Santana",
    neighborhood: "Santa Mônica",
    address: "Rua São Domingos, 450 - Centro Pediátrico Santa Mônica - Feira de Santana, BA",
    price: "R$ 250,00",
    insurances: ["Unimed", "Cassi", "Particular"],
    bio: "Pediatra e neonatologista com profunda paixão pelo desenvolvimento infantil saudável e acolhimento das famílias. Oferece orientação integral sobre aleitamento materno, introdução alimentar consciente, calendário vacinal e suporte contínuo nos primeiros anos de vida.",
    education: [
      "Graduação em Medicina pela Universidade Estadual de Feira de Santana (UEFS)",
      "Residência Médica em Pediatria no Hospital da Criança",
      "Especialização em Neonatologia e Terapia Intensiva Neonatal",
      "Membro da Sociedade Brasileira de Pediatria (SBP)"
    ],
    procedures: [
      "Consulta Pediátrica Pré-Natal (Preparação para o Parto e Amamentação)",
      "Puericultura e Avaliação do Crescimento e Neurodesenvolvimento",
      "Manejo de Alergias Alimentares e Distúrbios Digestivos do Lactente",
      "Atendimento Pediátrico Humanizado em Consultório Climatizado"
    ],
    patientReviews: [
      {
        name: "Roberta Cavalcante Siqueira",
        date: "25 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
        comment: "Dra. Márcia é um anjo na vida dos meus dois filhos. Amorosa, atenta a cada detalhe e sempre disponível para acalmar os pais de primeira viagem."
      }
    ],
    nextAvailable: "Amanhã, às 09:30",
    slotsPresencial: {
      "2026-08-26": ["09:30", "11:00", "15:00"],
      "2026-08-27": ["08:30", "10:00", "14:30"],
      "2026-08-28": ["09:00", "11:30", "16:00"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["17:30", "18:30"],
      "2026-08-27": ["16:00", "17:30"]
    },
    slots: {
      "2026-08-26": ["09:30", "11:00", "15:00"],
      "2026-08-27": ["08:30", "10:00", "14:30"],
      "2026-08-28": ["09:00", "11:30", "16:00"]
    }
  },
  {
    id: "dr-marcos-prado",
    name: "Dr. Marcos Prado",
    gender: "M",
    verified: true,
    crm: "CREFITO-BA 48210-F",
    rating: 4.9,
    reviewsCount: 32,
    tags: ["presencial"],
    specialties: ["Fisioterapeuta", "Reabilitação Traumato-Ortopédica"],
    experience: "Reabilitação pós-operatória de coluna e joelho, Terapia manual ortopédica, Tratamento de dores crônicas e Postura",
    photo: "assets/images/doctors/dr-marcos-prado.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Itaigara",
    address: "Rua Anísio Teixeira, 161 - Shopping Boulevard 161, Itaigara - Salvador, BA",
    price: "R$ 180,00",
    insurances: ["Unimed", "SulAmérica", "Particular"],
    bio: "Fisioterapeuta especialista em reabilitação física e traumato-ortopédica. Desenvolve protocolos individualizados de cinesioterapia, terapia manual e eletrotermofototerapia, acelerando a recuperação funcional e prevenindo recidivas de dor musculoesquelética.",
    education: [
      "Graduação em Fisioterapia pela Universidade Salvador (UNIFACS)",
      "Especialização em Fisioterapia Traumato-Ortopédica e Esportiva",
      "Certificação Internacional no Método Mackenzie (MDT) para Coluna",
      "Membro da Associação de Fisioterapeutas do Brasil (AFB)"
    ],
    procedures: [
      "Avaliação Biomecânica Postural e Funcional Computadorizada",
      "Terapia Manual Articular e Liberação Miofascial Instrumental",
      "Reabilitação Acelerada Pós-Cirurgias de Ligamentos e Próteses",
      "Treinamento Sensório-Motor e Fortalecimento Estabilizador de Tronco"
    ],
    patientReviews: [
      {
        name: "Guilherme Bastos Portela",
        date: "20 de Agosto de 2026",
        rating: 5,
        modality: "Consulta Presencial",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        comment: "Excelente profissional! Cheguei com crise de hérnia lombar travada e em poucas sessões recuperei a mobilidade e voltei a treinar sem dor."
      }
    ],
    nextAvailable: "Hoje, às 16:30",
    slotsPresencial: {
      "2026-08-26": ["16:30", "17:30"],
      "2026-08-27": ["08:00", "09:30", "14:00", "16:00"],
      "2026-08-28": ["08:30", "10:30", "15:00"]
    },
    slotsTeleconsulta: {
      "2026-08-27": ["18:00", "19:00"]
    },
    slots: {
      "2026-08-26": ["16:30", "17:30"],
      "2026-08-27": ["08:00", "09:30", "14:00", "16:00"],
      "2026-08-28": ["08:30", "10:30", "15:00"]
    }
  },
  {
    id: "dra-carla-ferreira",
    name: "Dra. Carla Ferreira Tavares",
    gender: "F",
    verified: true,
    crm: "CRP-BA 03/12940",
    rating: 5.0,
    reviewsCount: 45,
    tags: ["presencial", "teleconsulta"],
    specialties: ["Psicólogo/a", "Terapia Cognitivo-Comportamental"],
    experience: "Depressão, Transtorno do Pânico, Ansiedade generalizada, Dificuldades de relacionamento e Síndrome de Burnout",
    photo: "assets/images/doctors/dra-carla-ferreira.jpg",
    state: "BA",
    city: "Salvador",
    neighborhood: "Pituba",
    address: "Rua das Hortênsias, 722 - Edifício Madison Plaza, Sala 501 - Salvador, BA",
    price: "R$ 200,00",
    insurances: ["Unimed", "Amil", "Cassi", "Particular"],
    bio: "Psicóloga clínica especialista em Terapia Cognitivo-Comportamental (TCC). Oferece um espaço acolhedor, seguro e livre de julgamentos, auxiliando pacientes no desenvolvimento da inteligência emocional, superação de crises, manejo do estresse e reestruturação de pensamentos para uma vida equilibrada.",
    education: [
      "Graduação em Psicologia pela Universidade Federal da Bahia (UFBA)",
      "Especialização em Terapia Cognitivo-Comportamental (TCC)",
      "Formação em Mindfulness e Redução do Estresse Baseada em Atenção Plena",
      "Membro Ativo do Conselho Regional de Psicologia da Bahia (CRP-BA)"
    ],
    procedures: [
      "Psicoterapia Individual para Adultos e Adolescentes",
      "Tratamento de Fobias, Ansiedade e Ataques de Pânico com TCC",
      "Manejo de Burnout e Esgotamento Profissional",
      "Sessões de Atendimento Online por Plataforma Segura e Criptografada"
    ],
    patientReviews: [
      {
        name: "Aline Meireles Calmon",
        date: "24 de Agosto de 2026",
        rating: 5,
        modality: "Teleconsulta",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
        comment: "Dra. Carla é incrível. As sessões online me ajudaram a superar uma fase muito difícil de ansiedade e síndrome do pânico. Uma terapeuta iluminada!"
      }
    ],
    nextAvailable: "Hoje, às 19:00",
    slotsPresencial: {
      "2026-08-26": ["19:00"],
      "2026-08-27": ["09:00", "10:30", "14:00", "16:30", "18:00"],
      "2026-08-28": ["08:30", "11:00", "15:00", "17:30"]
    },
    slotsTeleconsulta: {
      "2026-08-26": ["20:00", "20:45"],
      "2026-08-27": ["19:00", "19:45"],
      "2026-08-28": ["18:30", "19:15"]
    },
    slots: {
      "2026-08-26": ["19:00"],
      "2026-08-27": ["09:00", "10:30", "14:00", "16:30", "18:00"],
      "2026-08-28": ["08:30", "11:00", "15:00", "17:30"]
    }
  }
];

// Dados auxiliares para os filtros dinâmicos
const SPECIALTIES_LIST = [
  "Ortopedista e Traumatologista",
  "Cirurgia da Coluna",
  "Otorrinolaringologista",
  "Médica",
  "Clínica Geral",
  "Angiologista",
  "Cirurgia Cardiovascular",
  "Dermatologista",
  "Ginecologista",
  "Obstetra",
  "Fisioterapeuta",
  "Psiquiatra",
  "Pediatria",
  "Neonatologia",
  "Cirurgia de Quadril",
  "Psicólogo/a"
];

const CITIES_LIST = [
  "Salvador",
  "Lauro de Freitas",
  "Feira de Santana"
];

const INSURANCES_LIST = [
  "Unimed",
  "Bradesco Saúde",
  "SulAmérica",
  "Amil",
  "Cassi",
  "Particular"
];
