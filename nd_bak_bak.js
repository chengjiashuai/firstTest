// 模版2
"option = {" +
  "    legend: {}," +
  "    tooltip: {}," +
  "    dataset: {" +
  "        dimensions: ['product', '2015', '2016', '2017']," +
  "        source: [{" +
  "            '2015': 43.3," +
  "            '2016': 85.8," +
  "            '2017': 93.7," +
  "            product: 'Matcha Latte'" +
  "        }, {" +
  "            '2015': 83.1," +
  "            '2016': 73.4," +
  "            '2017': 55.1," +
  "            product: 'Milk Tea'" +
  "        }, {" +
  "            '2015': 86.4," +
  "            '2016': 65.2," +
  "            '2017': 82.5," +
  "            product: 'Cheese Cocoa'" +
  "        }, {" +
  "            '2015': 72.4," +
  "            '2016': 53.9," +
  "            '2017': 39.1," +
  "            product: 'Walnut Brownie'" +
  "        }]" +
  "    }," +
  "    xAxis: {" +
  "        type: 'category'" +
  "    }," +
  "    yAxis: {}," +
  "    series: [{" +
  "        type: 'bar'," +
  "        itemStyle: {}" +
  "    }, {" +
  "        type: 'bar'," +
  "        itemStyle: {}" +
  "    }, {" +
  "        type: 'bar'," +
  "        itemStyle: {}" +
  "    }]," +
  "    color: ['#FFD033', '#FF9000', '#FF6600', '#B8E04C', '#5EE53F', '#FFEA00', '#EDFF20', '#7CB518', '#32A400', '#FB4607', '#EB3568']" +
  "}"


// 模版3
"option = {" +
"    dataset: {" +
"        source: [" +
"            ['score', 'amount', 'product']," +
"            [89.3, 58212, 'Matcha Latte']," +
"            [57.1, 78254, 'Milk Tea']," +
"            [74.4, 41032, 'Cheese Cocoa']," +
"            [50.1, 12755, 'Cheese Brownie']," +
"            [89.7, 20145, 'Matcha Cocoa']," +
"            [68.1, 79146, 'Tea']," +
"            [19.6, 91852, 'Orange Juice']," +
"            [10.6, 101852, 'Lemon Juice']," +
"            [32.7, 20112, 'Walnut Brownie']" +
"        ]" +
"    }," +
"    grid: {" +
"        containLabel: true" +
"    }," +
"    xAxis: {" +
"        name: 'amount'" +
"    }," +
"    yAxis: {" +
"        type: 'category'" +
"    }," +
"    visualMap: {" +
"        orient: 'horizontal'," +
"        left: 'center'," +
"        min: 10," +
"        max: 100," +
"        text: ['High Score', 'Low Score']," +
"        dimension: 0," +
"        inRange: {" +
"            color: ['#D7DA8B', '#E15457']" +
"        }" +
"    }," +
"    series: [{" +
"        type: 'bar'," +
"        encode: {" +
"            x: 'amount'," +
"            y: 'product'" +
"        }" +
"    }]" +
"}"


