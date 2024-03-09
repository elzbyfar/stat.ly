import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.endpoints import playercareerstats, playercompare, playergamelog, commonplayerinfo
from nba_api.stats.static import players

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/search-players', methods=['GET'])
def search_players():
  query = request.args.get('query', type=str)
  player = players.find_players_by_full_name(query)
  return jsonify(player)

@app.route('/api/get-career', methods=['GET'])
def get_career():
  player_id = request.args.get('player_id', type=str)
  career = playercareerstats.PlayerCareerStats(player_id=player_id)
  return jsonify(career.get_dict())

@app.route('/api/compare-players', methods=['GET'])
def compare_players():
  player_list = request.args.get('player_ids', type=str)
  compare = playercompare.PlayerCompare(player_id_list=player_list.split(',')[0], vs_player_id_list=player_list.split(',')[1])
  return compare.get_dict()

@app.route('/api/get-game-log', methods=['GET'])
def get_game_log():
  player_id = request.args.get('player_id', type=str)
  season = request.args.get('season', type=str)
  season_type = request.args.get('season_type', type=str)
  game_log = playergamelog.PlayerGameLog(player_id=player_id, season=season, season_type_all_star=season_type)
  return jsonify(game_log.get_dict())

@app.route('/api/get-common-player-info', methods=['GET'])
def get_common_player_info():
  player_id = request.args.get('player_id', type=str)
  player = commonplayerinfo.CommonPlayerInfo(player_id)
  return jsonify(player)

if __name__ == '__main__':
  app.run(debug=True)