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
 df = df.groupby("Country_Region").aggregate({'Confirmed': ['sum'], 'Deaths': ['sum'], 'Recovered': ['sum']})
 df = df.reset_index()
 df['Active'] = df['Confirmed'] - (df['Deaths'] + df['Recovered'])
 df.columns = df.columns.droplevel(1)

 df1 = df[['Country_Region', 'Deaths']]
 df2 = df[['Country_Region', 'Active']]
 df3 = df[['Country_Region', 'Recovered']]
 df4 = df[['Country_Region', 'Confirmed']]

 df1 = df1.rename(columns={'Country_Region': 'x', 'Deaths': 'y'})
 df2 = df2.rename(columns={'Country_Region': 'x', 'Active': 'y'})
 df3 = df3.rename(columns={'Country_Region': 'x', 'Recovered': 'y'})
 df4 = df4.rename(columns={'Country_Region': 'x', 'Confirmed': 'y'})

 df1['yOffset'] = -6
 df2['yOffset'] = -6
 df3['yOffset'] = -6
 df4['yOffset'] = -6

 df1 = df1.sort_values(by=['y'], ascending=False)
 df2 = df2.sort_values(by=['y'], ascending=False)
 df3 = df3.sort_values(by=['y'], ascending=False)
 df4 = df4.sort_values(by=['y'], ascending=False)

 df1.to_csv('/home/walder/workspaces/data_visualisation/project/src/data/deaths_information_countries.csv', index=False)
 df2.to_csv('/home/walder/workspaces/data_visualisation/project/src/data/active_information_countries.csv', index=False)
 df3.to_csv('/home/walder/workspaces/data_visualisation/project/src/data/recovered_information_countries.csv', index=False)
 df4.to_csv('/home/walder/workspaces/data_visualisation/project/src/data/confirmed_information_countries.csv', index=False)

 print('All files generated!')

if __name__ == "__main__":
    main()