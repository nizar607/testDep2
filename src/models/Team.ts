import Player from "./Player"

interface Team {
    _id: string;
    name: string;
    logo: File | null;
    location: string;
    players: Player[];
    subtitutes: Player[];
}

export default Team;