import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.endpoints import playercareerstats, playercompare, playergamelog, commonplayerinfo
from nba_api.stats.static import players, teams

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/search-players', methods=['GET'])
def search_players():
    query = request.args.get('query', type=str)
    player = players.find_players_by_full_name(query)
    return jsonify(player)


@app.route('/api/get-all-players', methods=['GET'])
def get_all_players():
    all_players = players.get_players()
    return jsonify(all_players)

@app.route('/api/get-all-teams', methods=['GET'])
def get_all_teams():
    all_teams = teams.get_teams()
    return jsonify(all_teams)


@app.route('/api/get-top-players', methods=['GET'])
def get_top_players():
    # season = "2022-23"
    # n = 10
    # category = "PPG"
    params = request.args.to_dict()
    desired_season = params['season'] or "2023-24"
    category = params['category'] or "PPG"
    n = params['n'] or 10

    # Get a list of all NBA players
    nba_players = players.get_players()

    # Initialize a list to store player data
    player_data = []

    # Loop through the list of players
    for player in nba_players:
        player_name = player['full_name']
        player_id = player['id']

        # Retrieve player career statistics
        career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)

        # Get the DataFrame of player career stats
        career_stats_df = career_stats.get_data_frames()[0]

        # Filter for the desired season
        filtered_season = career_stats_df[career_stats_df['SEASON_ID'] == desired_season]

        if not filtered_season.empty:
            # Get the player's game log for the desired season
            game_log = playergamelog.PlayerGameLog(player_id=player_id, season=desired_season)
            game_log_df = game_log.get_data_frames()[0]

            # Calculate the average points per game (PPG) for this player in the season
            avg_ppg = game_log_df['PTS'].mean()

            player_data.append({
                'Player Name': player_name,
                'PPG': avg_ppg
            })

    # Create a DataFrame from the collected player data
    player_data_df = pd.DataFrame(player_data)

    # Sort the players by PPG in descending order and select the top 10
    top_10_players_df = player_data_df.sort_values(by=category, ascending=False).head(n)
    
    return top_10_players_df.to_json(orient='records')
    
    


@app.route('/api/get-career', methods=['GET'])
def get_career():
    player_id = request.args.get('player_id', type=str)
    career = playercareerstats.PlayerCareerStats(player_id=player_id)
    return jsonify(career.get_dict())


@app.route('/api/compare-players', methods=['GET'])
def compare_players():
    player_list = request.args.get('player_ids', type=str)
    compare = playercompare.PlayerCompare(player_id_list=player_list.split(',')[
                                          0], vs_player_id_list=player_list.split(',')[1])
    return compare.get_dict()


@app.route('/api/get-game-log', methods=['GET'])
def get_game_log():
    params = request.args.to_dict()
    game_log = playergamelog.PlayerGameLog(**params)
    return jsonify(game_log.get_dict())


@app.route('/api/get-common-player-info', methods=['GET'])
def get_common_player_info():
    player_id = request.args.get('player_id', type=str)
    player = commonplayerinfo.CommonPlayerInfo(player_id)
    return jsonify(player)


if __name__ == '__main__':
    app.run(debug=True)
