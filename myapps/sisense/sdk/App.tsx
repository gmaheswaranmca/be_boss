import React, {useMemo,useState } from "react";
import { Chart, DateRangeFilterTile, SisenseContextProvider, MemberFilterTile  } from "@sisense/sdk-ui";
import { Filter, filterFactory, measureFactory } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";
import './App.css';

function App() {
  // Initialize dateRangeFilter with a default filter
  const [dateRangeFilter, setDateRangeFilter] = useState<Filter>(
    filterFactory.dateRange(DM.Commerce.Date.Days)
  ); 

  const [AgeRangeFilter, setAgeRangeFilter] = useState<Filter | null>(null);
  const filters = useMemo(() => AgeRangeFilter ? [AgeRangeFilter] : [], 
    [AgeRangeFilter]);
    
  return (
    <div id="root">
      <h1>Executive Ecommerce Dashboard</h1>
      <div className="charts-container">
        <SisenseContextProvider
          url=" " // replace with the URL of your Sisense instance
          token=" " // replace with the API token of your user account
        >
          <div className="row">
            <div className="chart-wrapper span-three">
              <h3>Total Revenue</h3>
              <Chart
                dataSet={DM.DataSource}
                chartType={'indicator'}
                dataOptions={{
                  value: [measureFactory.sum(DM.Commerce.Revenue)],
                  breakBy: [],
                }}
                styleOptions={{
                  legend: {
                    enabled: true,
                    position: 'bottom',
                  },
                }}
                onDataPointClick={(point: any, nativeEvent: any) => {
                  console.log('clicked', point, nativeEvent);
                }}
              />
            </div>
            <div className="chart-wrapper span-three">
              <h3>Total Quantity</h3>
              <Chart
                dataSet={DM.DataSource}
                chartType={'indicator'}
                dataOptions={{
                  value: [measureFactory.sum(DM.Commerce.Quantity)],
                  breakBy: [],
                }}
                styleOptions={{
                  legend: {
                    enabled: true,
                    position: 'bottom',
                  },
                }}
                onDataPointClick={(point: any, nativeEvent: any) => {
                  console.log('clicked', point, nativeEvent);
                }}
              />
            </div>
            <div className="chart-wrapper span-three">
              <h3>Revenue By Brand</h3>
              <Chart
                chartType={'pie'}
                dataSet={DM.DataSource}
                dataOptions={{
                  category: [DM.Brand.Brand],
                  value: [measureFactory.sum(DM.Commerce.Revenue)],
                }}
                styleOptions={{
                  legend: {
                    enabled: true,
                    position: 'top',
                  },
                  convolution: {
                    enabled: true,
                    independentSlicesCount: 4,
                    selectedConvolutionType: 'bySlicesCount',
                  },
                }}
              />
            </div>
            <div className="chart-wrapper span-three">
              <h3>Revenue By Country</h3>
              <Chart
                chartType={'pie'}
                dataSet={DM.DataSource}
                dataOptions={{
                  category: [DM.Country.Country],
                  value: [measureFactory.sum(DM.Commerce.Revenue)],
                }}
                styleOptions={{
                  legend: {
                    enabled: true,
                    position: 'top',
                  },
                  convolution: {
                    enabled: true,
                    independentSlicesCount: 4,
                    selectedConvolutionType: 'bySlicesCount',
                  },
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="chart-wrapper">
              <h3>Revenue Trend</h3>
              <DateRangeFilterTile
                title="Date Range"
                dataSource={DM.DataSource}
                attribute={DM.Commerce.Date.Months}
                filter={dateRangeFilter}
                onChange={(filter) => {
                  setDateRangeFilter(filter);
                }}
              />
              <Chart
                dataSet={DM.DataSource}
                chartType={'line'}
                dataOptions={{
                  category: [DM.Commerce.Date.Months],
                  value: [measureFactory.sum(DM.Commerce.Revenue), measureFactory.sum(DM.Commerce.Cost)],
                  breakBy: [],
                }}
                styleOptions={{
                  legend: {
                    enabled: true,
                    position: 'top',
                  },
                }}
                onDataPointClick={(point: any, nativeEvent: any) => {
                  console.log('clicked', point, nativeEvent);
                }}
                filters={[dateRangeFilter]}
              />
            </div>
            <div className="chart-wrapper">
              <h3>Revenue By Age Range</h3>
              <MemberFilterTile
                title="Age Range"
                dataSource={DM.DataSource}
                attribute={DM.Commerce.AgeRange}
                filter={AgeRangeFilter}
                onChange={setAgeRangeFilter}
               
              />

              <Chart
                dataSet={DM.DataSource}
                chartType={'bar'}
                dataOptions={{
                  category: [DM.Commerce.AgeRange],
                  value: [measureFactory.sum(DM.Commerce.Revenue)],
                  breakBy: [DM.Commerce.Gender],
                }}
                styleOptions={{
                  legend: {
                    enabled: true,
                    position: 'top',
                  },
                  
                }}
                onDataPointClick={(point: any, nativeEvent: any) => {
                  console.log('clicked', point, nativeEvent);
                }}
                filters={filters}
              />
              
            </div>
          </div>
        </SisenseContextProvider>
      </div>
    </div>
  );
}

export default App;
