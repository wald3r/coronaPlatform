import pandas as pd
import git


def main():

    g = git.cmd.Git('/home/walder/workspaces/data_visualisation/project/python_data/data')
    g.pull()

    df = pd.read_csv('data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')

    df1 = pd.read_csv('data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv')
    df2 = pd.read_csv('data/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')

    df = df.drop(["Province/State", "Lat", "Long"], axis=1)
    df = df.groupby("Country/Region").aggregate("sum")

    df1 = df1.drop(["Province/State", "Lat", "Long"], axis=1)
    df1 = df1.groupby("Country/Region").aggregate("sum")

    df2 = df2.drop(["Province/State", "Lat", "Long"], axis=1)
    df2 = df2.groupby("Country/Region").aggregate("sum")


    df3 = (df - df1) - df2

    df3 = df3.reset_index()
    df3 = df3.rename(columns={"Country/Region": "Country"})

    df1 = df1.reset_index()
    df1 = df1.rename(columns={"Country/Region": "Country"})

    df = df.reset_index()
    df = df.rename(columns={"Country/Region": "Country"})

    df2 = df2.reset_index()
    df2 = df2.rename(columns={"Country/Region": "Country"})

    df.to_csv("/home/walder/workspaces/data_visualisation/project/src/data/country_information_confirmed.csv", index=False)
    df1.to_csv("/home/walder/workspaces/data_visualisation/project/src/data/country_information_recovered.csv",index=False)
    df2.to_csv("/home/walder/workspaces/data_visualisation/project/src/data/country_information_deaths.csv", index=False)
    df3.to_csv("/home/walder/workspaces/data_visualisation/project/src/data/country_information_active.csv", index=False)
    print('Files generated!')

if __name__ == "__main__":
    main()

