import { Card, CardHeader, CardBody, CardFooter, Button } from '@shadcn/ui'; // Ensure the correct Shadcn UI import
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PatientReport = () => {
  // Example data for Spiral Drawing Analysis (replace with real analysis data)
  const chartData = [
    { time: '0', accuracy: 1 },
    { time: '1', accuracy: 2 },
    { time: '2', accuracy: 2.5 },
    { time: '3', accuracy: 3 },
    { time: '4', accuracy: 4 },
    { time: '5', accuracy: 5 },
  ];

  // Example severity of Parkinson's disease (simple scale)
  const severity = 3; // Scale 1 to 5 (1 = mild, 5 = severe)

  // Fixing the severity logic and creating a range from 1 to 5
  const severityLabels = [
    "Mild",   // 1
    "Mild",   // 2
    "Moderate",  // 3
    "Severe",    // 4
    "Very Severe" // 5
  ];

  const getDoctorRecommendation = (severity: number) => {
    switch (severity) {
      case 1:
        return 'Mild symptoms. Regular exercise and monitoring recommended.';
      case 2:
        return 'Mild symptoms. Physiotherapy and medications advised.';
      case 3:
        return 'Moderate symptoms. Medication adjustments and therapy needed.';
      case 4:
        return 'Severe symptoms. Consider surgical options like DBS.';
      case 5:
        return 'Very severe symptoms. Intensive care and therapy recommended.';
      default:
        return 'Consult with your doctor for more details.';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Typography variant="h3" className="text-center text-blue-600 mb-6">
        Parkinson's Disease Report
      </Typography>

      {/* Spiral Drawing Analysis Section */}
      <Card className="mb-8">
        <CardHeader>
          <Typography variant="h4" className="text-gray-700">
            Spiral Drawing Analysis
          </Typography>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#3490dc" // Shadcn UI color for styling
                fill="#3490dc"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Severity Section */}
      <Card className="mb-8">
        <CardHeader>
          <Typography variant="h4" className="text-gray-700">
            Disease Severity
          </Typography>
        </CardHeader>
        <CardBody>
          <div
            className={`px-4 py-2 text-white rounded-full ${severity >= 4 ? 'bg-red-600' : severity >= 3 ? 'bg-yellow-400' : 'bg-green-600'}`}
          >
            Severity Level: {severity} ({severityLabels[severity - 1]})
          </div>
        </CardBody>
      </Card>

      {/* Doctor's Recommendations Section */}
      <Card>
        <CardHeader>
          <Typography variant="h4" className="text-gray-700">
            Doctor's Recommendations
          </Typography>
        </CardHeader>
        <CardBody>
          <Typography className="text-gray-600">{getDoctorRecommendation(severity)}</Typography>
        </CardBody>
        <CardFooter>
          <Button variant="primary">Follow-up Appointment</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientReport;
