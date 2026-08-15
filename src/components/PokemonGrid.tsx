import PokemonCard from './PokemonCard';
import type { Pokemon } from '../types';

interface PokemonGridProps {
  pokemon: Pokemon[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function PokemonGrid({ pokemon, selectedId, onSelect }: PokemonGridProps) {
  return (
    <section className="grid-panel">
      <div className="grid-header">
        <span id="resultCount">
          {pokemon.length} Pokémon
        </span>
      </div>
      <div className="pokemon-grid">
        {pokemon.length === 0 ? (
          <div className="no-results">No Pokémon match your search.</div>
        ) : (
          pokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} selected={p.id === selectedId} onSelect={onSelect} />
          ))
        )}
      </div>
    </section>
  );
}
