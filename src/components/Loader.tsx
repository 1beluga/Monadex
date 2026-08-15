interface LoaderProps {
  done: number;
  total: number;
}

export default function Loader({ done, total }: LoaderProps) {
  return (
    <div className="loader-overlay">
      <div className="pokeball" />
      <div className="loader-text">
        Loading MonaDex… {done} / {total}
      </div>
    </div>
  );
}
