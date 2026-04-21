import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import { useDebounce } from './hooks/useDebounce';
import { useLocalStorage } from './hooks/useLocalStorage';
import { searchItems, type SearchResult } from './api/mockSearch';
import './App.css';

const STORAGE_KEY = 'search:last-query';
const DEBOUNCE_MS = 400;

function App() {
  const [query, setQuery, clearQuery] = useLocalStorage<string>(STORAGE_KEY, '');
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    let cancelled = false;
    setIsSearching(true);

    searchItems(debouncedQuery).then((data) => {
      if (cancelled) return;
      setResults(data);
      setIsSearching(false);
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const isTyping = query !== debouncedQuery;

  return (
    <main className="app">
      <header className="app__header">
        <h1>Search</h1>
        <p className="app__subtitle">
          Persisted in <code>localStorage</code> · debounced at {DEBOUNCE_MS}ms
        </p>
      </header>

      <div className="search">
        <input
          type="search"
          className="search__input"
          placeholder="Try 'react', 'database', 'test'…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search query"
        />
        <Button
          variant="ghost"
          size="md"
          onClick={clearQuery}
          disabled={!query}
        >
          Clear
        </Button>
        <Button variant="primary" size="md" isLoading={isSearching}>
          {isSearching ? 'Searching' : 'Search'}
        </Button>
      </div>

      <section className="results" aria-live="polite">
        {isTyping && query.trim() && (
          <p className="results__hint">Typing… (waiting to debounce)</p>
        )}

        {!isTyping && debouncedQuery.trim() && !isSearching && results.length === 0 && (
          <p className="results__hint">No matches for “{debouncedQuery}”.</p>
        )}

        {results.length > 0 && (
          <ul className="results__list">
            {results.map((r) => (
              <li key={r.id} className="results__item">
                <strong>{r.title}</strong>
                <span>{r.description}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
