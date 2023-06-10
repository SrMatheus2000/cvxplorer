export const parseCVE = (cve: string): string => {
  const stripped = cve.replace(/[^\d]/g, '');

  if (stripped.length > 4) {
    return `CVE-${stripped.slice(0, 4)}-${stripped.slice(4, 11)}`;
  }
  return `CVE-${stripped}`;
};

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export const metricLabels = {
  AV: 'Vetor de Ataque',
  AC: 'Complexidade do Ataque',
  PR: 'Privilégios Necessários',
  UI: 'Interação do Usuário',
  S: 'Escopo',
  C: 'Impacto de Confidencialidade',
  I: 'Impacto de Integridade',
  A: 'Impacto de Disponibilidade',
  CR: 'Requisitos de Confidencialidade',
  IR: 'Requisitos de Integridade',
  AR: 'Requisitos de Disponibilidade',
  E: 'Explotabilidade',
  RL: 'Nível de Remediação',
  RC: 'Confirmação de Relatório',
} as const;

export const metricValues: { [key: string]: { [value: string]: string } } = {
  AV: { N: 'Rede', A: 'Adjacente', L: 'Local', P: 'Físico' },
  AC: { L: 'Baixo', H: 'Alto' },
  PR: { N: 'Nenhum', L: 'Baixo', H: 'Alto' },
  UI: { N: 'Nenhum', R: 'Requerido' },
  S: { U: 'Inalterado', C: 'Alterado' },
  C: { H: 'Alto', L: 'Baixo', N: 'Nenhum' },
  I: { H: 'Alto', L: 'Baixo', N: 'Nenhum' },
  A: { H: 'Alto', L: 'Baixo', N: 'Nenhum' },
  CR: { H: 'Alto', L: 'Baixo', M: 'Médio', ND: 'Não Definido' },
  IR: { H: 'Alto', L: 'Baixo', M: 'Médio', ND: 'Não Definido' },
  AR: { H: 'Alto', L: 'Baixo', M: 'Médio', ND: 'Não Definido' },
  E: {
    X: 'Não Definido',
    U: 'Não Conhecido',
    P: 'Prova de Conceito',
    F: 'Funcional',
  },
  RL: { X: 'Não Definido', O: 'Oficial', T: 'Temporário', W: 'Não Disponível' },
  RC: { X: 'Não Definido', U: 'Desconhecido', R: 'Razoável', C: 'Confirmado' },
} as const;
