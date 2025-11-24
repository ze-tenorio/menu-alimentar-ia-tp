/**
 * Serviço de API para histórico de menus
 * 
 * Este arquivo contém as funções para buscar menus anteriores do usuário
 */

import { MenuPlan } from './menuApi';

/**
 * Formato do plano retornado pela API de histórico
 */
export interface HistoricalPlan {
  plan_id: string;
  created_at: string; // ISO format
  objective: 'emagrecimento' | 'ganho_de_peso' | 'manutencao';
  current_weight: number;
  total_calories: number;
  age: number;
}

/**
 * Resposta da API de histórico
 */
export interface MenuHistoryApiResponse {
  success: boolean;
  patient_id: string;
  total_plans: number;
  plans: HistoricalPlan[];
  execution_id?: string;
  timestamp?: string;
}

/**
 * Formato usado internamente para exibir na lista
 */
export interface MenuSummary {
  id: string;
  patient_id: string;
  title: string;
  objective: string;
  date: string;
  type: 'maintenance' | 'weight_loss' | 'muscle_gain';
  daily_energy_kcal: number;
  created_at: string;
  current_weight: number;
  age: number;
}

export interface MenuHistoryResponse {
  success: boolean;
  menus: MenuSummary[];
  total: number;
  error?: string;
}

export interface MenuDetailResponse {
  success: boolean;
  plan?: MenuPlan;
  error?: string;
}

/**
 * Dados mock para testes - formato da API real
 */
const MOCK_API_RESPONSES: Record<string, MenuHistoryApiResponse> = {
  '12345678900': {
    success: true,
    patient_id: '12345678900',
    total_plans: 3,
    plans: [
          {
            plan_id: '550e8400-e29b-41d4-a716-446655440001',
            created_at: '2025-11-20T14:30:00.000000',
            objective: 'emagrecimento',
            current_weight: 85.5,
            total_calories: 1800.0,
            age: 35
          },
          {
            plan_id: '550e8400-e29b-41d4-a716-446655440002',
            created_at: '2025-11-15T09:15:00.000000',
            objective: 'manutencao',
            current_weight: 78.0,
            total_calories: 2200.0,
            age: 35
          },
          {
            plan_id: '550e8400-e29b-41d4-a716-446655440003',
            created_at: '2025-11-10T16:45:00.000000',
            objective: 'ganho_de_peso',
            current_weight: 72.0,
            total_calories: 2800.0,
            age: 34
          }
    ]
  },
  '98765432100': {
    success: true,
    patient_id: '98765432100',
    total_plans: 2,
    plans: [
          {
            plan_id: '550e8400-e29b-41d4-a716-446655440004',
            created_at: '2025-11-22T11:00:00.000000',
            objective: 'ganho_de_peso',
            current_weight: 65.0,
            total_calories: 3200.0,
            age: 28
          },
          {
            plan_id: '550e8400-e29b-41d4-a716-446655440005',
            created_at: '2025-11-18T08:30:00.000000',
            objective: 'emagrecimento',
            current_weight: 90.0,
            total_calories: 1600.0,
            age: 28
          }
    ]
  }
};

/**
 * Converte um plano da API para o formato de exibição
 */
function convertPlanToSummary(plan: HistoricalPlan, patientId: string): MenuSummary {
  const objectiveMap = {
    'emagrecimento': {
      title: 'Menu Emagrecimento',
      text: 'Perda de Peso e Definição',
      type: 'weight_loss' as const
    },
    'ganho_de_peso': {
      title: 'Menu Ganho de Massa',
      text: 'Ganho de Peso e Massa Muscular',
      type: 'muscle_gain' as const
    },
    'manutencao': {
      title: 'Menu Manutenção',
      text: 'Manutenção de Peso e Saúde Geral',
      type: 'maintenance' as const
    }
  };

  const objectiveInfo = objectiveMap[plan.objective];
  
  // Formata a data para exibição
  const date = new Date(plan.created_at);
  const formattedDate = date.toLocaleDateString('pt-BR');

  return {
    id: plan.plan_id,
    patient_id: patientId,
    title: objectiveInfo.title,
    objective: objectiveInfo.text,
    date: formattedDate,
    type: objectiveInfo.type,
    daily_energy_kcal: plan.total_calories,
    created_at: plan.created_at,
    current_weight: plan.current_weight,
    age: plan.age
  };
}

