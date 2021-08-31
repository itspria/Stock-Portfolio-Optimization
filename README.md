# Project-3

EZ Investments

With this project we want to enable users to be able to take control of their investments and make informed financial decisions

-AUTOMATED PORTFOLIO OPTIMIZATION: A PAGE WHERE USERS CAN INPUT THEIR PREFERENCES AND BE PRESENTED WITH AN OPTIMIZED PORTFOLIO
-MANUAL PORTFOLIO OPTIMIZATION: A PAGE TO ENABLE USERS TO EXPLORE, MODIFY, AND CREATE THEIR OWN PORTFOLIO
-EXPLORE MARKET TRENDS: SERIES OF PAGES WHERE USERS CAN EXPLORE THE INDIVIDUAL STOCKS THAT THE EZ INVESTMENT PORTFOLIO OFFERS

# DATA Aquisition
We acquired all the stock information from Rapid API.

https://rapidapi.com/apidojo/api/yahoo-finance1

# DATA Cleaning
Acquired JSON data was transformed using Python and Pandas
Removed irrelevant fields
Added date field with specific format converted from epoch time
Rounded the closing stock prices to 2 decimal places
Cleaned data was saved to a file

# DATA Calculations
Various statistical functions were used to calculate Annual Volatility, Annual Return, Daily Volatility and Last 3 month Return for each of the investments
Daily returns and asset covariance was calculated and then portfolio return and volatility was computed

# Storage & Retrieval

MongoDB and PyMongo library were used to store the clean json files.

Each investment was saved as a separate collection. The stock computations were saved in respective collections.

Flask and PyMongo were used to retrieve the data from MongoDB and a local web server was created with support for different API calls 

D3 javascript library was used to get data from Flask and populate the visual elements in HTML

# Visualizations

Website site was designed using HTML, CSS, JavaScript and Bootstrap (Template from: https://startbootstrap.com/theme/sb-admin-2)

# New Library

The new library we used is 'chart.js' (https://www.chartjs.org/) -- 

# Limitations

There were only 8 investments chosen to study

Historical Data was limited to the beginning of 2020

Further mathematical improvement of model

The subscription cost of Rapid API usage

Yahoo Finance API is no longer updated





