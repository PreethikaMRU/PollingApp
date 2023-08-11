import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = ({poll,answer1,answer2,answer3,answer4,count1,count2,count3,count4}) => {
    
    const options = {
        backgroundColor: "#FFE227",
        height: 500,
        title:{
            text: `Report of ${poll.Question}`,
            fontFamily: 'Caveat Brush',
            fontColor: "#4D375D",
            fontWeight: "bold",
            fontSize:"40",
            padding: "15",
        },
        axisY: {
            title:"Number of vote",
            titleFontFamily:"Caveat Brush",
            labelFontFamily: "Caveat Brush",
        },
        axisX:{
            labelFontFamily: "Caveat Brush",
        },
        legend:{
            verticalAlign:"bottom",
            horizontalAlign:"center"
        },
        data:[{
            type:"column",
            showInLegedn: true,
            legendMarkerType:"none",
            willReadFrequently: true,
            dataPoints: [
                {x:1, y: count1, label: answer1 },
                { x:2, y: count2, label: answer2},
                { x:3, y: count3, label: answer3 },
                {  x:4, y: count4, label: answer4 },
            ]
        }]
    }
    return(
    <div className="graph">
        <CanvasJSChart options={options}></CanvasJSChart>
    </div>);
}

export default Graph;