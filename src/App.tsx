import { useEffect, useMemo, useState } from 'react';
import { fetchAllPokemon } from './api';
import DetailPanel from './components/DetailPanel';
import Header from './components/Header';
import Loader from './components/Loader';
import PokemonGrid from './components/PokemonGrid';
import TypeFilters from './components/TypeFilters';
import { TOTAL_POKEMON } from './constants';
import type { Pokemon, TypeFilter } from './types';

export default function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<TypeFilter>('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchAllPokemon((done) => {
      if (!cancelled) setProgress(done);
    }).then((pokemon) => {
      if (cancelled) return;
      setAllPokemon(pokemon);
      setSelectedId(pokemon[0]?.id ?? null);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPokemon = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allPokemon.filter((p) => {
      const nameMatch = p.name.includes(term) || String(p.id).includes(term);
      const typeMatch = activeType === 'all' || p.types.some((t) => t.type.name === activeType);
      return nameMatch && typeMatch;
    });
  }, [allPokemon, search, activeType]);

  const selectedPokemon = useMemo(
    () => allPokemon.find((p) => p.id === selectedId) ?? null,
    [allPokemon, selectedId]
  );

  if (loading) {
    return <Loader done={progress} total={TOTAL_POKEMON} />;
  }

  return (
    <div className="app">
      <Header search={search} onSearchChange={setSearch} />
      <TypeFilters activeType={activeType} onSelect={setActiveType} />
      <main className="layout">
        <DetailPanel pokemon={selectedPokemon} />
        <PokemonGrid pokemon={filteredPokemon} selectedId={selectedId} onSelect={setSelectedId} />
      </main>
    </div>
  );
}
