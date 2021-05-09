from flask import Flask, request
from flask_cors import CORS

import pickle
import numpy as np 
import pandas as pd 

import lightgbm as lgb
from sklearn.decomposition import PCA
from lightgbm import LGBMRegressor
from sklearn.metrics import r2_score
import scipy.cluster.hierarchy as shc

from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier, XGBRegressor
from sklearn.metrics import accuracy_score
from sklearn.datasets import make_regression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import RepeatedKFold
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score
from sklearn.cluster import AgglomerativeClustering
from sklearn.model_selection import train_test_split

from sklearn.inspection import permutation_importance

from sklearn.preprocessing import StandardScaler


app = Flask(__name__)
CORS(app)


on_cluster = pickle.load(open("./folders/Cluster_Models/OnInvClusters.pickle.dat", "rb"))
off_cluster = pickle.load(open("./folders/Cluster_Models/OffInvClusters.pickle.dat", "rb"))

on_model = lgb.Booster(model_file = './folders/Final_Prediction_Models/OnInvoice_model.txt')
off_model = lgb.Booster(model_file = './folders/Final_Prediction_Models/OffInvoice_model.txt')

def data_norm(df):
  norm_data = df[['sfdc_tier', 'poc_image', 'segment', 'Brand', 'Pack_Type', 'returnability']]
  nval = []
  
  for _, rows in norm_data.iterrows():
    nval.append(np.linalg.norm(np.array(rows)))
  df['norm'] = nval
  return df


def var_encode(df):

  filepath = './folders/'

  pkl_file_poc = open(filepath + 'Encs/poc_image_enc.pkl', 'rb')
  le_poc = pickle.load(pkl_file_poc) 
  pkl_file_poc.close()

  pkl_file_seg = open(filepath + 'Encs/seg_enc.pkl', 'rb')
  le_seg = pickle.load(pkl_file_seg) 
  pkl_file_seg.close()
  
  pkl_file_bran = open(filepath + 'Encs/brand_enc.pkl', 'rb')
  le_bran = pickle.load(pkl_file_bran) 
  pkl_file_bran.close()
  
  pkl_file_pt = open(filepath + 'Encs/pack_enc.pkl', 'rb')
  le_pt = pickle.load(pkl_file_pt) 
  pkl_file_pt.close()

  pkl_file_subseg = open(filepath + 'Encs/subseg_enc.pkl', 'rb')
  le_subseg = pickle.load(pkl_file_subseg) 
  pkl_file_subseg.close()

  pkl_file_provi = open(filepath + 'Encs/provi.pkl', 'rb')
  le_province = pickle.load(pkl_file_provi) 
  pkl_file_provi.close()

  # print(le_subseg.classes_)
  df['poc_image'] = le_poc.transform(df['poc_image'])
  df['segment'] = le_seg.transform(df['segment'])
  df['Brand'] = le_bran.transform(df['Brand'])
  df['Pack_Type'] = le_pt.transform(df['Pack_Type'])
  df['sub_segment'] = le_subseg.transform(df['sub_segment'])
  df['province'] = le_province.transform(df['province'])
  return df





def feature_cr(df, flag_off = 1):
  df['price'] = round(df['GTO_2019'] /df['Volume_2019 Product'], 2)
  df['Volume_2019 Product'] = np.log(df['Volume_2019 Product'])

  df = var_encode(df)
  df = data_norm(df)

  if flag_off:
    df['GTO_Tax'] = df['GTO_2019'] - df['Tax']

    df['GTO_Tax'] = np.log(df['GTO_Tax'])
    return df[['sfdc_tier',	'poc_image', 'segment',
               'sub_segment', 'Brand', 'Pack_Type',
               'GTO_Tax', 'Volume_2019 Product',
               'province', 'price',	'returnability', 'norm']]
  else:  
    df['GTO_2019'] = np.log(df['GTO_2019'])
    return df[['sfdc_tier',	'poc_image', 'segment',
               'sub_segment', 'Brand', 'Pack_Type',
               'GTO_2019', 'Volume_2019 Product',
               'province', 'price',	'returnability', 'norm']]






@app.route('/')
def index():
    return 'Hello!'





@app.route('/results',methods=['GET','POST'])
def results():
    _JSON = request.get_json()
    data = _JSON["items"]

    sample = pd.DataFrame.from_dict(data , orient='index').T
    sample['GTO_2019'] = float(sample['GTO_2019'])
    sample['Volume_2019 Product'] = float(sample['Volume_2019 Product'])
    sample['Tax'] = float(sample['Tax'])
    sample['returnability'] = int(sample['returnability'])
    sample['sfdc_tier'] = int(sample['sfdc_tier'])
    
    if(np.any(sample['GTO_2019'] - sample['Tax'] > 0)):
      On_data = feature_cr(sample.copy(), 0)
      Off_data = feature_cr(sample.copy(), 1)

      On_data['label'] = on_cluster.predict(On_data.copy())[0]
      Off_data['label'] = off_cluster.predict(Off_data.copy())[0]

      oninv_dis = round(np.exp(on_model.predict(On_data))[0],2)
      total_dis = round(np.exp(off_model.predict(Off_data))[0],2)

      if(total_dis - oninv_dis < 0):
        offinv_dis = 0
      else:
        offinv_dis = total_dis - oninv_dis
    else:
      oninv_dis = 0
      total_dis = 0
      offinv_dis = 0

    

    return {"On-Invoice Discount":oninv_dis,"Off-Invoice Discount":offinv_dis,"Total discount":total_dis}