/**
 * Busca o histórico de menus de um paciente pelo CPF
 * 
 * @param cpf - CPF do paciente (apenas números)
 * @returns Promise com lista de menus do paciente
 * 
 * TODO: Substituir por chamada real da API quando estiver pronta
 * Endpoint futuro: GET /api/menus/history?patient_id={cpf}
 */
export async function getMenuHistory(cpf: string): Promise<MenuHistoryResponse> {
  console.log('Buscando histórico de menus para CPF:', cpf);
  
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // TODO: Substituir por chamada real quando a API estiver pronta
    // const response = await fetch(`${API_URL}/menus/history?patient_id=${cpf}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': API_KEY,
    //   },
    // });
    // const apiResponse: MenuHistoryApiResponse = await response.json();
    
    // Mock: buscar menus do CPF usando o formato da API real
    let apiResponse = MOCK_API_RESPONSES[cpf];
    
    // Para testes: se não encontrar o CPF específico, retorna menus de exemplo
    if (!apiResponse) {
      console.log(`CPF ${cpf} não encontrado no mock, retornando menus de exemplo`);
      apiResponse = {
        success: true,
        patient_id: cpf,
        total_plans: 3,
        plans: [
          {
            plan_id: `${cpf}-plan-001`,
            created_at: '2025-11-20T14:30:00.000000',
            objective: 'emagrecimento',
            current_weight: 85.5,
            total_calories: 1800.0,
            age: 35
          },
          {
            plan_id: `${cpf}-plan-002`,
            created_at: '2025-11-15T09:15:00.000000',
            objective: 'manutencao',
            current_weight: 78.0,
            total_calories: 2200.0,
            age: 35
          },
          {
            plan_id: `${cpf}-plan-003`,
            created_at: '2025-11-10T16:45:00.000000',
            objective: 'ganho_de_peso',
            current_weight: 72.0,
            total_calories: 2800.0,
            age: 34
          }
        ]
      };
    }
    
    // Converte os planos da API para o formato de exibição
    const menus = apiResponse.plans.map(plan => 
      convertPlanToSummary(plan, cpf)
    );
    
    console.log(`Encontrados ${menus.length} menus para o CPF ${cpf}:`, menus);
    
    return {
      success: true,
      menus: menus,
      total: apiResponse.total_plans
    };
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return {
      success: false,
      menus: [],
      total: 0,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

/**
 * Busca os detalhes completos de um menu específico
 * 
 * @param menuId - ID do menu
 * @returns Promise com os detalhes completos do menu
 * 
 * TODO: Substituir por chamada real da API quando estiver pronta
 * Endpoint futuro: GET /api/menus/{menuId}
 */
export async function getMenuDetail(menuId: string): Promise<MenuDetailResponse> {
  console.log('Buscando detalhes do menu:', menuId);
  
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // TODO: Substituir por chamada real
    // const response = await fetch(`${API_URL}/menus/${menuId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': API_KEY,
    //   },
    // });
    
    // Mock: retornar dados de exemplo
    // Na implementação real, isso virá da API
    console.log('Retornando detalhes mock do menu');
    
    return {
      success: false,
      error: 'Função de detalhes ainda não implementada. Use o menu recém-criado.'
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do menu:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

/**
 * Exemplo de integração futura:
 * 
 * ```typescript
 * // Buscar histórico
 * const history = await getMenuHistory('12345678900');
 * if (history.success) {
 *   console.log('Menus:', history.menus);
 * }
 * 
 * // Buscar detalhes de um menu
 * const details = await getMenuDetail('plan-001');
 * if (details.success) {
 *   console.log('Plano:', details.plan);
 * }
 * ```
 */

