const mockMatchFields = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 1,
  awayTeamGoals: 1,
  inProgress: true,
  homeTeam: {
    teamName: 'mockHomeTeam'
  },
  awayTeam: {
    teamName: 'mockAwayTeam'
  }
};
const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam } = mockMatchFields;

const validMatchBodyResponse = { ...mockMatchFields };

const validPatchMatchBodyResponse = {
  homeTeamGoals: 2,
  awayTeamGoals: 3,
}

export default {
  mockMatchFields,
  validMatchBodyResponse,
  validPatchMatchBodyResponse,
}