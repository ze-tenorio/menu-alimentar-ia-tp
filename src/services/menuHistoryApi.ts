/**
 * Serviço de API para histórico de menus
 * 
 * Este arquivo contém as funções para buscar menus anteriores do usuário
 */

import { MenuPlan } from './menuApi';

export interface MenuSummary {
  id: string;
  patient_id: string;
  title: string;
  objective: string;
  date: string;
  type: 'maintenance' | 'weight_loss' | 'muscle_gain';
  daily_energy_kcal: number;
  created_at: string;
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
 * Dados mock para testes
 */
const MOCK_MENUS: Record<string, MenuSummary[]> = {
  '12345678900': [
    {
      id: 'plan-001',
      patient_id: '12345678900',
      title: 'Menu Emagrecimento',
      objective: 'Perda de Peso e Definição',
      date: '10/11/2024',
      type: 'weight_loss',
      daily_energy_kcal: 2000,
      created_at: '2024-11-10T10:30:00Z'
    },
    {
      id: 'plan-002',
      patient_id: '12345678900',
      title: 'Menu Manutenção',
      objective: 'Manutenção de Peso e Saúde Geral',
      date: '05/11/2024',
      type: 'maintenance',
      daily_energy_kcal: 2500,
      created_at: '2024-11-05T14:20:00Z'
    }
  ],
  '98765432100': [
    {
      id: 'plan-003',
      patient_id: '98765432100',
      title: 'Menu Ganho de Massa',
      objective: 'Ganho de Peso e Massa Muscular',
      date: '12/11/2024',
      type: 'muscle_gain',
      daily_energy_kcal: 3500,
      created_at: '2024-11-12T09:15:00Z'
    }
  ]
};

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
    // TODO: Substituir por chamada real
    // const response = await fetch(`${API_URL}/menus/history?patient_id=${cpf}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': API_KEY,
    //   },
    // });
    
    // Mock: buscar menus do CPF
    const menus = MOCK_MENUS[cpf] || [];
    
    console.log(`Encontrados ${menus.length} menus para o CPF ${cpf}`);
    
    return {
      success: true,
      menus: menus,
      total: menus.length
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

