import { TOTAL_POKEMON } from './constants';
import type { Pokemon, PokemonSpecies } from './types';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const CONCURRENCY = 12;


export async function fetchAllPokemon(
  onProgress: (done: number, total: number) => void
): Promise<Pokemon[]> {
  const ids = Array.from({ length: TOTAL_POKEMON }, (_, i) => i + 1);
  const results: (Pokemon | null)[] = new Array(ids.length).fill(null);

  let cursor = 0;
  let done = 0;

  async function worker() {
    while (cursor < ids.length) {
      const myIndex = cursor++;
      const id = ids[myIndex];
      try {
        const res = await fetch(`${POKEAPI_BASE}/pokemon/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch pokemon ${id}`);
        results[myIndex] = (await res.json()) as Pokemon;
      } catch {
        results[myIndex] = null;
      }
      done += 1;
      onProgress(done, ids.length);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  return results.filter((p): p is Pokemon => p != null).sort((a, b) => a.id - b.id);
}

export async function fetchSpecies(id: number): Promise<PokemonSpecies | null> {
  try {
    const res = await fetch(`${POKEAPI_BASE}/pokemon-species/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch species ${id}`);
    return (await res.json()) as PokemonSpecies;
  } catch {
    return null;
  }
}

export function cleanFlavorText(text: string): string {
  return text.replace(/[\n\f\r]/g, ' ').replace(/\s+/g, ' ').trim();
}
