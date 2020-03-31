import pandas as pd
from datetime import date, timedelta
import git

def newestFileString(number):

 string = 'data/csse_covid_19_data/csse_covid_19_daily_reports/'
 today = date.today() - timedelta(days=number)
 d1 = today.strftime("%m-%d-%Y")
 return string+d1+'.csv'

def main():

 g = git.cmd.Git('/home/walder/workspaces/data_visualisation/project/python_data/data')
 g.pull()
 days = 0

 while(1):
  try:
   if(days == 50):
    exit(0)

   file = newestFileString(days)
   print('Trying to open:', file)
   df = pd.read_csv(file)
   break
  except:
   days = days + 1

 df = df.drop(['FIPS', 'Admin2', 'Province_State', 'Last_Update', 'Combined_Key', 'Lat', 'Long_', 'Active'], axis=1)
 df = df.aggregate({'Confirmed': ['sum'], 'Deaths': ['sum'], 'Recovered': ['sum']})

 df = df.reset_index()
 df = df.drop(['index'], axis=1)
 df['Active'] = df['Confirmed'] - (df['Deaths'] + df['Recovered'])

 #df1 = pd.DataFrame(data=[None, None, None], columns=['a'])

 print(df)
 df.to_csv('/home/walder/workspaces/data_visualisation/project/src/data/global_information.csv', index=False)


if __name__ == "__main__":
    main()