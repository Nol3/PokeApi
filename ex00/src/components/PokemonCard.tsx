import React from 'react';
import { Pokemon } from '../types/pokemon';
import { Heart } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 relative group"
    >
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Heart className="w-6 h-6 text-red-500 hover:fill-red-500" />
      </div>
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="w-48 h-48 mx-auto"
        loading="lazy"
      />
      <h2 className="text-xl font-bold text-center mt-4 capitalize">
        {pokemon.name}
      </h2>
      <div className="flex justify-center gap-2 mt-3">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`${typeColors[type.type.name]} text-white px-3 py-1 rounded-full text-sm capitalize`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};