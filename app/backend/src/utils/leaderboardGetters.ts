import ITeam from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

type MatchesPerTeam = {
  id: number,
  matchesPerTeam: IMatch[]
};

type Goals = {
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
};

type Result = 'win' | 'loss' | 'draw';

type Results = {
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
};

function isTeamInHome(teamId: number, homeTeamId: number): boolean {
  return teamId === homeTeamId;
}

function getTeamGoals(teamId: number, matchesPerTeam: IMatch[]): Goals {
  const goals = {
    goalsFavor: 0,
    goalsOwn: 0,
  };
  let { goalsFavor, goalsOwn } = goals;
  matchesPerTeam.forEach(({
    homeTeamId, homeTeamGoals, awayTeamGoals,
  }) => {
    if (isTeamInHome(teamId, homeTeamId)) {
      goalsFavor += homeTeamGoals;
      goalsOwn += awayTeamGoals;
    } else {
      goalsFavor += awayTeamGoals;
      goalsOwn += homeTeamGoals;
    }
  });
  const goalsBalance = goalsFavor - goalsOwn;
  return { ...goals, goalsBalance };
}

function getMatchResult(
  mainTeamGoals: number,
  opponentTeamGoals: number,
): Result {
  if (mainTeamGoals > opponentTeamGoals) return 'win';
  if (mainTeamGoals < opponentTeamGoals) return 'loss';
  return 'draw';
}

function getTeamResults(teamId: number, matchesPerTeam: IMatch[]): Results {
  const results = { totalVictories: 0, totalDraws: 0, totalLosses: 0 };
  matchesPerTeam.forEach(({
    homeTeamId, homeTeamGoals, awayTeamGoals,
  }) => {
    const result = isTeamInHome(teamId, homeTeamId)
      ? getMatchResult(homeTeamGoals, awayTeamGoals)
      : getMatchResult(awayTeamGoals, homeTeamGoals);
    switch (result) {
      case 'win': results.totalVictories += 1; break;
      case 'draw': results.totalDraws += 1; break;
      default: results.totalLosses += 1; break;
    }
  });
  return { ...results };
}

function getMatchPoints(result: Result): number {
  switch (result) {
    case 'win': return 3;
    case 'draw': return 1;
    default: return 0;
  }
}

function getTeamPoints(teamId: number, matchesPerTeam: IMatch[]) {
  let points = 0;
  matchesPerTeam.forEach(({
    homeTeamId, homeTeamGoals, awayTeamGoals,
  }) => {
    const result = isTeamInHome(teamId, homeTeamId)
      ? getMatchResult(homeTeamGoals, awayTeamGoals)
      : getMatchResult(awayTeamGoals, homeTeamGoals);
    points += getMatchPoints(result);
  });
  return points;
}

function getTeamMatches(id: number, allMatches: IMatch[]): MatchesPerTeam {
  const matchesPerTeam = allMatches.filter((match) => {
    if (match.homeTeamId === id || match.awayTeamId === id) return true;
    return false;
  });
  return { id, matchesPerTeam };
}

export default function getLeaderboard(teams: ITeam[], matches: IMatch[]): ILeaderboard[] {
  const teamMatches = teams.map((team) => getTeamMatches(team.id, matches));
  return teamMatches.map(({ id, matchesPerTeam }, index) => {
    const name = teams[index].teamName;
    const totalPoints = getTeamPoints(id, matchesPerTeam);
    const { goalsFavor, goalsOwn, goalsBalance } = getTeamGoals(id, matchesPerTeam);
    const { totalVictories, totalDraws, totalLosses } = getTeamResults(id, matchesPerTeam);
    const totalGames = matchesPerTeam.length;
    return ({ name,
      totalPoints,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      totalVictories,
      totalDraws,
      totalLosses,
      totalGames,
    });
  });
}
