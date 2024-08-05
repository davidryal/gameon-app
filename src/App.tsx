import React, { useState } from 'react';

interface Game {
  id: number;
  sport: string;
  date: string;
  time: string;
  location: string;
  playerThreshold: number;
  players: string[];
}

interface NewGame {
  sport: string;
  date: string;
  time: string;
  location: string;
  playerThreshold: number;
}

const App = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState<NewGame>({
    sport: 'frisbee',
    date: '',
    time: '',
    location: '',
    playerThreshold: 0,
  });
  const [joiningGame, setJoiningGame] = useState<number | null>(null);
  const [playerName, setPlayerName] = useState('');

  const handleCreateGame = () => {
    const newGameId = games.length + 1;
    setGames([...games, { id: newGameId, ...newGame, players: [] }]);
    setNewGame({
      sport: 'frisbee',
      date: '',
      time: '',
      location: '',
      playerThreshold: 0,
    });
  };

  const handleJoinGame = (gameId: number) => {
    setJoiningGame(gameId);
  };

  const handleConfirmJoin = () => {
    if (joiningGame !== null) {
      const updatedGames = games.map((game) => {
        if (game.id === joiningGame) {
          return { ...game, players: [...game.players, playerName] };
        }
        return game;
      });
      setGames(updatedGames);
      setJoiningGame(null);
      setPlayerName('');
    }
  };

  const todaysGames = games.filter((game) => game.date === new Date().toISOString().split('T')[0]);
  const upcomingGames = games.filter((game) => game.date > new Date().toISOString().split('T')[0]);
  const archivedGames = games.filter((game) => game.date < new Date().toISOString().split('T')[0]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pickup Sports Games</h1>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex-1 md:mr-4">
          <h2 className="text-2xl font-bold mb-2">Create a Game</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sport">
                Sport
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="sport"
                type="text"
                value={newGame.sport}
                onChange={(e) => setNewGame({ ...newGame, sport: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                value={newGame.date}
                onChange={(e) => setNewGame({ ...newGame, date: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                type="time"
                value={newGame.time}
                onChange={(e) => setNewGame({ ...newGame, time: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                value={newGame.location}
                onChange={(e) => setNewGame({ ...newGame, location: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="playerThreshold">
                Player Threshold
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="playerThreshold"
                type="number"
                value={newGame.playerThreshold}
                onChange={(e) => setNewGame({ ...newGame, playerThreshold: parseInt(e.target.value, 10) })}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCreateGame}
            >
              Create Game
            </button>
          </form>
        </div>
        <div className="flex-1 md:ml-4">
          <h2 className="text-2xl font-bold mb-2">Games</h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Today's Games</h3>
            <ul>
              {todaysGames.map((game) => (
                <li key={game.id}>
                  <div className="flex justify-between mb-2">
                    <span>
                      {game.sport} at {game.location} on {game.date} at {game.time}
                    </span>
                    <span>
                      {game.players.length} / {game.playerThreshold} players
                    </span>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleJoinGame(game.id)}
                  >
                    Join Game
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Upcoming Games</h3>
            <ul>
              {upcomingGames.map((game) => (
                <li key={game.id}>
                  <div className="flex justify-between mb-2">
                    <span>
                      {game.sport} at {game.location} on {game.date} at {game.time}
                    </span>
                    <span>
                      {game.players.length} / {game.playerThreshold} players
                    </span>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleJoinGame(game.id)}
                  >
                    Join Game
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Archived Games</h3>
            <ul>
              {archivedGames.map((game) => (
                <li key={game.id}>
                  <div className="flex justify-between mb-2">
                    <span>
                      {game.sport} at {game.location} on {game.date} at {game.time}
                    </span>
                    <span>
                      {game.players.length} / {game.playerThreshold} players
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {joiningGame !== null && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Join Game</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="playerName">
                  Player Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="playerName"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleConfirmJoin}
              >
                Join Game
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;