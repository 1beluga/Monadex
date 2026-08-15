import { TYPE_COLORS } from '../constants';
import type { TypeFilter } from '../types';

interface TypeFiltersProps {
  activeType: TypeFilter;
  onSelect: (type: TypeFilter) => void;
}

export default function TypeFilters({ activeType, onSelect }: TypeFiltersProps) {
  const types = Object.keys(TYPE_COLORS);

  return (
    <div className="type-filters">
      <div
        className={`chip${activeType === 'all' ? ' active' : ''}`}
        style={{ '--c': '#ffffff' } as React.CSSProperties}
        onClick={() => onSelect('all')}
      >
        All
      </div>
      {types.map((type) => (
        <div
          key={type}
          className={`chip${activeType === type ? ' active' : ''}`}
          style={{ '--c': TYPE_COLORS[type] } as React.CSSProperties}
          onClick={() => onSelect(type)}
        >
          {type}
        </div>
      ))}
    </div>
  );
}
