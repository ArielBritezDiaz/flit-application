export const FlitTheme = {
    backgroundStyle: {
        fill: "#1F1B18"
    },
    colors: [
    "#252525",
    "#525252",
    "#737373",
    "#969696",
    "#bdbdbd",
    "#d9d9d9",
    "#f0f0f0"
    ],
    charcoal: "#252525",
    grey: "#969696",
    sansSerif: "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
    letterSpacing: "normal",
    fontSize: 14,
    baseProps: {
        width: 450,
        height: 300,
        padding: 50,
        colorScale: this.colors
    },
    baseLabelStyles: {
        fontFamily: this.sansSerif,
        fontSize: this.fontSize,
        letterSpacing: this.letterSpacing,
        padding: 10,
        fill: this.charcoal,
        stroke: "#f5f5fa"
    },
    centeredLabelStyles: {
        ...this.baseLabelStyles,
        textAnchor: "middle"
    },
    strokeLinecap: "round",
    strokeLinejoin: "round",
    area: {
        style: {
            data: {
                fill: this.charcoal
            },
            labels: this.baseLabelStyles
        },
        ...this.baseProps
    },
    axis: {
        style: {
            axis: {
            fill: "transparent",
            stroke: "#f5f5fa",
            // 040881
            strokeWidth: 1,
            strokeLinecap: this.strokeLinecap,
            strokeLinejoin: this.strokeLinejoin
            },
            axisLabel: {
                ...this.centeredLabelStyles,
                padding: 25
            },
            grid: {
            fill: "none",
            stroke: "#545454",
            // 12123D
            pointerEvents: "painted"
            },
            ticks: {
                fill: "transparent",
                size: 1,
                stroke: "#f5f5fa" 
                // D0D032
            },
            tickLabels: {
                ...this.baseLabelStyles,
                fill: "#f5f5fa",
                padding: 5,
                fontSize: 14
            }
        },
        ...this.baseProps
    },
    bar: {
        style: {
            data: {
                fill: "#D39F00",
                stroke: "#D39F00"
            },
            labels: this.baseLabelStyles
        },
        ...this.baseProps
    },
    boxplot: {
        style: {
            max: {
                padding: 8,
                stroke: this.charcoal,
                strokeWidth: 1
            },
            maxLabels: {
                ...this.baseLabelStyles,
                padding: 3
            },
            median: {
                padding: 8,
                stroke: this.charcoal,
                strokeWidth: 1
            },
            medianLabels: {
                ...this.baseLabelStyles,
                padding: 3
            },
            min: {
                padding: 8,
                stroke: this.charcoal,
                strokeWidth: 1
            },
            minLabels: {
                ...this.baseLabelStyles,
                padding: 3
            },
            q1: {
                padding: 8,
                fill: this.grey
            },
            q1Labels: {
                ...this.baseLabelStyles,
                padding: 3
            },
            q3: {
                padding: 8,
                fill: this.grey
            },
            q3Labels: {
                ...this.baseLabelStyles,
                padding: 3
            }
        },
        boxWidth: 20,
        ...this.baseProps
    },
    candlestick: {
        style: {
            data: {
                stroke: this.charcoal,
                strokeWidth: 1
            },
            labels: {
                ...this.baseLabelStyles,
                padding: 5
            }
        },
        candleColors: {
            positive: "#f5f5fa",
            negative: this.charcoal
        },
        ...this.baseProps
    },
    chart: this.baseProps,
    errorbar: {
        borderWidth: 8,
        style: {
            data: {
                fill: "transparent",
                stroke: this.charcoal,
                strokeWidth: 2
            },
            labels: this.baseLabelStyles
        },
        ...this.baseProps
    },
    group: {
        colorScale: this.colors,
        ...this.baseProps
    },
    histogram: {
        style: {
            data: {
                fill: this.grey,
                stroke: this.charcoal,
                strokeWidth: 2
            },
            labels: this.baseLabelStyles
        },
        ...this.baseProps
    },
    legend: {
        colorScale: this.colors,
        gutter: 10,
        orientation: "vertical",
        titleOrientation: "top",
        style: {
            data: {
                type: "circle"
            },
            labels: this.baseLabelStyles,
            title: {
                ...this.baseLabelStyles,
                padding: 5
            }
        }
    },
    line: {
        style: {
            data: {
                fill: "transparent",
                stroke: this.charcoal,
                strokeWidth: 2
            },
            labels: this.baseLabelStyles
        },
        ...this.baseProps
    },
    pie: {
        style: {
            data: {
                padding: 10,
                stroke: "transparent",
                strokeWidth: 1
            },
            labels: {
                ...this.baseLabelStyles,
                padding: 20
            }
        },
        colorScale: this.colors,
        width: 400,
        height: 400,
        padding: 50
    },
    scatter: {
        style: {
            data: {
                fill: this.charcoal,
                stroke: "transparent",
                strokeWidth: 0
            },
            labels: this.baseLabelStyles
        },
        ...this.baseProps
    },
    stack: {
        colorScale: this.colors,
        ...this.baseProps
    },
    tooltip: {
        style: {
            ...this.baseLabelStyles,
            padding: 0,
            pointerEvents: "none"
        },
        flyoutStyle: {
            stroke: this.charcoal,
            strokeWidth: 1,
            fill: "#f0f0f0",
            pointerEvents: "none"
        },
        flyoutPadding: 5,
        cornerRadius: 5,
        pointerLength: 10
    },
    voronoi: {
        style: {
            data: {
                fill: "transparent",
                stroke: "transparent",
                strokeWidth: 0
            },
            labels: {
                ...this.baseLabelStyles,
                padding: 5,
                pointerEvents: "none"
            },
            flyout: {
                stroke: this.charcoal,
                strokeWidth: 1,
                fill: "#f0f0f0",
                pointerEvents: "none"
            }
        },
        ...this.baseProps
    }
}