// 模版4
"option = {" +
"    legend: {}," +
"    tooltip: {}," +
"    dataset: {" +
"        source: [" +
"            ['product', '2012', '2013', '2014', '2015']," +
"            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3]," +
"            ['Milk Tea', 86.5, 92.1, 85.7, 83.1]," +
"            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]" +
"        ]" +
"    }," +
"    xAxis: [{" +
"        type: 'category'," +
"        gridIndex: 0" +
"    }, {" +
"        type: 'category'," +
"        gridIndex: 1" +
"    }]," +
"    yAxis: [{" +
"        gridIndex: 0" +
"    }, {" +
"        gridIndex: 1" +
"    }]," +
"    grid: [{" +
"        bottom: '55%'" +
"    }, {" +
"        top: '55%'" +
"    }]," +
"    series: [{" +
"        type: 'bar'," +
"        seriesLayoutBy: 'row'," +
"        itemStyle: {" +
"            color: '#FFD033'" +
"        }" +
"    }, {" +
"        type: 'bar'," +
"        seriesLayoutBy: 'row'," +
"        itemStyle: {" +
"            color: '#FF9000'" +
"        }" +
"    }, {" +
"        type: 'bar'," +
"        seriesLayoutBy: 'row'," +
"        itemStyle: {" +
"            color: '#F25C43'" +
"        }" +
"    }, {" +
"        type: 'bar'," +
"        xAxisIndex: 1," +
"        yAxisIndex: 1," +
"        itemStyle: {" +
"            color: '#37A2DA'" +
"        }" +
"    }, {" +
"        type: 'bar'," +
"        xAxisIndex: 1," +
"        yAxisIndex: 1," +
"        itemStyle: {" +
"            color: '#32C5E9'" +
"        }" +
"    }, {" +
"        type: 'bar'," +
"        xAxisIndex: 1," +
"        yAxisIndex: 1," +
"        itemStyle: {" +
"            color: '#9FE6B8'" +
"        }" +
"    }, {" +
"        type: 'bar'," +
"        xAxisIndex: 1," +
"        yAxisIndex: 1," +
"        itemStyle: {" +
"            color: '#FFDB5C'" +
"        }" +
"    }]," +
"    color: ['#FFD033', '#FF9000', '#F25C43', '#37A2DA', '#32C5E9', '#9FE6B8', '#FFDB5C', '#5200C1', '#7916FF', '#A132E8', '#BC77E3']" +
"}"


