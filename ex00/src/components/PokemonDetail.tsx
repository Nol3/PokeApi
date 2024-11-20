import React from 'react';
import { Pokemon } from '../types/pokemon';
import { X } from 'lucide-react';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-64 h-64 object-contain"
            />
          </div>
          
          <div className="flex-grow">
            <h2 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Height</p>
                <p className="font-semibold">{pokemon.height / 10}m</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="font-semibold">{pokemon.weight / 10}kg</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize"
                  >
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize text-sm">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="text-sm font-semibold">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};