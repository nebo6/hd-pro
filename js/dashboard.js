const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'row';
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;

        legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
  };
  
  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(item => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';

        li.onclick = () => {
            const {type} = chart.config;
            if (type === 'pie' || type === 'doughnut') {
                // Pie and doughnut charts only have a single dataset and visibility is per item
                chart.toggleDataVisibility(item.index);
            } else {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
            }
            chart.update();
        };

            // Color box
            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.strokeStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'inline-block';
            boxSpan.style.height = '8px';
            boxSpan.style.marginRight = '8px';
            boxSpan.style.width = '8px';
            boxSpan.style.borderRadius = '50%';

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = 0;
            textContainer.style.padding = 0;
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    }
};


$(function() {
    const date = new Date(), 
        y = date.getFullYear(), 
        m = date.getMonth(),
        d = date.getDate();

    if (getLanguage() === "ru") {
        moment.locale("ru")
    } else {
        moment.locale("en")
    }
        
    // const ctx = document.getElementById('lineChart');
    const lineChart = new Chart("lineChart", {
        type: "line",
        data: {
            datasets: [{
                label: "Доходы",
                borderColor: "#2DC959",
                data: [{
                    x: '2021-11-06',
                    y: 50
                }, {
                    x: '2021-11-07',
                    y: 60
                }, {
                    x: '2022-01-07',
                    y: 20
                },
                {
                    x: '2022-04-26',
                    y: 50
                }, {
                    x: '2022-04-27',
                    y: 60
                }, {
                    x: '2022-04-28',
                    y: 20
                }]
            },
            {
                label: "Расходы",
                borderColor: "#FF3636",
                data: [{
                    x: '2021-11-06',
                    y: 20
                }, {
                    x: '2021-11-07',
                    y: 30
                }, {
                    x: '2022-01-07',
                    y: 40
                },
                {
                    x: '2022-04-26',
                    y: 10
                }, {
                    x: '2022-04-27',
                    y: 30
                }, {
                    x: '2022-04-28',
                    y: 90
                }]
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: "DD MMM YYYY",
                        minUnit: "day"
                    }
                }
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        modifierKey: 'ctrl',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    }
                },
                htmlLegend: {
                    containerID: 'legend-container',
                },
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        },
        plugins: [htmlLegendPlugin],
    });

    $(document).on("click", ".chart-reset-zoom", function() {
        lineChart.resetZoom();
    })
    $(document).on("click", ".chart-week-zoom", function() {
        lineChart.zoomScale('x', {
            min: new Date(y, m, d - 7), // начало текущей недели
            max: new Date() // конец текущей недели
        }, 'default');
        lineChart.update();
    })
    $(document).on("click", ".chart-month-zoom", function() {
        lineChart.zoomScale('x', {
            min: new Date(y, m, 1), // начало текущего месяца
            max: new Date() // конец текущего месяца
        }, 'default');
        lineChart.update();
    })
    $(document).on("click", ".chart-year-zoom", function() {
        lineChart.zoomScale('x', {
            min: new Date(y - 1, m, d),
            max: new Date()
        }, 'default');
        lineChart.update();
    })
})
