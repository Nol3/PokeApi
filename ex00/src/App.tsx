import React, { useState, useEffect } from 'react';
import { Pokemon } from './types/pokemon';
import { PokemonCard } from './components/PokemonCard';
import { PokemonDetail } from './components/PokemonDetail';
import { SearchBar } from './components/SearchBar';
import { Loader2 } from 'lucide-react';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            return response.json();
          })
        );
        
        setPokemon(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokédex</h1>
          <div className="flex justify-center">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              onClick={() => setSelectedPokemon(p)}
            />
          ))}
        </div>

        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;