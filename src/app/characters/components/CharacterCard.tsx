import { Character } from '../../types';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '🟢';
      case 'dead':
        return '🔴';
      default:
        return '⚫';
    }
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`${getStatusColor(character.status)} px-2 py-1 rounded-full text-xs font-medium text-white shadow-lg flex items-center gap-1`}>
          <div className={`w-2 h-2 rounded-full ${getStatusColor(character.status)} animate-pulse`}></div>
          {character.status}
        </div>
      </div>

      {/* Character Image */}
      <div className="relative overflow-hidden">
        <Image 
          src={character.image} 
          alt={character.name} 
          width={300} 
          height={300} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Character Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-white truncate group-hover:text-green-400 transition-colors duration-300">
          {character.name}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-sm">👾</span>
            <span className="text-sm">{character.species}</span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-sm">🌍</span>
            <span className="text-sm truncate">{character.origin.name}</span>
          </div>
        </div>

        {/* Hover reveal additional info */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">ID: {character.id}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400">Status</span>
              <span className="text-xs">{getStatusEmoji(character.status)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default CharacterCard;