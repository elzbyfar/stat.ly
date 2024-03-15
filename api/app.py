import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.endpoints import playercareerstats, playercompare, playergamelog, commonplayerinfo, leaguedashplayerstats, leagueleaders
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
    return all_players
    # return jsonify(all_players)


@app.route('/api/get-all-teams', methods=['GET'])
def get_all_teams():
    all_teams = teams.get_teams()
    return jsonify(all_teams)


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


@app.route('/api/get-league-leaders', methods=['GET'])
def get_league_leaders():
    params = request.args.to_dict()
    data = leagueleaders.LeagueLeaders(**params)
    return jsonify(data.get_dict())


if __name__ == '__main__':
    app.run(debug=True)