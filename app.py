from flask import Flask, render_template, redirect, json, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
from bson import json_util

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/stocksDB"
mongo = PyMongo(app)
# To request from local server and avoid CORS error
CORS(app, support_credentials=True)

@app.route("/")
def index():    
    # TODO - What should be the initial data to be sent. 
    results = mongo.db.BTC_prices.find()
    data = []   
    for row in results:       
        data.append(row)                
    #return (render_template("index.html", listings=data))
    return (jsonify(data))  

# Returns all the documents from BTC_prices     
@app.route("/getBtcData")
def GetBtc():    
    results = mongo.db.BTC_prices.find()
    data = []    
    for row in results:           
        data.append(row)
    
    #only string formats can be sent
    return jsonify(database = 'BTC_prices', stocksdata = json.loads(json_util.dumps(data)))    

# Returns all the documents from AAPL_prices     
@app.route("/getAaplData")
def GetAapl():    
    results = mongo.db.AAPL_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'AAPL_prices', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from AAPL_prices     
@app.route("/getDalData")
def GetDal():    
    results = mongo.db.DAL_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'DAL_prices', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from GOLD_prices     
@app.route("/getGoldData")
def GetGold():    
    results = mongo.db.GOLD_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'GOLD_prices', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from NFLX_prices     
@app.route("/getNflxData")
def GetNflx():    
    results = mongo.db.NFLX_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'NFLX_prices', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from PFE_prices     
@app.route("/getPfeData")
def GetPfe():    
    results = mongo.db.PFE_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'PFE_prices', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from SHOP_prices     
@app.route("/getShopData")
def GetShop():    
    results = mongo.db.SHOP_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'SHOP_prices', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from TSLA_prices     
@app.route("/getTSLAData")
def GetTsla():    
    results = mongo.db.TSLA_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'TSLA_prices', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from protfolio_data
@app.route("/getPortfolioData")
def GetPortfolioData():    
    results = mongo.db.portfolio_data.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'portfolio_data', stocksdata = json.loads(json_util.dumps(data))) 

# Returns all the documents from stocks_calc_combined
@app.route("/getStocksCalc")
def getStocksCalc():    
    results = mongo.db.stocks_calc_combined.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'stocks_calc_combined', stocksdata = json.loads(json_util.dumps(data))) 

if __name__ == "__main__":
    app.run(debug=True)
