// matchModel.ts (or wherever you've defined your types)
export interface Match {
    _id: string;
    team1: { _id: string; name: string } | null;
    team2: { _id: string; name: string } | null;
    division: string;
    time: string | null;
    nextMatchId: string | null;
    round: number; // Make sure this property is defined in your Match interface
    winner?: string | null; //{ _id: string; name: string }; // Optional winner property
  }
  