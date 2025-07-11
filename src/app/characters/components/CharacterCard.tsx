import { Character } from '../../types';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Image src={character.image} alt={character.name} width={300} height={300} className="w-full" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Origin: {character.origin.name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;