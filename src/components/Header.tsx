import favicon from '../assets/favicon.svg';

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark"><img src={favicon} alt="Logo MonaDex"/></span>
        <span className="brand-title">MonaDex</span>
        <span className="brand-sub">Kanto · 001–151</span>
      </div>
      <div className="search-wrap">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or number…"
          autoComplete="off"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}
