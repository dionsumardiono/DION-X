
import React from 'react';
import { Category } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface CategoryGridProps {
  onSelect: (category: Category) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.values(Category).map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-left flex flex-col items-center md:items-start space-y-3"
        >
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            {CATEGORY_ICONS[cat]}
          </div>
          <span className="font-semibold text-slate-800 text-center md:text-left">{cat}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
