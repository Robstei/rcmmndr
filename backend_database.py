import numpy
import pandas as pd
import sklearn
import os

print(os.getcwd()) 

data = [1,2,3,4]
data = pd.DataFrame(data)
print(data)

"""

#Read Data
filename = "database_songs.csv"

data = pd.read_csv("database_songs.csv")

print(data)

#Save Sample Data
data.to_csv('C:/Python/Bachelor/sample_data.csv', index = False)

"""