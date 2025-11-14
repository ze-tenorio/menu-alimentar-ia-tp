import { useState } from "react";
import TransitionScreen from "./components/TransitionScreen";
import MenuAlimentarScreen from "./components/MenuAlimentarScreen";
import MenuAlimentarForm from "./components/MenuAlimentarForm";
import MenuLoadingScreen from "./components/MenuLoadingScreen";
import GeneratedMenuScreen from "./components/GeneratedMenuScreen";
import MenusListScreen from "./components/MenusListScreen";
import ShoppingListScreen from "./components/ShoppingListScreen";
import { generateMenu, MenuPlan } from "./services/menuApi";

const App = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [showMenuAlimentar, setShowMenuAlimentar] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showMenuLoading, setShowMenuLoading] = useState(false);
  const [showGeneratedMenu, setShowGeneratedMenu] = useState(false);
  const [showMenusList, setShowMenusList] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [hasCreatedMenu, setHasCreatedMenu] = useState(false);
  const [createdMenus, setCreatedMenus] = useState<Array<{
    id: string;
    title: string;
    objective: string;
    date: string;
    type: 'maintenance' | 'weight_loss' | 'muscle_gain';
    menuData?: MenuPlan;
  }>>([]);
  const [formData, setFormData] = useState<any>(null);
  const [currentMenu, setCurrentMenu] = useState<MenuPlan | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowMenuAlimentar(true);
  };

  const handleMenuAlimentarClose = () => {
    setShowMenuAlimentar(false);
  };

  const handleMenuFormOpen = () => {
    setShowMenuAlimentar(false);
    setShowMenuForm(true);
  };

  const handleMenuFormClose = () => {
    setShowMenuForm(false);
    setShowMenuAlimentar(true);
  };

  const handleMenuFormComplete = async (payload: any) => {
    console.log('Payload recebido no App:', payload);
    setFormData(payload);
    setShowMenuForm(false);
    setShowMenuLoading(true);
    setApiError(null);
    
    try {
      // Chamar API para gerar o menu (pode levar 20-30 segundos)
      const result = await generateMenu(payload);
      
      if (result.success && result.plan) {
        console.log('Menu gerado com sucesso:', result.plan);
        setCurrentMenu(result.plan);
        // Avançar para a tela de menu gerado
        handleMenuLoadingComplete();
      } else {
        console.error('Erro ao gerar menu:', result.error);
        setApiError(result.error || 'Erro desconhecido ao gerar menu');
        // Voltar para o formulário em caso de erro
        alert('Erro ao gerar menu: ' + (result.error || 'Erro desconhecido'));
        setShowMenuLoading(false);
        setShowMenuForm(true);
      }
    } catch (error) {
      console.error('Erro ao gerar menu:', error);
      setApiError(error instanceof Error ? error.message : 'Erro desconhecido');
      alert('Erro ao gerar menu. Por favor, tente novamente.');
      setShowMenuLoading(false);
      setShowMenuForm(true);
    }
  };

  const handleMenuLoadingComplete = () => {
    setShowMenuLoading(false);
    setShowGeneratedMenu(true);
    setHasCreatedMenu(true);
    
    // Adicionar menu à lista
    const objective = formData?.nutritional_plan_goals?.primary_objective || 'manutencao';
    const newMenu = {
      id: currentMenu?.plan_id || Date.now().toString(),
      title: `Menu ${getObjectiveText(objective)}`,
      objective: getObjectiveText(objective),
      date: new Date().toLocaleDateString('pt-BR'),
      type: getObjectiveType(objective) as 'maintenance' | 'weight_loss' | 'muscle_gain',
      menuData: currentMenu || undefined
    };
    setCreatedMenus(prev => [...prev, newMenu]);
  };

  const handleMenuLoadingBack = () => {
    setShowMenuLoading(false);
    setShowMenuForm(true);
  };

  const handleGeneratedMenuClose = () => {
    setShowGeneratedMenu(false);
  };

  const handleGeneratedMenuBack = () => {
    setShowGeneratedMenu(false);
    setShowMenusList(true);
  };

  const handleViewMenus = () => {
    setShowMenuAlimentar(false);
    setShowMenusList(true);
  };

  const handleMenusListClose = () => {
    setShowMenusList(false);
  };

  const handleMenusListBack = () => {
    setShowMenusList(false);
    setShowMenuAlimentar(true);
  };

  const handleCreateNewMenu = () => {
    setShowMenusList(false);
    setShowMenuForm(true);
  };

  const handleViewMenu = (menuId: string) => {
    const menu = createdMenus.find(m => m.id === menuId);
    if (menu) {
      setFormData({ 
        nutritional_plan_goals: { 
          primary_objective: getObjectiveId(menu.type) 
        } 
      });
      setCurrentMenu(menu.menuData || null);
    }
    setShowMenusList(false);
    setShowGeneratedMenu(true);
  };

  const handleShowShoppingList = () => {
    setShowGeneratedMenu(false);
    setShowShoppingList(true);
  };

  const handleShoppingListClose = () => {
    setShowShoppingList(false);
  };

  const handleShoppingListBack = () => {
    setShowShoppingList(false);
    setShowGeneratedMenu(true);
  };

  const handleShowWorkoutPlan = () => {
    // Placeholder - não implementado no projeto isolado
    alert('Funcionalidade de plano de treino não disponível neste projeto isolado');
  };

  const getObjectiveText = (objective: string) => {
    switch (objective) {
      case 'emagrecimento':
        return 'Perda de Peso e Definição';
      case 'ganho_de_peso':
        return 'Ganho de Peso e Massa Muscular';
      case 'manutencao':
        return 'Manutenção de Peso e Saúde Geral';
      // Manter compatibilidade com valores antigos
      case 'emagrecer':
        return 'Perda de Peso e Definição';
      case 'ganhar-peso':
        return 'Ganho de Peso e Massa Muscular';
      case 'manter-peso':
        return 'Manutenção de Peso e Saúde Geral';
      default:
        return 'Manutenção de Peso e Saúde Geral';
    }
  };

  const getObjectiveType = (objective: string) => {
    switch (objective) {
      case 'emagrecimento':
        return 'weight_loss';
      case 'ganho_de_peso':
        return 'muscle_gain';
      case 'manutencao':
        return 'maintenance';
      // Manter compatibilidade com valores antigos
      case 'emagrecer':
        return 'weight_loss';
      case 'ganhar-peso':
        return 'muscle_gain';
      case 'manter-peso':
        return 'maintenance';
      default:
        return 'maintenance';
    }
  };

  const getObjectiveId = (type: string) => {
    switch (type) {
      case 'weight_loss':
        return 'emagrecer';
      case 'muscle_gain':
        return 'ganhar-peso';
      default:
        return 'manter-peso';
    }
  };

  if (showTransition) {
    return <TransitionScreen onComplete={handleTransitionComplete} title="Menu Alimentar" />;
  }

  if (showMenuAlimentar) {
    return (
      <MenuAlimentarScreen 
        onClose={handleMenuAlimentarClose} 
        onStartForm={handleMenuFormOpen} 
        onViewMenus={handleViewMenus} 
        hasCreatedMenu={hasCreatedMenu} 
        menuCount={createdMenus.length}
      />
    );
  }

  if (showMenuForm) {
    return <MenuAlimentarForm onClose={handleMenuFormClose} onComplete={handleMenuFormComplete} />;
  }

  if (showMenuLoading) {
    // MenuLoadingScreen não chama onComplete automaticamente
    // Só avançamos quando a API retornar
    return <MenuLoadingScreen onComplete={() => {}} onBack={handleMenuLoadingBack} />;
  }

  if (showGeneratedMenu) {
    const objective = formData?.nutritional_plan_goals?.primary_objective || formData?.objective || 'manutencao';
    const currentObjective = getObjectiveText(objective);
    return (
      <GeneratedMenuScreen 
        onClose={handleGeneratedMenuClose} 
        onBack={handleGeneratedMenuBack} 
        onViewMenus={handleViewMenus} 
        onShowShoppingList={handleShowShoppingList} 
        onShowWorkoutPlan={handleShowWorkoutPlan} 
        objective={currentObjective}
        menuData={currentMenu}
      />
    );
  }

  if (showMenusList) {
    return (
      <MenusListScreen 
        onClose={handleMenusListClose} 
        onBack={handleMenusListBack} 
        onCreateNew={handleCreateNewMenu} 
        onViewMenu={handleViewMenu} 
        menus={createdMenus} 
      />
    );
  }

  if (showShoppingList) {
    return (
      <ShoppingListScreen 
        onClose={handleShoppingListClose} 
        onBack={handleShoppingListBack} 
      />
    );
  }

  return null;
};

export default App;

