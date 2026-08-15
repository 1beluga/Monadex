import { useMemo, useRef } from 'react';
import { artUrl, cryUrl, STAT_LABELS, typeColor } from '../constants';
import { useFlavorText } from '../hooks/useFlavorText';
import type { Pokemon } from '../types';

interface DetailPanelProps {
  pokemon: Pokemon | null;
}

const STAT_SCALE_MAX = 200;

export default function DetailPanel({ pokemon }: DetailPanelProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { text: flavorText } = useFlavorText(pokemon?.id ?? null);

  const primaryColor = useMemo(
    () => (pokemon ? typeColor(pokemon.types[0].type.name) : '#4fd8eb'),
    [pokemon]
  );

  const playCry = () => {
    if (!pokemon) return;
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = cryUrl(pokemon.id);
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(() => {
    });
  };

  return (
    <section className="detail-panel">
      <div className="device-head">
        <div className="lens" style={{ '--c': primaryColor } as React.CSSProperties} />
        <div className="led-row">
          <span className="led y" />
          <span className="led g" />
        </div>
        <div className="id-tag">{pokemon ? `No. ${String(pokemon.id).padStart(3, '0')}` : '—'}</div>
      </div>

      <div className="screen" style={{ '--c': primaryColor } as React.CSSProperties}>
        {!pokemon ? (
          <div className="screen-empty">Select a Pokémon</div>
        ) : (
          <>
            <div className="scanline" />

            <div className="art-wrap">
              <img src={artUrl(pokemon.id)} alt={pokemon.name} />
            </div>

            <div className="name-row">
              <div className="p-name">{pokemon.name}</div>
              <div className="p-num">#{String(pokemon.id).padStart(3, '0')}</div>
            </div>

            <div className="type-badges">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="type-badge"
                  style={{ '--tc': typeColor(t.type.name) } as React.CSSProperties}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="flavor">{flavorText}</div>

            <div className="meta-row">
              <div className="meta-box">
                <div className="v">{(pokemon.height / 10).toFixed(1)} m</div>
                <div className="l">Height</div>
              </div>
              <div className="meta-box">
                <div className="v">{(pokemon.weight / 10).toFixed(1)} kg</div>
                <div className="l">Weight</div>
              </div>
              <div className="meta-box">
                <div className="v">{pokemon.base_experience ?? '—'}</div>
                <div className="l">Base XP</div>
              </div>
            </div>

            <button className="cry-btn" style={{ '--c': primaryColor } as React.CSSProperties} onClick={playCry}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play cry
            </button>

            <div className="stats">
              <h4>Base stats</h4>
              {pokemon.stats.map((s) => {
                const pct = Math.min(100, (s.base_stat / STAT_SCALE_MAX) * 100);
                return (
                  <div className="stat-row" key={s.stat.name}>
                    <div className="lbl">{STAT_LABELS[s.stat.name] ?? s.stat.name}</div>
                    <div className="stat-track">
                      <div
                        className="stat-fill"
                        style={{ '--c': primaryColor, width: `${pct}%` } as React.CSSProperties}
                      />
                    </div>
                    <div className="val">{s.base_stat}</div>
                  </div>
                );
              })}
            </div>

            <div className="abilities">
              {pokemon.abilities.map((a) => (
                <div className="ability" key={a.ability.name}>
                  {a.ability.name.replace('-', ' ')}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
