import ITeam from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { Side } from '../types/Side';

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

function getEfficiency(totalMatches: number, totalPoints: number): string {
  const efficiency = ((totalPoints / (totalMatches * 3)) * 100).toFixed(2);
  return efficiency;
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
  return { goalsFavor, goalsOwn, goalsBalance };
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
    // SUG: podia tentar criar uma função para esse switch que nem no getMatchPoints, mas não sei como
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

function getTeamMatches(id: number, allMatches: IMatch[], teamSide?: Side): MatchesPerTeam {
  const matchesPerTeam = allMatches.filter((match) => {
    if (!teamSide) {
      if (match.inProgress === false) return true;
      return false;
    }
    const teamSideId = teamSide === 'home' ? match.homeTeamId : match.awayTeamId;
    if (teamSideId === id && match.inProgress === false) return true;
    return false;
  });
  return { id, matchesPerTeam };
}

function getTeamData(id: number, matchesPerTeam: IMatch[]) {
  // const name = teams[index].teamName;
  const totalPoints = getTeamPoints(id, matchesPerTeam);
  const goals = getTeamGoals(id, matchesPerTeam);
  const results = getTeamResults(id, matchesPerTeam);
  const totalGames = matchesPerTeam.length;
  const efficiency = getEfficiency(totalGames, totalPoints);
  return ({
    // name,
    totalPoints,
    totalGames,
    ...results,
    ...goals,
    efficiency,
  });
}

function sortTeamsData(teamsData: ILeaderboard[]) {
  return teamsData.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
}

export default function getLeaderboard(
  teams: ITeam[],
  matches: IMatch[],
  teamSide?: Side,
): ILeaderboard[] {
  const teamMatches = teams.map((team) => getTeamMatches(team.id, matches, teamSide));
  const teamsData: ILeaderboard[] = teamMatches.map(({ id, matchesPerTeam }, index) => {
    const name = teams[index].teamName;
    const teamData = getTeamData(id, matchesPerTeam);
    return { name, ...teamData };
  });
  const sortedTeamsData = sortTeamsData(teamsData);
  return sortedTeamsData;
}
