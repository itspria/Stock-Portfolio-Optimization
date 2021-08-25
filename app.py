from flask import Flask, render_template, redirect, json, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

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
    return jsonify(database = 'BTC_prices', stocksdata = str(data))    

# Returns all the documents from AAPL_prices     
@app.route("/getAaplData")
def GetAapl():    
    results = mongo.db.APPL_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'AAPL_prices', stocksdata = str(data)) 

# Returns all the documents from AAPL_prices     
@app.route("/getDalData")
def GetDal():    
    results = mongo.db.DAL_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'DAL_prices', stocksdata = str(data)) 

# Returns all the documents from GOLD_prices     
@app.route("/getGoldData")
def GetGold():    
    results = mongo.db.GOLD_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'GOLD_prices', stocksdata = str(data)) 

# Returns all the documents from NFLX_prices     
@app.route("/getNflxData")
def GetNflx():    
    results = mongo.db.Nflx_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'Nflx_prices', stocksdata = str(data)) 

# Returns all the documents from PFE_prices     
@app.route("/getPfeData")
def GetPfe():    
    results = mongo.db.Pfe_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'Pfe_prices', stocksdata = str(data)) 

# Returns all the documents from SHOP_prices     
@app.route("/getShopData")
def GetShop():    
    results = mongo.db.SHOP_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'SHOP_prices', stocksdata = str(data)) 

# Returns all the documents from TSLA_prices     
@app.route("/getTSLAData")
def GetTsla():    
    results = mongo.db.TSLA_prices.find()
    data = []    
    for row in results:           
        data.append(row)                   
    
    #only string formats can be sent
    return jsonify(database = 'TSLA_prices', stocksdata = str(data)) 


if __name__ == "__main__":
    app.run(debug=True)
