import { artUrl, typeColor } from '../constants';
import type { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
  selected: boolean;
  onSelect: (id: number) => void;
}

export default function PokemonCard({ pokemon, selected, onSelect }: PokemonCardProps) {
  const primaryType = pokemon.types[0].type.name;

  return (
    <button
      className={`card${selected ? ' selected' : ''}`}
      style={{ '--tc': typeColor(primaryType) } as React.CSSProperties}
      onClick={() => onSelect(pokemon.id)}
    >
      <div className="num">#{String(pokemon.id).padStart(3, '0')}</div>
      <img src={artUrl(pokemon.id)} alt={pokemon.name} loading="lazy" />
      <div className="cname">{pokemon.name}</div>
      <div className="ctypes">
        {pokemon.types.map((t) => (
          <span key={t.type.name} style={{ '--tc-i': typeColor(t.type.name) } as React.CSSProperties}>
            {t.type.name}
          </span>
        ))}
      </div>
    </button>
  );
}