// 模版5
"option = {" +
"    legend: {}," +
"    tooltip: {}," +
"    toolbox: {" +
"        left: 'center'," +
"        feature: {" +
"            dataZoom: {}" +
"        }" +
"    }," +
"    grid: [{" +
"        right: '57%'," +
"        bottom: '57%'" +
"    }, {" +
"        left: '57%'," +
"        bottom: '57%'" +
"    }, {" +
"        right: '57%'," +
"        top: '57%'" +
"    }, {" +
"        left: '57%'," +
"        top: '57%'" +
"    }]," +
"    xAxis: [{" +
"        type: 'value'," +
"        gridIndex: 0," +
"        name: 'Income'," +
"        axisLabel: {" +
"            rotate: 50," +
"            interval: 0" +
"        }" +
"    }, {" +
"        type: 'category'," +
"        gridIndex: 1," +
"        name: 'Country'," +
"        boundaryGap: false," +
"        axisLabel: {" +
"            rotate: 50," +
"            interval: 0" +
"        }" +
"    }, {" +
"        type: 'value'," +
"        gridIndex: 2," +
"        name: 'Income'," +
"        axisLabel: {" +
"            rotate: 50," +
"            interval: 0" +
"        }" +
"    }, {" +
"        type: 'value'," +
"        gridIndex: 3," +
"        name: 'Life Expectancy'," +
"        axisLabel: {" +
"            rotate: 50," +
"            interval: 0" +
"        }" +
"    }]," +
"    yAxis: [{" +
"        type: 'value'," +
"        gridIndex: 0," +
"        name: 'Life Expectancy'" +
"    }, {" +
"        type: 'value'," +
"        gridIndex: 1," +
"        name: 'Income'" +
"    }, {" +
"        type: 'value'," +
"        gridIndex: 2," +
"        name: 'Population'" +
"    }, {" +
"        type: 'value'," +
"        gridIndex: 3," +
"        name: 'Population'" +
"    }]," +
"    dataset: {" +
"        dimensions: ['Income', 'Life Expectancy', 'Population', 'Country', {" +
"            name: 'Year'," +
"            type: 'ordinal'" +
"        }]," +
"        source: [" +
"            ['Income', 'Life Expectancy', 'Population', 'Country', 'Year']," +
"            [815, 34.05, 351014, 'Australia', 1800]," +
"            [1314, 39, 645526, 'Canada', 1800]," +
"            [985, 32, 321675013, 'China', 1800]," +
"            [864, 32.2, 345043, 'Cuba', 1800]," +
"            [1244, 36.5731262, 977662, 'Finland', 1800]," +
"            [1803, 33.96717024, 29355111, 'France', 1800]," +
"            [1639, 38.37, 22886919, 'Germany', 1800]," +
"            [926, 42.84559912, 61428, 'Iceland', 1800]," +
"            [1052, 25.4424, 168574895, 'India', 1800]," +
"            [1050, 36.4, 30294378, 'Japan', 1800]," +
"            [579, 26, 4345000, 'North Korea', 1800]," +
"            [576, 25.8, 9395000, 'South Korea', 1800]," +
"            [658, 34.05, 100000, 'New Zealand', 1800]," +
"            [1278, 37.91620899, 868570, 'Norway', 1800]," +
"            [1213, 35.9, 9508747, 'Poland', 1800]," +
"            [1430, 29.5734572, 31088398, 'Russia', 1800]," +
"            [1221, 35, 9773456, 'Turkey', 1800]," +
"            [3431, 38.6497603, 12327466, 'United Kingdom', 1800]," +
"            [2128, 39.41, 6801854, 'United States', 1800]," +
"            [834, 34.05, 342440, 'Australia', 1810]," +
"            [1400, 39.01496774, 727603, 'Canada', 1810]," +
"            [985, 32, 350542958, 'China', 1810]," +
"            [970, 33.64, 470176, 'Cuba', 1810]," +
"            [1267, 36.9473378, 1070625, 'Finland', 1810]," +
"            [1839, 37.4, 30293172, 'France', 1810]," +
"            [1759, 38.37, 23882461, 'Germany', 1810]," +
"            [928, 43.13915533, 61428, 'Iceland', 1810]," +
"            [1051, 25.4424, 171940819, 'India', 1810]," +
"            [1064, 36.40397538, 30645903, 'Japan', 1810]," +
"            [573, 26, 4345000, 'North Korea', 1810]," +
"            [570, 25.8, 9395000, 'South Korea', 1810]," +
"            [659, 34.05, 100000, 'New Zealand', 1810]," +
"            [1299, 36.47500606, 918398, 'Norway', 1810]," +
"            [1260, 35.9, 9960687, 'Poland', 1810]," +
"            [1447, 29.5734572, 31088398, 'Russia', 1810]," +
"            [1223, 35, 9923007, 'Turkey', 1810]," +
"            [3575, 38.34738144, 14106058, 'United Kingdom', 1810]" +
"        ]" +
"    }," +
"    series: [{" +
"        type: 'scatter'," +
"        itemStyle: {" +
"            normal: {" +
"                color: 'red'" +
"            }" +
"        }," +
"        symbolSize: 2.5," +
"        xAxisIndex: 0," +
"        yAxisIndex: 0," +
"        encode: {" +
"            x: 'Income'," +
"            y: 'Life Expectancy'," +
"            tooltip: [0, 1, 2, 3, 4]" +
"        }" +
"    }, {" +
"        type: 'scatter'," +
"        symbolSize: 2.5," +
"        xAxisIndex: 1," +
"        yAxisIndex: 1," +
"        encode: {" +
"            x: 'Country'," +
"            y: 'Income'," +
"            tooltip: [0, 1, 2, 3, 4]" +
"        }" +
"    }, {" +
"        type: 'scatter'," +
"        symbolSize: 2.5," +
"        xAxisIndex: 2," +
"        yAxisIndex: 2," +
"        encode: {" +
"            x: 'Income'," +
"            y: 'Population'," +
"            tooltip: [0, 1, 2, 3, 4]" +
"        }" +
"    }, {" +
"        type: 'scatter'," +
"        symbolSize: 2.5," +
"        xAxisIndex: 3," +
"        yAxisIndex: 3," +
"        encode: {" +
"            x: 'Life Expectancy'," +
"            y: 'Population'," +
"            tooltip: [0, 1, 2, 3, 4]" +
"        }" +
"    }]" +
"}"
