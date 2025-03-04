import { useState, useEffect } from "react";
import PropertyForm from "./components/Form";
import { trainModel, normalizeInput } from "./models/brainModel";
import { loadJSON } from "./utils/preprocess";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
    const [trainedNet, setTrainedNet] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function fetchDataAndTrainModel() {
            const storedModel = localStorage.getItem("trainedNet");
            if (storedModel) {
                setTrainedNet(JSON.parse(storedModel));
                return;
            }

            const jsonData = await loadJSON("/synthetic_real_estate_data.json");
            const trainingData = jsonData.map(item => ({
                input: normalizeInput(item),
                output: { price: (item.price - 50000) / (1000000 - 50000) }
            }));

            const net = trainModel(trainingData);
            localStorage.setItem("trainedNet", JSON.stringify(net));
            setTrainedNet(net);
        }

        fetchDataAndTrainModel();
    }, []);

    const handleFormSubmit = (data) => {
        if (!trainedNet) {
            alert("Model is still training. Try again in a few seconds.");
            return;
        }

        const normalizedInput = normalizeInput(data);
        const output = trainedNet.run(normalizedInput);
        const predictedPrice = output.price * 1000000; // Convert back from normalized value

        setPrediction(predictedPrice.toFixed(2));
        setChartData(prevData => [...prevData, { name: `Entry ${prevData.length + 1}`, predicted: predictedPrice, actual: data.actualPrice || 0 }]);
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px' 
        }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '20px' }}>🏡 Real Estate Price Predictor</h1>
            <PropertyForm onSubmit={handleFormSubmit} />
            {prediction && (
                <p style={{ 
                    marginTop: '20px', 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    color: '#28a745', 
                    background: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    💰 Predicted Price: ${prediction}
                </p>
            )}
            {chartData.length > 0 && (
                <div style={{ width: '80%', marginTop: '40px', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ textAlign: 'center', color: '#333' }}>📊 Predicted vs Actual Prices</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default App;
