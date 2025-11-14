import React from 'react';
import { ArrowLeft, X, Plus, Calendar, Target } from 'lucide-react';

interface Menu {
  id: string;
  title: string;
  objective: string;
  date: string;
  type: 'maintenance' | 'weight_loss' | 'muscle_gain';
}

interface MenusListScreenProps {
  onClose: () => void;
  onBack: () => void;
  onCreateNew: () => void;
  onViewMenu: (menuId: string) => void;
  menus: Menu[];
}

const MenusListScreen: React.FC<MenusListScreenProps> = ({ 
  onClose, 
  onBack, 
  onCreateNew, 
  onViewMenu,
  menus
}) => {

  const getObjectiveIcon = (type: string) => {
    switch (type) {
      case 'weight_loss':
        return '📉';
      case 'muscle_gain':
        return '💪';
      default:
        return '⚖️';
    }
  };

  const getObjectiveColor = (type: string) => {
    switch (type) {
      case 'weight_loss':
        return 'text-red-600';
      case 'muscle_gain':
        return 'text-blue-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-primary flex items-center justify-between px-4 py-3">
        <button onClick={onBack} className="text-primary-foreground hover:text-primary-foreground/80">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-primary-foreground text-lg font-semibold">Meus Menus</h1>
        <button onClick={onClose} className="text-primary-foreground hover:text-primary-foreground/80">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Menus List */}
        <div className="space-y-4 mb-6">
          {menus.map((menu) => (
            <div 
              key={menu.id}
              onClick={() => onViewMenu(menu.id)}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center flex-1">
                  <span className="text-2xl mr-3">{getObjectiveIcon(menu.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{menu.title}</h3>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center ml-4 h-full">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar size={16} className="mr-1" />
                    {menu.date}
                  </div>
                  <div className="flex-1 flex items-center">
                    <span className="text-primary text-sm font-medium underline">
                      Ver menu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {menus.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum menu criado</h3>
            <p className="text-gray-600 mb-6">
              Crie seu primeiro menu personalizado para começar sua jornada de bem-estar
            </p>
          </div>
        )}
      </div>

      {/* Footer - Create New Button */}
      <div className="p-6 border-t border-gray-200">
        <button 
          onClick={onCreateNew}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Plus size={24} className="mr-2" />
          Criar Novo Menu
        </button>
      </div>
    </div>
  );
};

export default MenusListScreen;
