import csv
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import logging

app = FastAPI()

#Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Helper to read CSVs
def read_csv(file_path):
    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)
        return list(reader)

# Load data from CSV files
companies = read_csv('data/companies.csv')
locations = read_csv('data/locations.csv')

# Get all companies
@app.get("/companies", summary="Get all companies", response_description="List of all companies")
async def get_all_companies():
    if not companies:
        logger.warning("No companies data found")
        raise HTTPException(status_code=404, detail="No companies found")
    logger.info("Fetched all companies")
    return JSONResponse(content=companies)

@app.get("/companies/{company_id}", summary="Get company details by ID", response_description="Company details for the particular ID")
async def get_company_by_id(company_id: str):
    company = next((c for c in companies if c["company_id"] == company_id), None)
    if not company:
        logger.warning(f"Company with ID {company_id} not found")
        raise HTTPException(status_code=404, detail="Company not found")
    logger.info(f"Fetched company details for ID {company_id}")
    return JSONResponse(content=company)

@app.get("/companies/{company_id}/locations", summary="Get all locations for a specific company ID", response_description="List of all locations for the given company ID")
async def get_locations_by_company_id(company_id: str):
    company = next((c for c in companies if c["company_id"] == company_id), None)
    if not company:
        logger.warning(f"Company with ID {company_id} not found")
        raise HTTPException(status_code=404, detail="Company not found")
    company_locations = [loc for loc in locations if loc["company_id"] == company_id]
    if not company_locations:
        logger.warning(f"No locations found for company ID {company_id}")
        raise HTTPException(status_code=404, detail="No locations found for this company")
    logger.info(f"Fetched locations for company ID {company_id}")
    return JSONResponse(content=company_locations)