import { useEffect, useRef, useState } from 'react';
import { cleanFlavorText, fetchSpecies } from '../api';

const NO_DESCRIPTION = 'No description available.';


export function useFlavorText(id: number | null): { text: string; loading: boolean } {
  const cache = useRef<Map<number, string>>(new Map());
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === null) {
      setText('');
      return;
    }

    const cached = cache.current.get(id);
    if (cached !== undefined) {
      setText(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setText('Reading data…');

    fetchSpecies(id).then((species) => {
      if (cancelled) return;
      const entry = species?.flavor_text_entries.find((e) => e.language.name === 'en');
      const resolved = entry ? cleanFlavorText(entry.flavor_text) : NO_DESCRIPTION;
      cache.current.set(id, resolved);
      setText(resolved);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { text, loading };
}
