##Receipt Processor

##Installation
npm install

##Running the Server

##Without Docker
npm start

##With Docker
docker build -t receipt-processor .
docker run -p 3000:3000 receipt-processor

##API Endpoints
Process Receipt
POST /receipts/process
Get Points
GET /receipts/{id}/points
