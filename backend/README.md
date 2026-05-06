# DebtIQ Backend API

Node.js/Express backend for DebtIQ loan management application.

## Features

- **EMI Calculation**: Accurate monthly EMI calculations using standard financial formulas
- **Loan Management**: Full CRUD operations for loans
- **Data Persistence**: JSON file-based storage (easily replaceable with database)
- **RESTful API**: Clean REST endpoints for all operations
- **Input Validation**: Comprehensive validation for all loan data
- **Error Handling**: Proper error responses and logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Data Storage**: JSON files (local)
- **Validation**: Custom validation functions
- **ID Generation**: UUID

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Loans
- `GET /api/loans` - Get all loans (optional: `?sortBy=dueDate|interest|amount|name`)
- `GET /api/loans/stats` - Get loan statistics
- `GET /api/loans/:id` - Get specific loan
- `POST /api/loans` - Create new loan
- `PUT /api/loans/:id` - Update loan
- `DELETE /api/loans/:id` - Delete loan

## Data Models

### Loan Object
```json
{
  "id": "uuid",
  "name": "Car Loan",
  "principal": 25000,
  "annualRate": 8.5,
  "months": 60,
  "startDate": "2024-01-15",
  "lender": "ABC Bank",
  "monthlyEMI": 510.33,
  "totalAmount": 30619.80,
  "totalInterest": 5619.80,
  "status": "active",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

## Installation & Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. For development (with auto-restart):
   ```bash
   npm run dev
   ```

## Usage Examples

### Create a Loan
```bash
curl -X POST http://localhost:3001/api/loans \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Home Loan",
    "principal": 500000,
    "annualRate": 7.5,
    "months": 240,
    "startDate": "2024-01-01",
    "lender": "XYZ Bank"
  }'
```

### Get All Loans
```bash
curl http://localhost:3001/api/loans
```

### Get Loan Statistics
```bash
curl http://localhost:3001/api/loans/stats
```

## EMI Calculation Formula

The backend uses the standard EMI formula:
```
EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
```

Where:
- P = Principal amount
- R = Monthly interest rate (Annual Rate / 12 / 100)
- N = Number of months

## File Structure

```
backend/
├── data/
│   └── loans.json          # Loan data storage
├── models/
│   └── loanModel.js        # Loan CRUD operations
├── routes/
│   └── loans.js            # API route handlers
├── utils/
│   └── emiCalculator.js    # EMI calculation logic
├── server.js               # Main server file
└── package.json            # Dependencies
```

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Authentication & authorization
- Advanced loan analytics
- Payment tracking
- Email notifications
- API documentation (Swagger)

## License

MIT License