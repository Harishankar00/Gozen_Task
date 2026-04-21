export interface SearchResult {
  id: number;
  title: string;
  description: string;
}

const DATASET: SearchResult[] = [
  { id: 1, title: 'React', description: 'A JavaScript library for building user interfaces' },
  { id: 2, title: 'TypeScript', description: 'JavaScript with syntax for types' },
  { id: 3, title: 'Vite', description: 'Next generation frontend tooling' },
  { id: 4, title: 'Node.js', description: 'JavaScript runtime built on Chrome V8 engine' },
  { id: 5, title: 'Express', description: 'Fast, unopinionated, minimalist web framework for Node' },
  { id: 6, title: 'Redux', description: 'A predictable state container for JavaScript apps' },
  { id: 7, title: 'Next.js', description: 'The React framework for production' },
  { id: 8, title: 'TailwindCSS', description: 'A utility-first CSS framework' },
  { id: 9, title: 'GraphQL', description: 'A query language for your API' },
  { id: 10, title: 'Docker', description: 'Build, ship, and run distributed applications' },
  { id: 11, title: 'Kubernetes', description: 'Production-grade container orchestration' },
  { id: 12, title: 'PostgreSQL', description: 'The worlds most advanced open source database' },
  { id: 13, title: 'MongoDB', description: 'The most popular NoSQL document database' },
  { id: 14, title: 'Jest', description: 'Delightful JavaScript testing framework' },
  { id: 15, title: 'Vitest', description: 'A blazing fast unit test framework powered by Vite' },
];

export function searchItems(query: string): Promise<SearchResult[]> {
  return new Promise((resolve) => {
    const delay = 300 + Math.random() * 300;
    setTimeout(() => {
      const q = query.trim().toLowerCase();
      if (!q) return resolve([]);
      resolve(
        DATASET.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q),
        ),
      );
    }, delay);
  });
}
